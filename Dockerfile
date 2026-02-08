# Usa Node.js Alpine (molto più leggero)
FROM node:18-alpine

# Installa dipendenze per Chromium
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Variabile ambiente per Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Working directory
WORKDIR /app

# Copia package files
COPY package*.json ./

# Installa dipendenze
RUN npm install --production --no-optional

# Copia codice
COPY . .

# Esponi porta
EXPOSE 3000

# Avvia server
CMD ["node", "server.js"]
