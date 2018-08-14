const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const passport = require("passport");

// main dependencies
/*  express             main framework
            mongoose            connect and interact with mongoDB
            passport            used for authentification
            passport-jwt        jason web token
            jsonwebtoken        used to actually generate the web token
            bodyparser          to take data through our requests
            bcryptjs            for passwords
            validator           for validations

npm i express mongoose passport passport-jwt jsonwebtoken bodyparser bcryptjs validator

npm i -D nodemon        watch for code changes
        */

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
    .connect(db)
    .then(() => console.log("mongo db connected"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

// use routes

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running at port ${port}`));
