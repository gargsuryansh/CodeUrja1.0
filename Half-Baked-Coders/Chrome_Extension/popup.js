// Import API service
import { analyzeArticle } from '/utils/apiService.js';

// DOM elements
const initialState = document.getElementById('initialState');
const analyzeBtn = document.getElementById('analyzeBtn');
const loader = document.getElementById('loader');
const resultsContainer = document.getElementById('resultsContainer');
const errorContainer = document.getElementById('errorContainer');
const notNewsContainer = document.getElementById('notNewsContainer');
const articleTitle = document.getElementById('articleTitle');
const scoreValue = document.getElementById('scoreValue');
const reliabilityLabel = document.getElementById('reliabilityLabel');
const verdictTitle = document.getElementById('verdictTitle');
const verdictDescription = document.getElementById('verdictDescription');
const sourceName = document.getElementById('sourceName');
const factChecking = document.getElementById('factChecking');
const contentAnalysis = document.getElementById('contentAnalysis');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');
const resetBtn = document.getElementById('resetBtn');

// Current article state
let currentArticle = null;

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  initializePopup();
});

// Set up event listeners
analyzeBtn.addEventListener('click', handleAnalysisRequest);
retryBtn.addEventListener('click', handleAnalysisRequest);

// The auto-analysis is now handled directly in the background script

// Add function to manually reset analysis state
async function resetAnalysisState() {
  try {
    hideAllContainers();
    loader.style.display = 'flex';
    
    // Send message to background script to reset the analysis state
    const response = await sendMessageToBackground({ action: 'resetAnalysisState' });
    
    if (response.success) {
      // Reset the UI state
      currentArticle = { ...currentArticle, analyzed: false, analysisRequested: false };
      
      // Show initial state
      hideAllContainers();
      initialState.style.display = 'block';
    } else {
      showErrorContainer('Failed to reset analysis state.');
    }
  } catch (error) {
    console.error('Error resetting analysis state:', error);
    showErrorContainer('Failed to reset analysis: ' + error.message);
  }
}

// Initialize the popup based on current tab state
async function initializePopup() {
  hideAllContainers();
  loader.style.display = 'flex';
  
  try {
    // Check if current tab has a news article
    const response = await sendMessageToBackground({ action: 'getArticleStatus' });
    currentArticle = response.article;
    
    if (!currentArticle) {
      // Not a news site
      showNotNewsContainer();
      return;
    }
    
    // Update article title
    articleTitle.textContent = currentArticle.title || 'News Article';
    
    if (currentArticle.analyzed && currentArticle.results) {
      // Show results if already analyzed and results are available
      displayResults(currentArticle.results);
    } else if (currentArticle.analysisRequested) {
      // Show loader if analysis is in progress
      loader.style.display = 'flex';
    } else {
      // Show initial state if not yet analyzed
      initialState.style.display = 'block';
    }
  } catch (error) {
    console.error('Error initializing popup:', error);
    showErrorContainer('Failed to initialize. Please try again.');
  } finally {
    loader.style.display = 'none';
  }
}

// Handle analyze button click
async function handleAnalysisRequest() {
  if (!currentArticle || !currentArticle.content) {
    showErrorContainer('No article content detected. Please refresh the page and try again.');
    return;
  }
  
  hideAllContainers();
  loader.style.display = 'flex';
  
  try {
    // Request analysis from background script
    const response = await sendMessageToBackground({
      action: 'manualAnalyzeArticle'
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Analysis failed');
    }
    
    // Update UI with results
    if (response.results) {
      displayResults(response.results);
    } else {
      throw new Error('No results returned from analysis');
    }
  } catch (error) {
    console.error('Analysis error:', error);
    showErrorContainer(error.message || 'Unable to analyze this article. Please try again later.');
  } finally {
    loader.style.display = 'none';
  }
}

// Display analysis results
function displayResults(results) {
  hideAllContainers();
  
  // Calculate score (assuming results.score is a percentage)
  const score = results.score || 0;
  
  // Update score display
  scoreValue.textContent = Math.round(score);
  updateGaugeChart(score);
  
  // Set verdict based on score
  if (score >= 80) {
    verdictTitle.textContent = 'Highly Reliable';
    verdictDescription.textContent = 'This article appears to be accurate and from a trustworthy source.';
    reliabilityLabel.className = 'reliability-label high';
  } else if (score >= 60) {
    verdictTitle.textContent = 'Mostly Reliable';
    verdictDescription.textContent = 'This article contains mostly factual information with minor issues.';
    reliabilityLabel.className = 'reliability-label medium';
  } else if (score >= 40) {
    verdictTitle.textContent = 'Somewhat Reliable';
    verdictDescription.textContent = 'This article contains a mix of factual and questionable content.';
    reliabilityLabel.className = 'reliability-label moderate';
  } else if (score >= 20) {
    verdictTitle.textContent = 'Low Reliability';
    verdictDescription.textContent = 'This article contains significant misinformation or unverified claims.';
    reliabilityLabel.className = 'reliability-label low';
  } else {
    verdictTitle.textContent = 'Unreliable';
    verdictDescription.textContent = 'This article appears to contain false information or fabricated content.';
    reliabilityLabel.className = 'reliability-label very-low';
  }
  
  // Update detail items
  sourceName.textContent = results.sourceDetails || 'Source verification complete';
  factChecking.textContent = results.factCheckingDetails || 'Fact checking complete';
  contentAnalysis.textContent = results.contentAnalysisDetails || 'Content analysis complete';
  
  // Add "View on Website" button if it doesn't exist
  const detailsSection = document.querySelector('.details-section');
  if (detailsSection && !document.getElementById('viewWebsiteBtn')) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.style.marginTop = '15px';
    
    const viewWebsiteBtn = document.createElement('button');
    viewWebsiteBtn.id = 'viewWebsiteBtn';
    viewWebsiteBtn.className = 'button-primary';
    viewWebsiteBtn.textContent = 'View on Website';
    viewWebsiteBtn.addEventListener('click', () => {
      // Using example.com as placeholder, will be changed later
      const websiteUrl = `https://example.com/fact-check?url=${encodeURIComponent(currentArticle.url)}`;
      chrome.tabs.create({ url: websiteUrl });
    });
    
    buttonContainer.appendChild(viewWebsiteBtn);
    detailsSection.appendChild(buttonContainer);
  }
  
  // Show results container
  resultsContainer.style.display = 'block';
}

