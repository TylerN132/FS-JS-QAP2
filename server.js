//sets as a http
const http = require("http");
//sets the fileshare modual
const fs = require("fs");
//sets the events
const EventEmitter = require("events");
//sets the port
const port = 8080;
//This designates the request/response of the sever and listens on that port
class eventemitter extends EventEmitter {}
const myevents = new eventemitter();
myevents.on("route", (route) => {
  console.log("serving " + route);
});
myevents.on("error", (error) => {
  console.log(error);
});
myevents.on("html status", (status) => {
  console.log("htmlstatus " + status);
});
myevents.on("message", (message) => {
  console.log("" + message);
});

http
  .createServer(function (request, response) {
    //requests the url.
    let url = request.url;
    switch (url) {
      case "/":
        fs.readFile("./views/index.html", function (error, data) {
          if (error) {
            myevents.emit("error", error);
          } else {
            myevents.emit("route", url);
            //displays the Content-type as plain text.
            response.writeHead(200, { "Content-Type": "text/html" });
            myevents.emit("html status", 200);
            response.write(data);
            response.end();
          }
        });
        break;

      case "/about":
        fs.readFile("./views/about.html", function (error, data) {
          if (error) {
            myevents.emit("error", error);
          } else {
            myevents.emit("route", url);
            response.writeHead(200, { "Content-Type": "text/html" });
            myevents.emit("html status", 200);
            myevents.emit("message", "Please take me home");
            response.write(data);
            response.end();
          }
        });
        break;

      case "/contact":
        fs.readFile("./views/contact.html", function (error, data) {
          if (error) {
            myevents.emit("error", error);
          } else {
            myevents.emit("route", url);
            response.writeHead(200, { "Content-Type": "text/html" });
            myevents.emit("html status", 200);
            myevents.emit("message", "Turn Around");
            response.write(data);
            response.end();
          }
        });
        break;

      case "/fun":
        fs.readFile("./views/fun.html", function (error, data) {
          if (error) {
            myevents.emit("error", error);
          } else {
            myevents.emit("route", url);
            response.writeHead(200, { "Content-Type": "text/html" });
            myevents.emit("html status", 200);
            myevents.emit("message", "Dead End");
            response.write(data);
            response.end();
          }
        });

        break;

      case "/video":
        fs.readFile("./views/video.html", function (error, data) {
          if (error) {
            myevents.emit("error", error);
          } else {
            myevents.emit("route", url);
            response.writeHead(200, { "Content-Type": "text/html" });
            myevents.emit("html status", 200);
            myevents.emit("message", "Just going to ignore me huh?");
            response.write(data);
            response.end();
          }
        });

        break;

      default:
        fs.readFile("./views/404.html", function (error, data) {
          if (error) {
            myevents.emit("error", error);
          } else {
            myevents.emit("route", url);
            response.writeHead(404, { "Content-Type": "text/html" });
            myevents.emit("html status", 404);
            myevents.emit("message", "I see how it is");
            response.write(data);
            response.end();
          }
        });

        break;
    }
  })
  .listen(port);

console.log(`listening on http://localhost:${port}/`);
