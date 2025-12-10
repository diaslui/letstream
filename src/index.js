import http from "node:http";

const server = new http.Server();
const PORT = 12219
server.listen(PORT, "0.0.0.0", () => {
    console.log(`listening on http://0.0.0.0:${PORT}`)

});