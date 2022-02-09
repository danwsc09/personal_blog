---
sidebar_position: 2
title: Nuxt Server Middleware
---
## Nuxt Server Middleware
Using Node server from Nuxt in SPA mode.
1. Add the following in nuxt.config.js
```js
serverMiddleware: [
    // Will register file from project server-middleware directory to handle /server-middleware/* requires
    { path: '/server-middleware', handler: '~/server-middleware/openGraphScraper.ts' },
  ],
```
2. Create the file: `~/server-middleware/openGraphScraper.ts`
3. Write an endpoint (or middleware with `next()` at the end) (used https://nodejs.dev/learn/get-http-request-body-data-using-nodejs)
```js
export default function(req, res, next) {
  // req: Http Request object
  // res: Http Response object
  // next: pass to next middleware (if not an endpoint)
  request.on('data', async (chunk) => {
    const { url } = JSON.parse(chunk.toString())
    console.log('url:', url)

    response.setHeader('Content-Type', 'application/json')
    const openGraphData = await getOpenGraphData(url)
    response.end(JSON.stringify(openGraphData))
  })
}
```