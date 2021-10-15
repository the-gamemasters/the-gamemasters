import React, { ReactElement, useState } from "react"
import styled from "styled-components"
import axios from "axios";

import CloseButton from "../General/CloseButton"

interface Props {
	closeModal: () => void
}

export default function AccountCreation(props: Props): ReactElement {
	const [email, setEmail] = useState<string>("")
	const [userName, setUserName] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [passwordConfirm, setPasswordConfirm] = useState<string>("")

	function submitNewUser() {
		if(password !== passwordConfirm){
			return(alert("Passwords do not match"))
		}
		axios.post('/api/register', {userName, email, password})
			.then(res => {
				if (typeof res.data === "string"){
				//If account is properly created, post message, and close modal, otherwise just post message\\
					if (res.data === "Account Created"){
						props.closeModal();
					}
					alert(res.data)

				}else{
				//If I somehow get a response that isn't text, log it -- might tie in here for additional functionality\\
					console.log(res.data);
				}
			})
			.catch( e => {
				console.log(e);
			})
	}

	return (
		<div>
			<CloseButton closeModal={() => props.closeModal()} />

			<form onSubmit={() => submitNewUser()}>
				<label>Email</label>
				<input
					type="text"
					required
					value={email}
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>User Name</label>
				<input
					type="text"
					required
					value={userName}
					placeholder="User Name"
					onChange={(e) => setUserName(e.target.value)}
				/>
				<label>Password</label>
				<input
					type="text"
					required
					value={password}
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label>Confirm Password</label>
				<input
					type="text"
					required
					value={passwordConfirm}
					placeholder="Confirm Password"
					onChange={(e) => setPasswordConfirm(e.target.value)}
				/>
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}
