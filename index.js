const express = require("express");
const app = express();
const databaseActions = require("./utils/database");
// const querystring = require("querystring");
const hb = require("express-handlebars");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./utils/bcrypt");
const csurf = require("csurf");
const archive = require("./public/data.json");

var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.engine("handlebars", hb()); //handlebars is construction languae
app.set("view engine", "handlebars"); //handlebar is templating language
app.use(express.static("./views"));
app.use(express.static("./public"));
app.use(express.static("./utils"));

io.on("connection", socket => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chatmessage", msg => {
    console.log("message: " + msg);
    io.emit("chatmessage", msg);
  });
  socket.on("livestream", video => {
    console.log("reciving");
    console.log("livestream", video);
    io.emit("livestream", video);
  });
});

app.get("*", (req, res) => {
  if (
    window.location === "http://houseofkilling.com/" ||
    window.location === "http://www.houseofkilling.com"
  ) {
    window.location = "https://www.houseofkilling.com";
  }
});

app.get("/", (req, res) => {
  res.render("frontpage", {
    layout: "main"
  });
});
//
app.get("/JenniferAnistonSuperfansDigitalTarotLandscape", (req, res) => {
  res.render("virtualexperience", {
    layout: "main"
  });
});
app.get("/archive", (req, res) => {
  res.render("5thdimension", {
    layout: "main"
  });
});
app.get("/emojicon", (req, res) => {
  res.render("emojicon", {
    layout: "secondary"
  });
});
app.get("/passthevirtualjoint", (req, res) => {
  res.render("livestream", {
    layout: "third"
  });
});
app.get("/webcamlandscape", (req, res) => {
  res.render("webcamlandscape", {
    layout: "third"
  });
});

app.get("/game", (req, res) => {
  res.render("game", {
    layout: "third"
  });
});

http.listen(process.env.PORT || 8080, () => console.log("awake"));
