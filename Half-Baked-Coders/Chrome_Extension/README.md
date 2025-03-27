# VeriFact AI - Chrome Extension

This Chrome extension verifies news article reliability using an AI-powered fact-checking agent.

## Features

- Automatically detects when you're browsing a news website
- Extracts article content for analysis
- Connects with a sophisticated AI fact-checking agent
- Provides reliability scores and detailed fact-checking information
- Beautiful, intuitive user interface

## How to Install

1. Download or clone this repository to your local machine
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files
5. The VeriFact AI extension is now installed and ready to use

## How to Use

1. Visit any news website from our supported domains list
2. Click on the VeriFact AI icon in your browser toolbar
3. Click the "Analyze Reliability" button to check the article
4. View the reliability score and detailed analysis results

## Testing Your API Connection

We've included a test script to verify your Flask API connection is working correctly:

```bash
./test_api.sh
```

This will send a test request to your API endpoint and display the response, which can help diagnose any connection issues.

## Troubleshooting

If you encounter issues with the extension, check the following:

1. **API Connection Problems**: 
   - Ensure your Flask server at `https://e89e-183-182-87-182.ngrok-free.app` is running
   - Check that the API endpoint accepts JSON data with a "text" field
   - Use the test_api.sh script to verify direct API connectivity

2. **Extension Not Loading**: 
   - Make sure developer mode is enabled in Chrome
   - Verify the extension was loaded correctly using "Load unpacked"
   - Check the Chrome DevTools console for any JavaScript errors

3. **No Analysis Results**:
   - Open Chrome DevTools, go to the Console tab while on the popup
   - Look for any error messages from the API calls
   - Verify you're on a valid news article page

## API Integration

The extension connects to an AI fact-checking agent built with the smol agents library. The API endpoint is configurable in the `utils/apiService.js` file.

## Supported News Domains

The extension monitors a wide range of news websites. For the complete list, see `utils/domainList.js`.

## Technologies Used

- JavaScript ES6+
- Chrome Extension APIs
- AI-powered fact-checking (using Llama 3.3 70B via Groq)

## License

MIT