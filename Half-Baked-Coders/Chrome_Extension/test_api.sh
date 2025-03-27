#!/bin/bash

# This script sends a test request to your Flask API to verify it's working correctly

# The ngrok URL for your Flask API
API_URL="https://e89e-183-182-87-182.ngrok-free.app/fact_check"

# Sample article content to test with
ARTICLE="
The new study found that drinking coffee each morning can reduce the risk of heart disease by 15%. Researchers at Stanford University tracked 10,000 participants for five years and found that those who consumed at least 2 cups of coffee daily showed improved cardiovascular markers compared to non-coffee drinkers. The study was published in the Journal of Medical Research last month. Critics note that the study didn't account for other lifestyle factors that might influence heart health.
"

# Send test request using form data
echo "Sending test request to $API_URL..."
curl -X POST "$API_URL" \
  -F "text=$ARTICLE" \
  -v

echo -e "\n\nNote: If you see a 500 error, check your Flask server logs for details."