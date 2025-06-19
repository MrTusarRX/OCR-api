# OCR API

A **minimal, production‑ready REST service** that wraps [Tesseract.js](https://github.com/naptha/tesseract.js) to perform Optical Character Recognition (OCR) on images submitted as Base64 data URIs.

**Made with ❤️ by **[**MrTusarRX**](https://github.com/MrTusarRX)

---

## ✨ Features

- **Single **``** endpoint** – send an image, get text back.
- Accepts **PNG, JPG, WebP, GIF** & other common formats via a Base‑64 data URI (`data:image/*;base64,...`).
- Uses Tesseract.js’ **WASM engine** for fast, server‑side recognition (English language by default).
- **Tiny footprint** – just Express, Tesseract.js and \~10 lines of glue code.
- **12‑factor friendly** – port is configurable through the `PORT` env var; logs to stdout.
- Ready to deploy to Render, Vercel, Railway, Fly.io, or any Node‑compatible host.

---

## 🚀 Quick start

### Prerequisites

| Tool              | Version |
| ----------------- | ------- |
| Node.js           | `>=14`  |
| npm / pnpm / yarn | any     |

### Installation & local run

```bash
# 1. Grab the code
$ git clone https://github.com/MrTusarRX/OCR-api.git
$ cd OCR-api

# 2. Install dependencies
$ npm install   # or pnpm install / yarn install

# 3. Fire it up
$ npm start     # starts on http://localhost:3000 by default
# OR
$ PORT=8080 node index.js
```

You should see:

```
🟢 OCR API running at http://localhost:3000/ocr
```

---

## 📡 API usage

### Endpoint

`POST /ocr`

### Request headers

| Header         | Value              |
| -------------- | ------------------ |
| `Content-Type` | `application/json` |

### Request body

```json
{
  "img": "data:image/png;base64,iVBORw0KGgoAAA..."
}
```

### Example (cURL)

```bash
curl -X POST http://localhost:3000/ocr \
     -H "Content-Type: application/json" \
     -d '{"img":"data:image/png;base64,iVBORw0KGgoAAA..."}'
```

### Successful response

```json
{
  "status": "success",
  "text": "Hello, world!"
}
```

### Error responses

| HTTP status | JSON shape (example)                                                  | Reason                                             |
| ----------- | --------------------------------------------------------------------- | -------------------------------------------------- |
| 400         | `{ "status": "error", "message": "Invalid or missing base64 image" }` | No `img` field, or value is not a `data:image` URI |
| 500         | `{ "status": "error", "message": "<tesseract‑js error text>" }`       | Unexpected failure during OCR                      |

> **Size limit:** The request body is capped at **10 MB** (see `express.json({ limit: '10mb' })`).

---

## 🔧 Configuration

| Env var | Default | Description                     |
| ------- | ------- | ------------------------------- |
| `PORT`  | `3000`  | Port the HTTP server listens on |

> All other parameters (language, worker concurrency, etc.) can be tweaked directly inside `index.js` if you need more control.

---

## 🐳 Docker (optional)

```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "index.js"]
```

```bash
# Build image
docker build -t ocr-api .
# Run container
docker run -p 3000:3000 ocr-api
```

---

## ☁️ Deployment guides

1. **New ➜ Web Service** → connect this repo.
2. Build command: `npm install`\
   Start command: `node index.js`
3. Add a free plan **PostgreSQL** or **Redis** add‑on if you need persistence (not required for basic OCR).

- Create a **Vercel Serverless Function** (`api/ocr.js`) that re‑exports the Express app using `vercel/express`.

You can deploy anywhere that supports Node 14 +.

---

## 🔮 Roadmap

-

Feel free to open issues or PRs for any of the above 🎉.

---

## 🤝 Contributing

1. **Fork** the repository.
2. Create a new feature branch: `git checkout -b feat/my-new-feature`.
3. Commit your changes: `git commit -m "feat: add my new feature"`.
4. **Push** to your branch: `git push origin feat/my-new-feature`.
5. Open a **Pull Request**.

Please follow the existing code style and add tests (if applicable).

---

## 📝 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

