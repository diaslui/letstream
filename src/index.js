import http from "node:http";
import { indexhandler } from "./handlers.js";
import {log} from "./utils.js"

const routes = [{ path: "/", handler: indexhandler }];

const server = new http.Server((req, res) => {
    
  const thisPath = routes.find((route) => req.url == route.path);
  if (thisPath) {
    console.log("is")
    thisPath.handler(req, res);
    return;
  }

  res.writeHead(500, { "content-type": "text/plain" });
  res.end("Internal Server Error");
});

const PORT = 12219;
server.listen(PORT, "0.0.0.0", () => {
  log(`listening on http://0.0.0.0:${PORT}`, "info");
});
