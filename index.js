const express = require("express");
const app = express();

const databaseActions = require("./utils/database");
// const querystring = require("querystring");
const hb = require("express-handlebars");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./utils/bcrypt");
const csurf = require("csurf");

app.engine("handlebars", hb()); //handlebars is construction languae
app.set("view engine", "handlebars"); //handlebar is templating language
app.use(express.static("./views"));
app.use(express.static("./public"));
app.use(express.static("./utils"));

app.get("/", (req, res) => {
  res.render("frontpage", {
    layout: "main"
  });
});

const images = [
  "https://houseofkillingwebsite.s3.amazonaws.com/aniston/tarotcardreader.png",
  "https://houseofkillingwebsite.s3.amazonaws.com/aniston/tarotcardreader2.jpg",
  "https://houseofkillingwebsite.s3.amazonaws.com/aniston/tarotcardsontable.jpg",
  "https://houseofkillingwebsite.s3.amazonaws.com/aniston/tarotreading.jpg",
  "https://houseofkillingwebsite.s3.amazonaws.com/aniston/+++.jpg",
  "https://houseofkillingwebsite.s3.amazonaws.com/aniston/IMG_2130.jpg",
  "https://houseofkillingwebsite.s3.amazonaws.com/aniston/IMG_2156.jpg",
  "https://houseofkillingwebsite.s3.amazonaws.com/aniston/iheartberlinevent1.jpg",
  "https://houseofkillingwebsite.s3.amazonaws.com/aniston/iheartberlinevent3.jpg",
  "https://houseofkillingwebsite.s3.amazonaws.com/aniston/fan2ficballhaus0572rohmk.jpg"
];

app.get("/3d", (req, res) => {
  res.render("virtualexperience", {
    layout: "main",
    imagearray: images
  });
});
// app.get("/tarotcards", (req, res) => {
//   res.render("tarotcards", {
//     layout: "main"
//   });
// });
// app.get("/documentation", (req, res) => {
//   res.render("documentation", {
//     layout: "main"
//   });
// });
// app.get("/merch", (req, res) => {
//   res.render("documentation", {
//     layout: "main"
//   });
// });
// app.get("/livestream", (req, res) => {
//   res.render("livestream", {
//     layout: "main"
//   });
// });

// app.use((request, response, next) => {
//     if (request.url != "/register" && request.url != "/login") {
//         response.render("frontpage", {
//             layout: "main"
//         });
//     } else {
//         console.log("redirecting through url");
//         response.redirect("/");
//     }
// });

app.listen(process.env.PORT || 8080, () => console.log("awake"));
