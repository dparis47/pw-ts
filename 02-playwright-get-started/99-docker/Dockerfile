
#https://playwright.dev/docs/docker
# playwright version should match the version that in the package.json
FROM mcr.microsoft.com/playwright:v1.47.0-noble

RUN mkdir /app
WORKDIR /app
COPY ../../.. /app

RUN npm install --force
RUN npx playwright install