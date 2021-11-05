import React, { ReactElement, useState } from "react"
import styled from "styled-components"
import { Item } from "./ShopModal"
import SFX from "../../General/SFX"
import { useAppSelector } from "../../../redux/reduxHooks"
import { selectCharGold } from "../../../redux/userSlice"

import ShopItemPreview from "./ShopItemPreview"
import { render } from "@testing-library/react"

interface Props {
	activeItem: Item
	shopMode: string
	handleBuyItem: any
	handleSellItem: any
}

const ShopRightContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 4fr 1fr;
	height: 100%;
	justify-items: center;

	button {
		width: 40%;
	}
`

export default function ShopRight(props: Props): ReactElement {
	const [activeSFX, setActiveSFX] = useState(false)
	const gold = useAppSelector(selectCharGold)

	const handleButtonClick = (action: "buy" | "sell") => {
		if (action === "buy" && props.activeItem.item_cost > gold) {
			return alert(`You don't have enough Gold!`)
		}
		if (!activeSFX) {
			setActiveSFX(true)
		}

		if (action === "buy") {
			props.handleBuyItem(props.activeItem)
		} else {
			props.handleSellItem(props.activeItem)
		}
	}

	const handleEndSFX = () => {
		setActiveSFX(false)
	}

	return (
		<ShopRightContainer>
			{activeSFX ? (
				<SFX
					sfxSrc={"audio/sfx/sfx-shop-buy.wav"}
					handleEndSFX={handleEndSFX}
				/>
			) : (
				""
			)}
			<ShopItemPreview
				shopMode={props.shopMode}
				activeItem={props.activeItem}
			/>
			{props.shopMode === "buy" ? (
				<button
					onClick={() => handleButtonClick("buy")}
					className={"nes-btn is-success"}>
					Buy
				</button>
			) : (
				<button
					onClick={() => handleButtonClick("sell")}
					className={"nes-btn is-error"}>
					Sell
				</button>
			)}
		</ShopRightContainer>
	)
}
