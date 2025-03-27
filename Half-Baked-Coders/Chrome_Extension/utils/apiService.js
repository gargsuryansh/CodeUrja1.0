/**
 * API Service for interacting with the Flask backend
 * Handles communication with the AI agent for news reliability verification
 */
const API_BASE_URL = 'https://371f-183-182-87-182.ngrok-free.app';

/**
 * Analyzes an article's reliability using the Flask API
 * @param {string} url - The URL of the article
 * @param {string} content - The article content
 * @returns {Promise<Object>} - Analysis results
 */
export async function analyzeArticle(url, content) {
  try {
    // Create form data to match Flask's request.form.get("text")
    const formData = new FormData();
    formData.append('text', `Source URL: ${url}\n\nContent:\n${content}`);
    
    console.log('Sending request to API:', `${API_BASE_URL}/fact_check`);
    console.log('Request type: FormData with text field');
    
    const response = await fetch(`${API_BASE_URL}/fact_check`, {
      method: 'POST',
      // No Content-Type header needed - browser sets it automatically with boundary for FormData
      body: formData
    });

    console.log('API response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = `API error: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (e) {
        // If we can't parse the error as JSON, use the default message
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('API response data:', data);
    return processApiResponse(data);
  } catch (error) {
    console.error('API service error:', error);
    throw new Error(`Failed to connect to the news analysis service: ${error.message}`);
  }
}

/**
 * Process and format the API response data
 * @param {Object} apiResponse - Raw API response
 * @returns {Object} - Processed analysis results
 */
function processApiResponse(apiResponse) {
  // Default values in case of incomplete API response
  const defaultResponse = {
    score: 0,
    sourceDetails: 'Source information unavailable',
    factCheckingDetails: 'Fact checking unavailable',
    contentAnalysisDetails: 'Content analysis unavailable'
  };

  // If the API returns a completely unexpected format
  if (!apiResponse || !apiResponse.result) {
    console.error('Empty or invalid API response', apiResponse);
    return defaultResponse;
  }

  try {
    // Check if we have a valid result field in the API response
    if (!apiResponse.result) {
      console.error('API returned null or undefined result');
      return defaultResponse;
    }
    
    // Parse the AI agent's response from the result field
    const agentResponse = apiResponse.result;
    
    // Handle potential errors from the API that might come through the result field
    if (typeof agentResponse === 'string' && 
        (agentResponse.includes('error') || agentResponse.includes('failed') || agentResponse.includes('unable'))) {
      console.warn('API returned an error message in result field:', agentResponse);
    }
    
    // Extract probability/score - looking for percentage mentions
    const scoreMatch = agentResponse.match(/(\d{1,3})(?:\.\d+)?%|probability\s+of\s+(\d{1,3})(?:\.\d+)?%|(\d{1,3})(?:\.\d+)?\s+percent/i);
    const score = scoreMatch ? parseFloat(scoreMatch[1] || scoreMatch[2] || scoreMatch[3]) : 50;
    
    // Extract key sections from the response
    const sourceDetailsMatch = agentResponse.match(/sources relate to.*?(?=\*\*Evidence sources|\*\*Sentiment|\*\*Final probability|$)/is);
    const sourceDetails = sourceDetailsMatch ? sourceDetailsMatch[0].trim() : 'Source verification completed';
    
    const factCheckingMatch = agentResponse.match(/Evidence sources.*?(?=\*\*Sentiment|\*\*Final probability|$)/is);
    const factCheckingDetails = factCheckingMatch ? factCheckingMatch[0].trim() : 'Fact checking completed';
    
    const contentAnalysisMatch = agentResponse.match(/Sentiment analysis.*?(?=\*\*Final probability|$)/is);
    const contentAnalysisDetails = contentAnalysisMatch ? contentAnalysisMatch[0].trim() : 'Content analysis completed';

    return {
      score,
      sourceDetails: sourceDetails.replace(/^\*\*|\*\*$/g, ''),
      factCheckingDetails: factCheckingDetails.replace(/^\*\*|\*\*$/g, ''),
      contentAnalysisDetails: contentAnalysisDetails.replace(/^\*\*|\*\*$/g, '')
    };
  } catch (error) {
    console.error('Error processing API response:', error);
    return defaultResponse;
  }
}

/**
 * Checks if the API is available
 * @returns {Promise<boolean>} - True if API is available
 */
export async function checkApiAvailability() {
  try {
    // First try a HEAD request, which is lightweight
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'HEAD',
      });
      
      if (response.ok) {
        return true;
      }
    } catch (headError) {
      console.log('HEAD request failed, trying GET instead');
    }
    
    // If HEAD fails, try a GET request as fallback
    // Some APIs don't support HEAD requests
    const getResponse = await fetch(API_BASE_URL, {
      method: 'GET',
    });
    
    return getResponse.ok;
  } catch (error) {
    console.error('API availability check failed:', error);
    return false;
  }
}
