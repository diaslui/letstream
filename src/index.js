import http from "node:http";
import { indexhandler } from "./handlers.js";
import { log } from "./utils.js";

const routes = [{ path: "/", handler: indexhandler }];

const server = new http.Server((req, res) => {
  log(
    `HTTP REQUEST - ${req.method} : ${req.url} => ${res.statusCode} ${
      res.getHeaders()["content-type"]
    } `,
    "info"
  );
  const thisPath = routes.find((route) => req.url == route.path);
  if (thisPath) {
    thisPath.handler(req, res);
    return;
  }

  res.writeHead(500, { "content-type": "text/plain" });
  res.end("Internal Server Error");
});

const PORT = 12219;
server.listen(PORT, "0.0.0.0", () => {
  log(`to more info acess https://github.com/diaslui/letstream.git`, "alert");
  log(`http server listening on http://0.0.0.0:${PORT}`, "alert");
});
