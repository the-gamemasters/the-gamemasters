import bcrypt from "bcrypt"

interface User {
	userName: string
	email: string
	password: string
}

async function register(req: any, res: any) {
	const db = req.app.get("db")

	const { userName, email, password }: User = req.body

	if (!email) {
		res.status(200).json("Please provide an email and password")
	} else {
		db.Users.find_user_by_email(email).then((inputUserEmail: any) => {
			if (inputUserEmail.length > 0) {
				return res.status(200).json("Email account already in use")
			} else {
				if (!userName) {
					res.status(200).json("Please provide a username")
				} else {
					db.Users.find_user_by_username(userName)
						.then((inputUserUsername: any) => {
							if (inputUserUsername.length > 0) {
								return res
									.status(200)
									.json("Username is unavailable")
							} else {
								const salt = bcrypt.genSaltSync(10)
								const hash = bcrypt.hashSync(password, salt)

								const newUser = db.Users.create_user(
									userName,
									email,
									hash
								)
									.then(() => {
										return res
											.status(200)
											.send("Account Created")
									})
									.catch((e: any) => {
										console.log(e)
									})
							}
						})
						.catch((e: any) => {
							console.log(e)
						})
				}
			}
		})
	}
}

function findUser(req: any, res: any) {
	const { email } = req.body
	const db = req.app.get("db")
	db.find_user_by_email(email).then((dbUser: any) => {
		if (!(dbUser.length > 0)) {
			res.status(200).json("No user found")
		} else {
			res.status(200).json(dbUser)
		}
	})
}

function login(req: any, res: any) {
	const { email, password } = req.body
	const db = req.app.get("db")
	db.Users.find_user_by_email(email)
		.then((dbUser: any) => {
			if (!(dbUser.length > 0)) {
				res.status(200).json("username or password do not match")
			} else {
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(password, salt)
				const isValid = bcrypt.compareSync(password, dbUser[0].password)

				if (!isValid) {
					res.status(200).json("username or password do not match")
				} else {
					req.session.user = {
						username: dbUser[0].username,
						userKey: dbUser[0].user_key,
					}
					res.status(200).send(req.session.user)
				}
			}
		})
		.catch((e: any) => {
			console.log(e)
		})
}

function logout(req: any, res: any) {
	req.session.destroy()
	res.sendStatus(200)
}

export { register, findUser, login, logout }
