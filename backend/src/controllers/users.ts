import bcrypt from 'bcrypt';

interface User {
    username: string
    email: string
    password: string
}

async function register(req: any, res: any) {
    const db = req.app.get('db')
  
    const {username, email, password}: User = req.body
  
    if(!email){
        res.status(400).json('Please provide an email and password');

    }else{
        db
            .Users
            .find_user_by_email(email)
            .then ((inputUser: any) => {

                if (inputUser.length > 0) {
                    return res.status(500).json('Email account already in use');

                }else{
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(password, salt);

                    const newUser = db
                        .Users
                        .create_user(username, email, hash)
                        .then(() => {
                            req.session.user = {
                                id: newUser.user_key,
                                username: newUser.username
                            }
                            return res.status(200).send(req.session.user);
                        })
                        .catch((e: any) => {
                            console.log(e);
                        })
                }
            })
            .catch((e: any) => {
                console.log(e);
            })
    }
  }

  export { register }