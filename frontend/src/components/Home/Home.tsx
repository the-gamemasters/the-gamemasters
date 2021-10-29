import React, { ReactElement, useEffect, useState } from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import {
	selectCharId,
	selectUserId,
	setCharId,
	setUserId,
} from "../../redux/userSlice"
import Character from "./Character"
import Community from "./Community"
import HomeAction from "./HomeAction"
import ShopPreview from "./ShopPreview"
import User from "./User"

interface Props {}

const PageContainer = styled.div`
	height: 100vh;
	width: 100vw;
`

const HomeContainer = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 60% 40%;
`

const HomeTop = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 1fr;
`

const HomeBottom = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-template-rows: 1fr;
`

const TopRight = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 20% 80%;
	background-image: none;
	background-position: center;
	background-size: cover;
	color: white;
	border-left: 2px solid black;
	border-bottom: 2px solid black;
`

export default function Home(props: Props): ReactElement {
	const [currentWorld, setCurrentWorld] = useState(2)
	const userId = useAppSelector(selectUserId)
	const charId = useAppSelector(selectCharId)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(setUserId(30))
		dispatch(setCharId(23))
	}, [])

	const handleWorldChange = (world: number) => {
		setCurrentWorld(world)
	}

	const getWorldName = () => {
		return worldList[currentWorld - 1].world_name
	}

	return (
		<PageContainer>
			<HomeContainer>
				<HomeTop>
					<Community />
					<TopRight
						style={{
							backgroundImage: `url(/images/${
								worldList[currentWorld - 1].background
							})`,
						}}>
						<div>
							<h2>{getWorldName()}</h2>
							<h5>{`World ${currentWorld}`}</h5>
						</div>
						<User />
						<div>
							{/* For Debugging */}
							<label htmlFor="world_select">Choose World</label>
							<div className="nes-select is-warning">
								<select
									required
									id="world_select"
									value={currentWorld}
									onChange={(e) =>
										handleWorldChange(
											Number(e.target.value)
										)
									}>
									<option
										value=""
										disabled
										defaultValue="2"
										hidden>
										Select World...
									</option>
									<option value="1">
										World 1: Big Head, Small Arms
									</option>
									<option value="2">
										World 2: Queen of the Nile
									</option>
									<option value="3">
										World 3: Feudal Feud
									</option>
									<option value="4">
										World 4: The Hot War
									</option>
									<option value="5">World 5: Overshot</option>
								</select>
							</div>
						</div>
						<ShopPreview currentWorld={currentWorld} />
					</TopRight>
				</HomeTop>
				<HomeBottom>
					<Character />
					<HomeAction />
				</HomeBottom>
			</HomeContainer>
		</PageContainer>
	)
}

const worldList = [
	{
		world_number: 1,
		world_name: "Big Head, Small Arms",
		theme: "Triassic Period",
		boss: "Rex the T",
		drops_available: "Items",
		background: "world-1.png",
		notes: "",
	},
	{
		world_number: 2,
		world_name: "Queen of the Nile",
		theme: "Egypt",
		boss: "Cleopatra",
		drops_available: "Items, Weapon",
		background: "world-2.jpg",
		notes: "",
	},
	{
		world_number: 3,
		world_name: "Feudal Feud",
		theme: "Middle Ages",
		boss: "Lord Maxximus IV",
		drops_available: "Items, Weapon, Armor",
		background: "world-3.jpg",
		notes: "",
	},
	{
		world_number: 4,
		world_name: "The Hot War",
		theme: "80's",
		boss: "Dictator Ronald Reagan",
		drops_available: "Items, Weapon, Armor",
		background: "world-4.png",
		notes: "",
	},
	{
		world_number: 5,
		world_name: "Overshot",
		theme: "Future",
		boss: "(PVP)",
		drops_available: "Glory",
		background: "world-5.jpg",
		notes: "",
	},
]
