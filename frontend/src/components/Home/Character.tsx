import React, { ReactElement } from "react"
import styled from "styled-components"

const CharacterContainer = styled.div`
	background-color: #36363671;
	display: grid;
	grid-template-columns: 3fr 4fr;
	grid-template-rows: 1fr;
`

const CharacterLeft = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 1fr;
`

const CharacterCenteredDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const CharacterAvatar = styled.img`
	height: 7em;
	width: auto;
	border: 1px solid black;
`

const CharacterItemsBox = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-column-gap: 10px;
	grid-row-gap: 10px;
`

const CharacterItem = styled.img`
	height: 4em;
	width: 4em;
	border: 0.5px solid black;
	background-color: white;
`

const CharacterRight = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 3fr 1fr;
`

const CharacterStatsContainer = styled.div`
	background-color: white;
	text-align: left;
`

interface Props {}

export default function Character(props: Props): ReactElement {
	return (
		<CharacterContainer>
			<CharacterLeft>
				<CharacterCenteredDiv>
					<CharacterAvatar src="https://i.ibb.co/616CyGJ/07uxrtxid7w41-1.png" />
				</CharacterCenteredDiv>
				<CharacterItemsBox>
					<CharacterCenteredDiv>
						<CharacterItem src="https://www.seekpng.com/png/detail/113-1134090_trojan-helmet-helmet-8-bit.png" />
					</CharacterCenteredDiv>
					<CharacterCenteredDiv>
						<CharacterItem src="https://static.wikia.nocookie.net/theabyssmod/images/8/8d/Grid_Phantom_Chestplate.png" />
					</CharacterCenteredDiv>
					<CharacterCenteredDiv>
						<CharacterItem src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/1c/Iron_Leggings_%28item%29_JE2_BE2.png" />
					</CharacterCenteredDiv>
					<CharacterCenteredDiv>
						<CharacterItem src="https://images.cdn2.stockunlimited.net/preview1300/pixel-art-magic-boots_1959552.jpg" />
					</CharacterCenteredDiv>
				</CharacterItemsBox>
			</CharacterLeft>
			<CharacterRight>
				<CharacterCenteredDiv>
					<CharacterStatsContainer className="nes-container">
						<div>STR: 16</div>
						<div>DEX: 5</div>
						<div>CON: 10</div>
						<div>INT: 8</div>
					</CharacterStatsContainer>
				</CharacterCenteredDiv>
				<CharacterCenteredDiv>
					<button type="button" className="nes-btn">
						Open Inventory
					</button>
				</CharacterCenteredDiv>
			</CharacterRight>
		</CharacterContainer>
	)
}