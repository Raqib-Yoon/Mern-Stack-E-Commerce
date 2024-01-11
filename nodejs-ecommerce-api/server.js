import http from "http";
import app from "./app/app.js";

const server = http.createServer(app);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
