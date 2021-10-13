import bcrypt from "bcrypt"

interface User {
	username: string
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

export { register }
