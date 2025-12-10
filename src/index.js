import http from "node:http";
import { indexhandler } from "./handlers.js";

const routes = [{ path: "/", handler: indexhandler }];

const server = new http.Server((req, res) => {
  const thisPath = routes.find((route) => req.url == route.path);
  console.log(thisPath)
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
  console.log(`listening on http://0.0.0.0:${PORT}`);
});
