import fs from "fs/promises";

const htmlViewsPath = "./public/views/";

export const getHtmlContent = async (fName) => {
  try {
    const content = await fs.readFile(htmlViewsPath + fName, {
      encoding: "utf8",
    });

    return content;
  } catch (err) {
    log(
      `error on read html file ${htmlViewsPath + fName}: ${err.message}`,
      "error"
    );
    return undefined;
  }
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
