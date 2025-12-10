import http from "node:http";
import { indexhandler } from "./handlers.js";
import { log, solvePublic } from "./utils.js";
import {WebSocketServer} from "ws";

const routes = [{ path: "/", handler: indexhandler }];

const server = new http.Server((req, res) => {

  if (req.url.startsWith("/assets")){
    solvePublic(req,res);
    return;
  };

  log(
    `HTTP REQUEST - ${req.method} : ${req.url} => ${res.statusCode}`,
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

const wss = new WebSocketServer({server});
wss.on("connection", (conn) =>{
  log(`new wss conn`, "info");

})

const PORT = 12219;
server.listen(PORT, "0.0.0.0", () => {
  log(`to more info acess https://github.com/diaslui/letstream.git`, "alert");
  log(`http server listening on http://0.0.0.0:${PORT}`, "alert");
});
