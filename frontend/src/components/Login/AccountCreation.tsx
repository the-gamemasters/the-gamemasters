import React, { ReactElement, useState } from "react"
import styled from "styled-components"
import axios from "axios"

import CloseButton from "../General/CloseButton"

const AccountCreationContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const AccountCreationForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: space-bewtween;
	row-gap: 25px;

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: auto;
	}

	label,
	p {
		margin: 0;
	}

	button {
		margin-top: 0.1rem;
	}
`
interface Props {
	closeModal: () => void
}

export default function AccountCreation(props: Props): ReactElement {
	const [email, setEmail] = useState<string>("")
	const [userName, setUserName] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [passwordConfirm, setPasswordConfirm] = useState<string>("")

	function submitNewUser() {
		if (password !== passwordConfirm) {
			return alert("Passwords do not match")
		}
		axios
			.post("/api/register", { userName, email, password })
			.then((res) => {
				if (typeof res.data === "string") {
					//If account is properly created, post message, and close modal, otherwise just post message\\
					if (res.data === "Account Created") {
						props.closeModal()
					}
					alert(res.data)
				} else {
					//If I somehow get a response that isn't text, log it -- might tie in here for additional functionality\\
					console.log(res.data)
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}

	return (
		<AccountCreationContainer>
			<CloseButton closeModal={() => props.closeModal()} />

			<AccountCreationForm
				onSubmit={(e) => {
					e.preventDefault()
					submitNewUser()
				}}>
				<div className="nes-field">
					<label htmlFor="email">
						<p className="nes-text is-primary">Email</p>
					</label>
					<input
						className="nes-input"
						type="text"
						id="email"
						required
						value={email}
						placeholder="gamemaster@tbd.com"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="nes-field">
					<label htmlFor="username">
						<p className="nes-text is-primary">User Name</p>
					</label>
					<input
						className="nes-input"
						type="text"
						id="username"
						required
						value={userName}
						placeholder="thegamemaster56"
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<div className="nes-field">
					<label htmlFor="password">
						<p className="nes-text is-primary">Password</p>
					</label>
					<input
						className="nes-input"
						type="password"
						id="password"
						required
						value={password}
						placeholder="12345"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="nes-field">
					<label htmlFor="confirm">
						<p className="nes-text is-primary">Confirm Password</p>
					</label>
					<input
						className="nes-input"
						type="password"
						id="confirm"
						required
						value={passwordConfirm}
						placeholder="12345"
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
				</div>

				<input
					className="nes-btn is-primary"
					type="submit"
					value="Submit"
				/>
			</AccountCreationForm>
		</AccountCreationContainer>
	)
}
