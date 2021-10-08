import React, { ReactElement, useState } from "react"
import styled from "styled-components"

const CloseButton = styled.button`
	float: right;
	margin-bottom: 5px;
	position: absolute;
	left: 89%;
	bottom: 85%;
`

interface Props {
	closeModal: () => void
}

export default function AccountCreation(props: Props): ReactElement {
	const [email, setEmail] = useState<string>("")
	const [userName, setUserName] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [passwordConfirm, setPasswordConfirm] = useState<string>("")

	return (
		<div>
			<CloseButton
				onClick={() => props.closeModal()}
				type="button"
				className="nes-btn is-error">
				<i className="nes-icon close is-small"></i>
			</CloseButton>

			<form onSubmit={() => alert("Yeah you did it")}>
				<label>Email</label>
				<input
					type="text"
					value={email}
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>User Name</label>
				<input
					type="text"
					value={userName}
					placeholder="User Name"
					onChange={(e) => setUserName(e.target.value)}
				/>
				<label>Password</label>
				<input
					type="text"
					value={password}
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label>Confirm Password</label>
				<input
					type="text"
					value={passwordConfirm}
					placeholder="Confirm Password"
					onChange={(e) => setPasswordConfirm(e.target.value)}
				/>
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}
