"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.findUser = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = req.app.get("db");
        const { userName, email, password } = req.body;
        if (!email) {
            res.status(200).json("Please provide an email and password");
        }
        else {
            db.Users.find_user_by_email(email).then((inputUserEmail) => {
                if (inputUserEmail.length > 0) {
                    return res.status(200).json("Email account already in use");
                }
                else {
                    if (!userName) {
                        res.status(200).json("Please provide a username");
                    }
                    else {
                        db.Users.find_user_by_username(userName)
                            .then((inputUserUsername) => {
                            if (inputUserUsername.length > 0) {
                                return res
                                    .status(200)
                                    .json("Username is unavailable");
                            }
                            else {
                                const salt = bcrypt_1.default.genSaltSync(10);
                                const hash = bcrypt_1.default.hashSync(password, salt);
                                const newUser = db.Users.create_user(userName, email, hash)
                                    .then(() => {
                                    return res
                                        .status(200)
                                        .send("Account Created");
                                })
                                    .catch((e) => {
                                    console.log(e);
                                });
                            }
                        })
                            .catch((e) => {
                            console.log(e);
                        });
                    }
                }
            });
        }
    });
}
exports.register = register;
function findUser(req, res) {
    const { email } = req.body;
    const db = req.app.get("db");
    db.find_user_by_email(email).then((dbUser) => {
        if (!(dbUser.length > 0)) {
            res.status(200).json("No user found");
        }
        else {
            res.status(200).json(dbUser);
        }
    });
}
exports.findUser = findUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const db = req.app.get("db");
        yield db.Users.find_user_by_email(email)
            .then((dbUser) => {
            if (!(dbUser.length > 0)) {
                res.status(200).json("username or password do not match");
            }
            else {
                // I don't know if you need lines 79 and 80.  the const hash isn't being used anywhere.
                const salt = bcrypt_1.default.genSaltSync(10);
                const hash = bcrypt_1.default.hashSync(password, salt);
                const isValid = bcrypt_1.default.compareSync(password, dbUser[0].password);
                if (!isValid) {
                    res.status(200).json("username or password do not match");
                }
                else {
                    db.Characters.characterKey(dbUser[0].user_key)
                        .then((dbCharacter) => {
                        if (dbCharacter.length > 0) {
                            req.session.user = {
                                username: dbUser[0].username,
                                userKey: dbUser[0].user_key,
                                characterKey: dbCharacter[0].character_key,
                            };
                            res.status(200).send(req.session.user);
                        }
                        else {
                            req.session.user = {
                                username: dbUser[0].username,
                                userKey: dbUser[0].user_key,
                            };
                            res.status(200).send(req.session.user);
                        }
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                }
            }
        })
            .catch((err) => {
            console.log(err);
        });
    });
}
exports.login = login;
function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
}
exports.logout = logout;
