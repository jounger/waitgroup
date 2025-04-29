# waitgroup
JS version like wait group in Golang

Example

```javascript
import http from "http";
import waitgroup from "./waitgroup.js";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const wg = waitgroup();
  const urls = [
    "https://developer.mozilla.org/",
    "https://www.golang.org/",
  ];

  for (const url of urls) {
    wg.add(1);
    http.get(url, (res) => {
      console.log("content-length", res.headers["content-length"] || 0);
      wg.done(1);
    });
  }

  wg.add(1);
  Promise.resolve().then(() => {
    console.log("Task started");
    await sleep(1000)
    console.log("Task completed");
    wg.done(1);
  });

  await wg.wait();
  console.log("All tasks completed");
}

main();
```