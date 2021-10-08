import React, { ReactElement } from "react"
import styled from "styled-components"

const UserContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 1em;
	box-sizing: border-box;
`
const UserButton = styled.div``

const UserAvatar = styled.img`
	image-rendering: pixelated;
	cursor: pointer;
`

interface Props {}

export default function User(props: Props): ReactElement {
	return (
		<UserContainer>
			<UserAvatar
				className="nes-avatar is-large is-rounded"
				alt="User avatar"
				src="https://www.gravatar.com/avatar?s=15"
			/>
		</UserContainer>
	)
}
