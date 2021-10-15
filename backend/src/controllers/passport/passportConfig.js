import { findUser } from '../users';
import bcrypt from 'bcryptjs';
import { serializeUser, deserializeUser, use } from 'passport';
import { Strategy as localStrategy } from 'passport-local';


const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const salt = bcrypt.genSaltSync(10);
const password = "";
const hash = bcrypt.hashSync(password, salt);


const verifyCallback = (username, password, done) => {
    const db = req.app.get("db")
    findUser(username)
        .then ((dbUser) => {
            console.log('this is user', dbUser.username);
            console.log('this is email', dbUser.email);
            if (!(dbUser.lenght > 0)) { return done(null, false) }

            const isValid = bcrypt.compareSync(password, dbUser.password.hash)

            if (isValid) {
                return done(null, dbUser);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {
            done(err);
        });
}

const strategy = new localStrategy(customFields, verifyCallback);

serializeUser((myUser, done) => {
    done(null, myUser.id);
});

deserializeUser((userId, done) => {
    const db = req.app.get('db');
    findUser(userId)
        .then((myUser) => {
            done(null, myUser);
        })
        .catch(err => done(err))
})


passport.use(strategy);