/**
 * List of news domains that we will check for reliability verification
 * This list can be expanded as needed
 */
const NEWS_DOMAINS = [
  // Major international news networks
  'cnn.com',
  'nytimes.com',
  'washingtonpost.com',
  'wsj.com',
  'foxnews.com',
  'bbc.com',
  'bbc.co.uk',
  'reuters.com',
  'apnews.com',
  'nbcnews.com',
  'cbsnews.com',
  'abcnews.go.com',
  'usatoday.com',
  'latimes.com',
  'chicagotribune.com',
  'nypost.com',
  'theguardian.com',
  'huffpost.com',
  'huffingtonpost.com',

  // News aggregators
  'news.google.com',
  'news.yahoo.com',
  'msn.com',
  'drudgereport.com',

  // Political news
  'politico.com',
  'thehill.com',
  'realclearpolitics.com',
  'breitbart.com',
  'thedailybeast.com',
  'motherjones.com',
  'theatlantic.com',
  'slate.com',
  'vox.com',
  'dailykos.com',
  'dailywire.com',

  // Business/Tech news
  'bloomberg.com',
  'cnbc.com',
  'forbes.com',
  'businessinsider.com',
  'ft.com',
  'marketwatch.com',
  'techcrunch.com',
  'wired.com',
  'arstechnica.com',
  'theverge.com',

  // International news
  'aljazeera.com',
  'dw.com',
  'france24.com',
  'sputniknews.com',
  'rt.com',
  'scmp.com',
  'timesofindia.indiatimes.com',

  // ✅ Indian news websites
  'ndtv.com',
  'thehindu.com',
  'hindustantimes.com',
  'indiatoday.in',
  'indianexpress.com',
  'dnaindia.com',
  'deccanherald.com',
  'deccanchronicle.com',
  'economictimes.indiatimes.com',
  'financialexpress.com',
  'livemint.com',
  'news18.com',
  'outlookindia.com',
  'scroll.in',
  'telegraphindia.com',
  'theprint.in',
  'thequint.com',
  'newindianexpress.com',
  'oneindia.com',
  'republicworld.com',
  'opindia.com',
  'swarajyamag.com',
  'business-standard.com',
  'firstpost.com',
  'thewire.in',
  'boomlive.in', // Fact-checking site
  'altnews.in', // Fact-checking site

  // Fake news/satire (for testing AI capabilities)
  'infowars.com',
  'naturalnews.com',
  'theonion.com',
  'clickhole.com'
];

/**
 * Checks if a domain is in our monitored news domains list
 * @param {string} domain - The domain to check
 * @returns {boolean} - True if domain is a monitored news site
 */
export function isNewsDomain(domain) {
  // Remove www. prefix if present
  const normalizedDomain = domain.replace(/^www\./, '');
  
  // Check if domain or any of its parent domains are in our list
  return NEWS_DOMAINS.some(newsDomain => {
    // Check for exact match
    if (normalizedDomain === newsDomain) {
      return true;
    }
    
    // Check if it's a subdomain of a news domain
    if (normalizedDomain.endsWith('.' + newsDomain)) {
      return true;
    }
    
    return false;
  });
}

/**
 * Gets domain information if available
 * @param {string} domain - The domain to get info for
 * @returns {object|null} - Domain info or null if not found
 */
export function getDomainInfo(domain) {
  // This could be expanded to include more information about each domain
  // such as known bias, reliability ratings from media watchdogs, etc.
  
  // For now, just return a basic indicator that we recognize the domain
  if (isNewsDomain(domain)) {
    return {
      monitored: true,
      domain: domain.replace(/^www\./, '')
    };
  }
  
  return null;
}
