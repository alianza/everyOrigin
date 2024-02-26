# EveryOrigin CORS Proxy

As I had A number of projects using data from other domains and I grew tired of having to use 3rd CORS proxies, which always seems to be unstable, slow, unsafe and short-lived. So, I decided to build my own.

I built EveryOrigin using Next.js and Next.js Api routes as back-end and hosted it on Netlify. The service is free and open-source and was inspired by similar services like [allorigins.win](https://allorigins.win) and [whateverorigin.org](https://whateverorigin.org).

The service is completely free to use and doesn't require any API key or rate limit.


## Getting Started

First, install the dependencies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The service is hosted on Netlify and is automatically deployed when changes are pushed to the `main` branch.
