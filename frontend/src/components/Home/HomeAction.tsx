import React, { ReactElement } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const HomeActionContainer = styled.div`
	background-color: #6dc074;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 2fr 1fr;
`

const HomeActionTop = styled.div`
	display: flex;
	padding: 2em 4em;
	box-sizing: border-box;
	text-align: left;
`

const HomeActionBottom = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: 1fr;
`

interface Props {}

export default function HomeAction(props: Props): ReactElement {
	return (
		<HomeActionContainer>
			<HomeActionTop>
				"I saw a group of suspicious-looking individuals with swords
				poking around the Tomb of the Clockmaster. Go make sure they
				don't disturb the dead, please."
			</HomeActionTop>
			<HomeActionBottom>
				<div></div>
				<div>
					<Link
						to={{
							pathname: "/combat",
							state: { pvp: false },
						}}>
						<button type="button" className="nes-btn is-primary">
							Venture Forth!
						</button>
					</Link>
				</div>
			</HomeActionBottom>
		</HomeActionContainer>
	)
}
