const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../../models/User");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@oute             GET api/users/test
// @description     Tests users route
// @access          public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

//@oute             GET api/users/register
// @description     register
// @access          public
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //use mongoose to find if user exists
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json({ userExists: errors.email });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: "200",
                r: "pg",
                d: "mm"
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password,
                date: Date.now()
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

//@oute             GET api/users/register
// @description     login / returning jwt token
// @access          public
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = "User not found.";
            return res.status(404).json({ userNotFound: errors.email });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //user match
                const payload = { id: user.id, name: user.name, avatar: user.avatar };
                //sign token
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({ succes: true, token: "Bearer " + token });
                });
            } else {
                errors.password = "Password incorrect.";
                return res.status(400).json({ incorectPass: errors.password });
            }
        });
    });
});

//@oute             GET api/users/curent
// @description     return current user/
// @access          private

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
});

module.exports = router;
