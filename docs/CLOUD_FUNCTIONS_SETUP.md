# Firebase Cloud Functions Setup for Groq LLM

## Why Cloud Functions?
The browser can't call Groq API directly due to CORS restrictions. Cloud Functions act as a secure backend proxy.

## Setup Steps

### 1. Find Your Firebase Project ID
```bash
# From firebase.json or Firebase Console > Project Settings
PROJECT_ID="your-project-id"
```

### 2. Update Cloud Function URL
Edit `src/services/llmClient.ts` and replace:
```typescript
const CLOUD_FUNCTION_URL = 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/askDcsLLM';
```
With your actual project ID:
```typescript
const CLOUD_FUNCTION_URL = 'https://us-central1-dcs-companion.cloudfunctions.net/askDcsLLM';
```

### 3. Set Groq API Key in Firebase
```bash
cd functions

# Deploy with secret
firebase functions:config:set groq.api_key="YOUR_GROQ_API_KEY"
```

Or through Firebase Console:
1. Go to **Functions** > **Runtime settings**
2. Add environment variable: `GROQ_API_KEY=your_key`

### 4. Deploy Cloud Function
```bash
cd functions
npm install
npm run build
npm run deploy
```

Or one command:
```bash
firebase deploy --only functions
```

### 5. Test the Deployment
```bash
# Get function logs
firebase functions:log

# Or test via curl
curl -X POST https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/askDcsLLM \
  -H "Content-Type: application/json" \
  -d '{"question":"Hello"}'
```

## Troubleshooting

### 401 Unauthorized
- Groq API key not set in Firebase
- Check: `firebase functions:config:get`

### CORS Error Still Appearing
- Cloud Function wasn't deployed
- Check: `firebase functions:list`

### Function Not Found (404)
- Wrong project ID in llmClient.ts
- Check: `firebase projects:list`

## Cost
- Cloud Functions: Free tier includes 2M invocations/month
- Groq API: Based on token usage (very affordable)

## Monitoring
```bash
# View real-time logs
firebase functions:log --follow

# View specific function
firebase functions:log askDcsLLM
```

## Next Steps
Once deployed, test the "Ask DCS" feature in your app!
