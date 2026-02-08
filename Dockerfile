# Usa immagine Node.js con Chrome pre-installato
FROM ghcr.io/puppeteer/puppeteer:21.6.1

# Imposta working directory
WORKDIR /app

# Copia package files
COPY package*.json ./

# Installa dipendenze
RUN npm install --production

# Copia codice
COPY . .

# Esponi porta
EXPOSE 3000

# Avvia server
CMD ["node", "server.js"]
