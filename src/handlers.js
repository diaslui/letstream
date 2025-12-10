import { getHtmlContent } from "./utils.js";

export const notFound = (req, res) => {
  res.writeHead(404);
  res.end("not found.");
};

export const indexhandler = async (req, res) => {
  const template = await getHtmlContent("index.html");
  if (!template) {
    notFound(req, res);
    return;
  }
  res.writeHead(200, { "content-type": "text/html" });
  res.end(template, "utf-8");
};
