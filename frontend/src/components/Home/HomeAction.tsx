import React, { ReactElement } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const HomeActionContainer = styled.div`
	background-color: #6dc074;
	display: grid;
	padding: 3em 4em 2em 3em;
	grid-template-columns: 1fr;
	grid-template-rows: 2fr 1fr;
	border-left: 2px solid black;
	border-top: 2px solid black;
`

const HomeActionTop = styled.div`
	display: flex;
	box-sizing: border-box;
	text-align: left;

	> p {
		margin: 0;
	}
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
				<p>
					"I saw a group of suspicious-looking individuals with swords
					poking around the Tomb of the Clockmaster. Go make sure they
					don't disturb the dead, please."
				</p>
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
