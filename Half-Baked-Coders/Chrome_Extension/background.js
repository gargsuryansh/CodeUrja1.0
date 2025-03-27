// Background script for VeriFact AI extension
import { isNewsDomain } from '/utils/domainList.js';
import { analyzeArticle } from '/utils/apiService.js';

// Track the previous URL to detect navigation changes
let previousUrl = '';

// Function to perform automatic analysis
async function performAutoAnalysis(articleData) {
  try {
    console.log('Auto-analyzing article:', articleData.title);
    
    // Mark as analysis requested
    articleData.analysisRequested = true;
    await chrome.storage.local.set({ currentArticle: articleData });
    
    // Send article to backend for analysis
    const results = await analyzeArticle(articleData.url, articleData.content);
    console.log('Analysis results received:', results);
    
    // Update article with results
    articleData.analyzed = true;
    articleData.results = results;
    await chrome.storage.local.set({ currentArticle: articleData });
    
    // Update badge to show analysis is complete
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs && tabs[0]) {
        chrome.action.setBadgeText({ text: 'DONE', tabId: tabs[0].id });
        chrome.action.setBadgeBackgroundColor({ color: '#4CAF50', tabId: tabs[0].id });
      }
    });
    
    // Reopen popup to show results if it was previously opened
    chrome.action.openPopup();
    
    return results;
  } catch (error) {
    console.error('Auto analysis error:', error);
    articleData.analyzed = false;
    articleData.analysisRequested = false;
    articleData.error = error.message;
    await chrome.storage.local.set({ currentArticle: articleData });
    return null;
  }
}

// Listen for tab updates to check if user navigates to a news website
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only proceed if the URL has been updated and tab loading is complete
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      const url = new URL(tab.url);
      const currentUrl = tab.url;
      
      // Check if this is a new page (not just a refresh of the same URL)
      const isNewNavigation = currentUrl !== previousUrl;
      previousUrl = currentUrl;
      
      // Reset analysis results when navigating to a new page
      if (isNewNavigation) {
        chrome.storage.local.get("currentArticle", (data) => {
          if (data.currentArticle && data.currentArticle.analyzed) {
            // Reset the analysis state but keep the article content
            const resetArticle = {
              ...data.currentArticle,
              analysisRequested: false,
              analyzed: false,
              analysisResults: null
            };
            chrome.storage.local.set({ currentArticle: resetArticle });
          }
        });
      }
      
      // Check if the current domain is in our news domains list
      if (isNewsDomain(url.hostname)) {
        // Set badge to indicate this is a news site we monitor
        chrome.action.setBadgeText({ text: "NEWS", tabId });
        chrome.action.setBadgeBackgroundColor({ color: "#4285F4", tabId });
        
        // Tell content script to extract the article text
        chrome.tabs.sendMessage(tabId, { action: "extractArticle" }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
            return;
          }
          
          // If we got article content, store it and auto-analyze
          if (response && response.articleContent) {
            console.log('Article content extracted, length:', response.articleContent.length);
            
            const newArticle = {
              url: tab.url,
              content: response.articleContent,
              title: response.title || "News Article",
              analysisRequested: false,
              analyzed: false,
              results: null
            };
            
            // Save article data first
            chrome.storage.local.set({ currentArticle: newArticle });
            
            // Show popup to indicate analysis is starting
            chrome.action.setBadgeText({ text: "SCAN", tabId });
            chrome.action.openPopup();
            
            // Start analysis after a short delay to ensure popup is visible
            setTimeout(async () => {
              try {
                // Perform the analysis directly from background script
                await performAutoAnalysis(newArticle);
              } catch (err) {
                console.error('Failed to auto-analyze:', err);
              }
            }, 1000);
          }
        });
      } else {
        // Clear badge for non-news sites
        chrome.action.setBadgeText({ text: "", tabId });
        
        // Clear stored article data
        chrome.storage.local.remove("currentArticle");
      }
    } catch (e) {
      console.error("Error processing URL:", e);
    }
  }
});

// Listen for tab switch events and reset state if needed
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      try {
        const url = new URL(tab.url);
        
        if (!isNewsDomain(url.hostname)) {
          // If switching to a non-news tab, clear any stored analysis
          chrome.storage.local.remove("currentArticle");
        }
      } catch (e) {
        console.error("Error processing URL on tab switch:", e);
      }
    }
  });
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getArticleStatus") {
    chrome.storage.local.get("currentArticle", (data) => {
      sendResponse({ article: data.currentArticle || null });
    });
    return true; // Required for async response
  }
  
  if (request.action === "resetAnalysisState") {
    chrome.storage.local.get("currentArticle", (data) => {
      if (data.currentArticle) {
        // Reset the analysis state but keep the article content
        const resetArticle = {
          ...data.currentArticle,
          analysisRequested: false,
          analyzed: false,
          results: null
        };
        chrome.storage.local.set({ currentArticle: resetArticle });
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false });
      }
    });
    return true; // Required for async response
  }
  
  // Handle manual analysis requests from popup
  if (request.action === "manualAnalyzeArticle") {
    chrome.storage.local.get("currentArticle", async (data) => {
      if (data.currentArticle && data.currentArticle.content) {
        try {
          // Perform the analysis
          const results = await performAutoAnalysis(data.currentArticle);
          sendResponse({ success: true, results });
        } catch (error) {
          console.error('Manual analysis error:', error);
          sendResponse({ success: false, error: error.message });
        }
      } else {
        sendResponse({ success: false, error: 'No article content available' });
      }
    });
    return true; // Required for async response
  }
});
