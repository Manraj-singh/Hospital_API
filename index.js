//*requiring express
const app = require("express")();

//*Define PORT where server needs to run
const PORT = 8000;

//*Requiring configs
const passport = require("passport");
// const passportJWT = require("./configs/passport-jwt-strategy");
const { db, passport: passportJWT } = require("./configs");
const bodyParser = require("body-parser");

//*MIDDLEWARES
//bodyparseer:used to process data sent in an HTTP request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

//initializing passport
app.use(passport.initialize());

//using expresss router
app.use("/", require("./routes"));

//express app listening on defined PORT
app.listen(PORT, (err) => {
  err
    ? console.error("Error while starting app")
    : console.log("Server started on port", PORT);
});
