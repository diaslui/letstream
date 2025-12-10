export const log = (message, logType) => {
const logColors = {
    error: "\x1b[31m",
    info: "\x1b[36m",
    alert: "\x1b[33m",
    reset: "\x1b[0m",
  };

  const logColor = logColors[logType.toLowerCase()] || logColors.info

  console.log(`${logColor} ${new Date().toISOString()} - ${message} ${logColors.reset}`);
};
