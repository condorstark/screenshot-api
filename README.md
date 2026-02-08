# Screenshot API

Puppeteer-based screenshot service for n8n workflows.

## Endpoints

### POST /screenshot
Generate screenshot from HTML

**Request:**
```json
{
  "html": "<html>...</html>"
}
```

**Response:** JPG image (binary)

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-02-08T12:00:00.000Z",
  "uptime": 123.45
}
```

## Deploy to Railway

1. Connect this repo to Railway
2. Railway will auto-detect Dockerfile
3. Deploy automatically
4. Get public URL

## Local Development

```bash
npm install
npm start
```

Server runs on http://localhost:3000

## Test

```bash
curl -X POST http://localhost:3000/screenshot \
  -H "Content-Type: application/json" \
  -d '{"html": "<html><body><h1>Test</h1></body></html>"}'
```
