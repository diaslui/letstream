import * as fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
const htmlViewsDir = "./public/views/";
const publicDir = "./public";
const MIME_TYPES = {
  ".js": "application/javascript",
};

export const getHtmlContent = async (fName) => {
  try {
    const content = await fsPromises.readFile(htmlViewsDir + fName, {
      encoding: "utf8",
    });

    return content;
  } catch (err) {
    log(
      `error on read html file ${htmlViewsDir + fName}: ${err.message}`,
      "error"
    );
    return undefined;
  }
};

export const solvePublic = (req, res) => {
  const chilDir = req.url.split("/assets")[1];
  const ext = path.extname(chilDir).toLowerCase();
   log(
      `HTTP REQUEST (public) - ${req.method} -  ${req.url}`,
      "info"
    );

  const contentType = MIME_TYPES[ext];
  if (!contentType) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("unknown mimetype.");
    return;
  }
  const fullFileDir = publicDir + chilDir;

  const stream = fs.createReadStream(fullFileDir);
  stream.pipe(res);
  res.writeHead(200, { "content-type": contentType });
  

  stream.on("error", (err) => {
        log(
      `error on read public file: ${err}`,
      "error"
    );
    res.end("Internal Server Error");
  });
};

export const log = (message, logType) => {
  const logColors = {
    error: "\x1b[31m",
    info: "\x1b[36m",
    alert: "\x1b[33m",
    reset: "\x1b[0m",
  };

  const logColor = logColors[logType.toLowerCase()] || logColors.info;

  console.log(
    `${logColor} ${new Date().toISOString()} - ${message} ${logColors.reset}`
  );
};
