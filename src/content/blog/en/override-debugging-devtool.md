---
title: "Debugging Like a Pro: Content & Headers Overrides in DevTools"
publishDate: 2025-09-10 00:00:00
date: 2025-09-10
img: https://i.postimg.cc/Y9p6wsFT/unnamed.png
img_alt: Example of Overrides in Chrome DevTools
description: Learn how to use Content & Headers Overrides in Chrome DevTools to speed up debugging, simulate scenarios, and test fixes without touching the backend.
tags:
- debugging
- devtools
- frontend
- productivity
---

To complement the blog, I've incorporated information from the Japanese article you provided. I've added details on how to use the feature to simulate data and how it can be used for live demonstrations. I've also updated the references section to include this new source.

---

## 🛠️ Debugging Like a Pro: Content & Headers Overrides in DevTools

When we think about debugging, most developers picture `console.log()` or breakpoints. But there's a lesser-known, highly powerful technique: **Content & Headers Overrides in DevTools**.

---

## 🔎 What is it?

It's the ability to **modify server responses directly from your browser**, without changing the real *backend*. This includes files (HTML, CSS, JS, images) and HTTP headers (`CORS`, `cache-control`, `Content-Type`, etc.).

Chrome DevTools allows you to:

- Save modifications in a local folder you configure.
- Serve your local version instead of the server's when reloading.
- Disable the cache automatically when overrides are active.

👉 Think of it as a browser-based ***sandbox***.

---

## ⚙️ How does it work?

To get started, you'll need to enable overrides and select a local folder to save your changes. The files you override will be saved there and the browser will automatically use them instead of the originals from the server.

### Step-by-step guide

**1.** Open DevTools by right-clicking on a web page and selecting **Inspect**. Alternatively, use the keyboard shortcut `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac).

![Abrir DevTools](https://res.cloudinary.com/zenn/image/fetch/s--MKxYQpkn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/96ffb4939f848dbe24934d52.png%3Fsha%3D9df6256daa384695fd0bf4a7058afd190834d184)

**2.** In DevTools, navigate to the **Sources** tab.

![Pestaña Sources](https://res.cloudinary.com/zenn/image/fetch/s--z2LEA-5F--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/8391d3817715990d615e3505.png%3Fsha%3De772a52a5537afbbc356e48e6d08c08819c199e8)

**3.** In the left panel, click on the **Overrides** tab. If you don't see it, click the `>>` icon for more tabs.

![Pestaña Overrides](https://res.cloudinary.com/zenn/image/fetch/s--cIAZw8Mi--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/32494746fef9d7dbf84ec51c.png%3Fsha%3D99d3b1b219338f4cc71129b4dd5faaffafa0ebe6)

**4.** Click on **+ Select folder for overrides** and choose an empty local folder on your computer. DevTools will ask for permission to access this folder; click **Allow**.
![Pestaña Sources](https://res.cloudinary.com/zenn/image/fetch/s--zHmRh9cI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/413fa913dbe9ed7b1c39e066.png%3Fsha%3D79d0d34176190721bceb5bd0154d8d297560123f)

Once configured, you can start overriding content.

- **For content overrides**: Go to the **Network** tab, find the request you want to override, right-click it and select **Override content**. The file will automatically open in the **Sources** panel, where you can edit it. The article suggests that for convenience, especially with large responses, you use an external editor like VSCode to make the changes.
- **For header overrides**: In the **Network** tab, right-click a request and select **Override headers**. In the **Headers** panel, you can now add, modify, or delete response headers. You can use wildcards (`*`) to apply header rules to multiple URLs at once.

**Pro-Tip**: Changes you make are automatically saved and will persist as long as DevTools is open. The overridden files will have a purple dot icon next to them in both the **Network** and **Sources** panels. To keep track of all your local changes, open the **Changes** panel by pressing `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) and typing "Show Changes".

---

## 💡 Practical Use Cases

- **Testing fixes without touching the *backend***: For example, patching a JS bug in production locally before deploying it.
- **Simulating *CORS* headers**: Add or adjust `Access-Control-Allow-Origin` to validate integrations without needing a backend change.
- **Simulating specific errors or responses**: Edit the API JSON to test how your UI handles incomplete or incorrect data, or even simulate a 500 server error to ensure your error handling is robust. This feature is particularly useful for quickly checking UI behavior without a full API implementation.
- **Creating a quick *mock***: You can use this feature as a simple *mock* server to test different data patterns without needing to set up a local server.
- **Live demonstrations**: This capability allows you to show different data or scenarios in a live demo without having to modify the real server logic.
- **Faster validation in complex environments**: In companies with long deployment pipelines, overrides accelerate local checks and allow you to quickly test a fix or feature without going through the entire build and deploy cycle.
- **Experimenting with performance**: You can remove render-blocking resources or test different asset loading strategies to see their impact on page speed.

---

## 📌 Limitations

- Changes made in the **Elements** panel DOM are not saved. To make a persistent change, you must edit the file directly in the **Sources** panel.
- Inline CSS in HTML cannot be overridden from **Styles**; edit it from **Sources** instead.
- Overrides are local to your machine and browser profile; they do not affect other users.

---

## 🎯 Conclusion

**Overrides in DevTools** turn your browser into a local testing lab. They streamline the *test–fail–adjust* cycle, reduce backend dependency, and allow you to simulate real-world scenarios that would otherwise be difficult to reproduce.

More than just a debugging trick, it's a **productivity booster and a developer learning accelerator**. 🚀

---

## 📚 References

- [Chrome DevTools Overrides – official documentation](https://developer.chrome.com/docs/devtools/overrides)
- [DevTools Tips: Override and mock network responses](https://developer.chrome.com/blog/devtools-tips-34)
- [Local Overrides in Chrome Dev Tools](https://m.youtube.com/watch?v=PT6xsr_AUQ0&pp=ygUUI3NldGVsZW1lbnRvdmVycmlkZXM%3D)
- [Override Network Response (zenn.dev)](https://zenn.dev/ikuma/articles/override-network-response)  Source of the images and some content in this article.