// Update the gauge chart based on score
function updateGaugeChart(score) {
  const svg = document.getElementById('gaugeChart');
  svg.innerHTML = ''; // Clear existing content
  
  // SVG dimensions
  const width = 150;
  const height = 85;
  const radius = 70;
  const centerX = width / 2;
  const centerY = height;
  
  // Calculate angles (gauge runs from -150° to -30° in SVG coordinate system)
  const startAngle = -150;
  const endAngle = -30;
  const angleRange = endAngle - startAngle;
  const scoreAngle = startAngle + (angleRange * (score / 100));
  
  // Create arc path for gauge background
  const arcPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const arcD = describeArc(centerX, centerY, radius, startAngle, endAngle);
  arcPath.setAttribute('d', arcD);
  arcPath.setAttribute('fill', 'none');
  arcPath.setAttribute('stroke', '#e1e1e1');
  arcPath.setAttribute('stroke-width', '10');
  svg.appendChild(arcPath);
  
  // Create arc path for score indicator
  const scorePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const scoreD = describeArc(centerX, centerY, radius, startAngle, scoreAngle);
  scorePath.setAttribute('d', scoreD);
  scorePath.setAttribute('fill', 'none');
  scorePath.setAttribute('stroke', getColorForScore(score));
  scorePath.setAttribute('stroke-width', '10');
  svg.appendChild(scorePath);
  
  // Add gauge needle
  const needle = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  const needleAngleRad = (scoreAngle * Math.PI) / 180;
  const needleLength = radius - 10;
  const needleX = centerX + needleLength * Math.cos(needleAngleRad);
  const needleY = centerY + needleLength * Math.sin(needleAngleRad);
  
  needle.setAttribute('x1', centerX);
  needle.setAttribute('y1', centerY);
  needle.setAttribute('x2', needleX);
  needle.setAttribute('y2', needleY);
  needle.setAttribute('stroke', '#333');
  needle.setAttribute('stroke-width', '2');
  svg.appendChild(needle);
  
  // Add needle center dot
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('cx', centerX);
  dot.setAttribute('cy', centerY);
  dot.setAttribute('r', '5');
  dot.setAttribute('fill', '#333');
  svg.appendChild(dot);
  
  // Add tick marks and labels
  addTickMarks(svg, centerX, centerY, radius);
}

// Helper function to describe SVG arc
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

// Convert polar coordinates to cartesian
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

// Add tick marks to gauge
function addTickMarks(svg, centerX, centerY, radius) {
  const tickAngles = [-150, -120, -90, -60, -30]; // Angles for 0, 25, 50, 75, 100
  const tickLabels = ['0', '25', '50', '75', '100'];
  const tickLength = 10;
  const labelRadius = radius + 15;
  
  tickAngles.forEach((angle, index) => {
    // Convert angle to radians
    const angleRad = (angle * Math.PI) / 180;
    
    // Calculate tick start and end points
    const innerRadius = radius + 5;
    const outerRadius = innerRadius + tickLength;
    const innerPoint = polarToCartesian(centerX, centerY, innerRadius, angle);
    const outerPoint = polarToCartesian(centerX, centerY, outerRadius, angle);
    
    // Create tick line
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    tick.setAttribute('x1', innerPoint.x);
    tick.setAttribute('y1', innerPoint.y);
    tick.setAttribute('x2', outerPoint.x);
    tick.setAttribute('y2', outerPoint.y);
    tick.setAttribute('stroke', '#999');
    tick.setAttribute('stroke-width', '2');
    svg.appendChild(tick);
    
    // Create label text
    const labelPoint = polarToCartesian(centerX, centerY, labelRadius, angle);
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', labelPoint.x);
    label.setAttribute('y', labelPoint.y);
    label.setAttribute('font-size', '10');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('alignment-baseline', 'middle');
    label.textContent = tickLabels[index];
    svg.appendChild(label);
  });
}

// Get color based on score
function getColorForScore(score) {
  if (score >= 80) return '#4CAF50'; // Green
  if (score >= 60) return '#8BC34A'; // Light Green
  if (score >= 40) return '#FFC107'; // Amber
  if (score >= 20) return '#FF9800'; // Orange
  return '#F44336'; // Red
}

// Hide all content containers
function hideAllContainers() {
  initialState.style.display = 'none';
  loader.style.display = 'none';
  resultsContainer.style.display = 'none';
  errorContainer.style.display = 'none';
  notNewsContainer.style.display = 'none';
}

// Show error container with custom message
function showErrorContainer(message) {
  hideAllContainers();
  errorMessage.textContent = message;
  errorContainer.style.display = 'block';
}

// Show not news container
function showNotNewsContainer() {
  hideAllContainers();
  notNewsContainer.style.display = 'block';
}

// Helper function to send messages to background script
function sendMessageToBackground(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}
