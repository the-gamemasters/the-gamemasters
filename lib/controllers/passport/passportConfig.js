"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//not implemented at this time
const users_1 = require("../users");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = require("passport");
const passport_local_1 = require("passport-local");
const customFields = {
    usernameField: "email",
    passwordField: "password",
};
const salt = bcryptjs_1.default.genSaltSync(10);
const password = "";
const hash = bcryptjs_1.default.hashSync(password, salt);
const verifyCallback = (username, password, done) => {
    const db = req.app.get("db");
    (0, users_1.findUser)(username)
        .then((dbUser) => {
        console.log("this is user", dbUser.username);
        console.log("this is email", dbUser.email);
        if (!(dbUser.lenght > 0)) {
            return done(null, false);
        }
        const isValid = bcryptjs_1.default.compareSync(password, dbUser.password.hash);
        if (isValid) {
            return done(null, dbUser);
        }
        else {
            return done(null, false);
        }
    })
        .catch((err) => {
        done(err);
    });
};
const strategy = new passport_local_1.Strategy(customFields, verifyCallback);
(0, passport_1.serializeUser)((myUser, done) => {
    done(null, myUser.id);
});
(0, passport_1.deserializeUser)((userId, done) => {
    const db = req.app.get("db");
    (0, users_1.findUser)(userId)
        .then((myUser) => {
        done(null, myUser);
    })
        .catch((err) => done(err));
});
passport.use(strategy);
