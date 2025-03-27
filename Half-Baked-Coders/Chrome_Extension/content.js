// Content script for extracting article content from news pages

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractArticle") {
    const articleData = extractArticleContent();
    sendResponse(articleData);
  }
  return true; // Required for async response
});

/**
 * Extracts article content from a news webpage
 * Uses common selectors for news articles across various sites
 */
function extractArticleContent() {
  // Get page title
  const title = document.title || document.querySelector('h1')?.textContent || '';

  // Common selectors for news article content
  const selectors = [
    'article',
    '.article-body',
    '.article-content',
    '.story-body',
    '.story-content',
    '.news-content',
    'main p',
    '.entry-content',
    '#content'
  ];

  // Try to find article content using selectors
  let articleContent = '';
  
  // Try article-specific containers first
  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach(el => {
        // If we found an article container, get all paragraphs within it
        const paragraphs = el.querySelectorAll('p');
        if (paragraphs.length > 0) {
          paragraphs.forEach(p => {
            // Skip short paragraphs that might be captions, ads, etc.
            if (p.textContent.trim().length > 20) {
              articleContent += p.textContent.trim() + '\n\n';
            }
          });
        } else {
          // If no paragraphs, use the container's text
          articleContent += el.textContent.trim();
        }
      });
      
      // If we found substantial content, stop looking
      if (articleContent.length > 200) break;
    }
  }

  // Fallback: if we couldn't find content in specific containers, grab all paragraphs
  if (articleContent.length < 200) {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
      // Skip very short paragraphs
      if (p.textContent.trim().length > 30) {
        articleContent += p.textContent.trim() + '\n\n';
      }
    });
  }

  // Clean up the extracted content
  articleContent = articleContent.trim()
    .replace(/\s{3,}/g, '\n\n') // Replace multiple spaces with line breaks
    .substring(0, 5000); // Limit content length to prevent API issues

  return {
    title,
    articleContent: articleContent.length > 50 ? articleContent : null
  };
}
