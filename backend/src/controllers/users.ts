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
		await db.Users.find_user_by_email(email).then(
			async (inputUserEmail: any) => {
				if (inputUserEmail.length > 0) {
					return res.status(200).json("Email account already in use")
				} else {
					if (!userName) {
						res.status(200).json("Please provide a username")
					} else {
						await db.Users.find_user_by_username(userName)
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
			}
		)
	}
}

async function findUser(req: any, res: any) {
	const { email } = req.body
	const db = req.app.get("db")
	await db.find_user_by_email(email).then((dbUser: any) => {
		if (!(dbUser.length > 0)) {
			res.status(200).json("No user found")
		} else {
			res.status(200).json(dbUser)
		}
	})
}

async function login(req: any, res: any) {
	const { email, password } = req.body
	const db = req.app.get("db")
	await db.Users.find_user_by_email(email)
		.then(async (dbUser: any) => {
			if (!(dbUser.length > 0)) {
				res.status(200).json("username or password do not match")
			} else {
				// I don't know if you need lines 79 and 80.  the const hash isn't being used anywhere.
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(password, salt)
				const isValid = bcrypt.compareSync(password, dbUser[0].password)

				if (!isValid) {
					res.status(200).json("username or password do not match")
				} else {
					await db.Characters.characterKey(dbUser[0].user_key)
						.then((dbCharacter: any) => {
							if (dbCharacter.length > 0) {
								req.session.user = {
									username: dbUser[0].username,
									userKey: dbUser[0].user_key,
									characterKey: dbCharacter[0].character_key,
								}
								res.status(200).send(req.session.user)
							} else {
								req.session.user = {
									username: dbUser[0].username,
									userKey: dbUser[0].user_key,
								}

								res.status(200).send(req.session.user)
							}
						})
						.catch((err: any) => {
							console.log(err)
						})
				}
			}
		})
		.catch((err: any) => {
			console.log(err)
		})
}

function isLoggedIn(req: any) {
	console.log(req.session)
}

function logout(req: any, res: any) {
	req.session.destroy()
	res.sendStatus(200)
}

export { register, findUser, login, logout, isLoggedIn }
