const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    if (req.url === "/") {
      const content = fs.readFile(
        path.join(__dirname, "views", "index.html"),
        (err, data) => {
          if (err) throw new Error(err);
          res.end(data);
        }
      );
    } else if (req.url === "/about") {
      const content = fs.readFile(
        path.join(__dirname, "views", "about.html"),
        (err, data) => {
          if (err) throw new Error(err);
          res.end(data);
        }
      );
    } else if (req.url === "/api/users") {
      res.setHeader("Content-Type", "application/json");
      const users = [
        {
          name: "Elena",
          age: "20",
        },
        {
          name: "Vladlin",
          age: "26",
        },
      ];
      res.end(JSON.stringify(users));
    }
  }
  if (req.method === "POST") {
    const body = [];

    req.on("data", (data) => {
      body.push(data.toString());
    });
    req.on("end", () => {
      res.setHeader("Content-Type", "text/html;charset=utf-8");
      message = body[0].split("=")[1];
      res.end(`
   <h1>Your messages ${message}</h1>
   `);
    });
  }
});

server.listen(3000, () => {
  console.log("Server is runnin");
});
