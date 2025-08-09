import https from "https";
import waitgroup from "../src/index.js";

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    const wg = waitgroup();
    const urls = [
        "https://developer.mozilla.org/",
        "https://www.golang.org/",
    ];

    wg.add(urls.length);
    for (const url of urls) {
        https.get(url, (res) => {
            console.log("content-length", res.headers["content-length"]);
            wg.done();
        });
    }

    wg.add();
    Promise.resolve().then(async () => {
        console.log("Task started");
        await sleep(1000)
        console.log("Task completed");
        wg.done();
    });

    await wg.wait();
    console.log("All tasks completed");
}

main();
