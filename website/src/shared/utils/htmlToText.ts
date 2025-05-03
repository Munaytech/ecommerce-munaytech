export function htmlToText(html: string): string {
  if (typeof window === "undefined") {
    const { JSDOM } = require("jsdom");
    const dom = new JSDOM(html);
    return dom.window.document.body.textContent?.trim() || "";
  } else {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent?.trim() || "";
  }
}
