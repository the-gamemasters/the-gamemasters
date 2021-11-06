import React, { ReactElement } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { NPCPrompts } from "./NPCPrompts"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import { selectWorld } from "../../redux/userSlice"

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

	const world = useAppSelector(selectWorld)
	
	function findPrompt(myWorld: number){
		const promptsFromWorld = NPCPrompts.filter(myPrompt => myPrompt.world === myWorld)
		return promptsFromWorld[Math.floor(promptsFromWorld.length * Math.random())]
	}

	const dispPrompt = findPrompt(world)

	return (
		<HomeActionContainer>
			<HomeActionTop>
				<p>
					{dispPrompt.body}
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
