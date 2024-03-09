require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes.js");
const passportSetup = require("./config/passportConfig.js");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const passport = require("passport");
const profileRoutes = require("./routes/profileRoutes.js")


const app = express();

// set view engine
app.set("view engine", "ejs");

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.cookieKey]
}))

// register regenerate & save after the cookieSession middleware initialization
app.use(function(request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb()
    }
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb()
    }
  }
  next()
})

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// connect to mongodb
// mongoose.connect(process.env.MONGO_URL, () => {
//     console.log('Connected to Mongodb');
// });
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MONGODB"))
  .catch((error) => console.log("Error connecting MONGODB : ",error));

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000");
});
