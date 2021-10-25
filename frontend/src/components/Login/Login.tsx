import { ReactElement, useState } from "react"
import styled from "styled-components"
import AccountCreation from "./AccountCreation"
import BackgroundMusic from "../General/BackgroundMusic"
import { Link } from "react-router-dom"
import axios from "axios"

const LoginContainer = styled.div`
	padding: 4rem;
	height: 100vh;
	width: 100vw;
	background-image: url("/images/login-background.gif");
	background-size: cover;
	background-position: center bottom;
`

const GameTitle = styled.h1`
	color: #ffffff;
	-webkit-text-stroke: 1px black;
`

const LoginForm = styled.form`
	padding: 2em 0;
	width: 40%;
	height: 50%;
	display: flex;
	flex-direction: column;
	row-gap: 25px;
	margin: auto;
	align-items: center;
	justify-content: space-evenly;
	margin-bottom: 10vh;
	background-color: #ffffff;

	input {
		width: 100%;
	}

	label,
	p {
		margin: 0;
	}

	button {
		margin-top: 1rem;
	}
`

const ModalContainer = styled.div`
	position: fixed !important;
	background-color: white;
	width: 50%;
	height: 75%;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`
interface Props {}

export default function Login(props: Props): ReactElement {
	const [newUser, setNewUser] = useState<boolean>(false)
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	function submitLogin() {
		if (email.length === 0) {
			alert("Please enter email and password, or create a new user")
		} else {
			axios
				.put("/api/login", { email, password })
				.then((res) => {
					if (typeof res.data === "string") {
						alert(res.data)
					} else {
						console.log(res.data)
						window.location.hash = "#Char"
					}
				})
				.catch((e) => {
					console.log(e)
				})
		}
	}

	return (
		<LoginContainer>
			<BackgroundMusic musicSrc={"audio/music/track11-login.mp3"} />
			<GameTitle>Time-Battle Dungeons</GameTitle>
			<LoginForm className="nes-container">
				<div className="nes-field">
					<label htmlFor="email">
						<p className="nes-text is-primary">Email</p>
					</label>
					<input
						type="text"
						placeholder="Enter Email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="nes-input"
					/>
				</div>
				<div className="nes-field">
					<label htmlFor="password">
						<p className="nes-text is-primary">Password</p>
					</label>
					<input
						type="text"
						placeholder="Enter Password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="nes-input"
					/>
				</div>

				<button
					className="nes-btn is-primary"
					onClick={() => submitLogin()}
				>
					Login
				</button>
			</LoginForm>
			<button
				className="nes-btn is-success"
				onClick={() => setNewUser(!newUser)}
			>
				Create an Account
			</button>

			{newUser ? (
				<ModalContainer className="nes-container">
					<AccountCreation closeModal={() => setNewUser(false)} />
				</ModalContainer>
			) : null}
		</LoginContainer>
	)
}
