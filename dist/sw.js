if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>i(e,t),l={module:{uri:t},exports:o,require:c};s[t]=Promise.all(r.map((e=>l[e]||c(e)))).then((e=>(n(...e),o)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-9kx3olKa.css",revision:null},{url:"assets/index-DbmPHx1n.js",revision:null},{url:"index.html",revision:"ae0756275c2519cf6905efd7ffb57914"},{url:"registerSW.js",revision:"b357b6b9b1bf129bd8f196c5ad477fa2"},{url:"serviceWorker.js",revision:"376521ffc89ac85852e9e30df4535d73"},{url:"manifest.webmanifest",revision:"34c043c279c88248ec9ae7d96a11869d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
