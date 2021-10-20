import { ReactElement, useState } from "react";
import styled from "styled-components";
import AccountCreation from "./AccountCreation";
import Music from "./Music";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginContainer = styled.div`
	padding: 4rem;
	height: 100vh;
	width: 100vw;
`;

const GameTitle = styled.h1`
	color: white;
	-webkit-text-stroke: 1px black;
`;

const LoginForm = styled.form`
	width: 50%;
	height: 50vh;
	display: flex;
	flex-direction: column;
	margin: auto;
	align-items: center;
	justify-content: space-evenly;
	margin-bottom: 10vh;
	background-color: white;

	input {
		width: 70%;
		border: 4px solid black;
	}

	label {
		margin: 0;
	}

	button {
		margin-top: 1rem;
	}
`;

const ModalContainer = styled.div`
	position: fixed !important;
	background-color: white;
	width: 400px;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;
interface Props {}

export default function Login(props: Props): ReactElement {
	const [newUser, setNewUser] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	function submitLogin() {
		if (email.length === 0) {
			alert("Please enter email and password, or create a new user");
		} else {
			axios
				.put("/api/login", { email, password })
				.then((res) => {
					if (typeof res.data === "string") {
						alert(res.data);
					} else {
						console.log(res.data);
						window.location.hash = "#Char";
					}
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}

	return (
		<LoginContainer>
			<GameTitle>Time-Battle Dungeons</GameTitle>
			<LoginForm className="nes-container">
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

				<button
					className="nes-btn is-primary"
					onClick={() => submitLogin()}>
					Login
				</button>
			</LoginForm>
			<button
				className="nes-btn is-success"
				onClick={() => setNewUser(!newUser)}>
				Create a new User
			</button>

			{newUser ? (
				<ModalContainer className="nes-container">
					<AccountCreation closeModal={() => setNewUser(false)} />
				</ModalContainer>
			) : null}
			<Music />
		</LoginContainer>
	);
}
