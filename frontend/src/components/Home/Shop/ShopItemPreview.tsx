import React, { ReactElement, useState } from "react"
import styled from "styled-components"
import { Item } from "./ShopModal"

const PreviewContainer = styled.div`
	height: 60%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	grid-template-rows: repeat(2, 1fr);
	grid-column-gap: 10px;
	grid-row-gap: 0px;
	border: solid 4px black;

	> div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.div1 {
		grid-area: 1 / 1 / 3 / 2;
	}
	.div2 {
		grid-area: 1 / 2 / 3 / 3;
	}
	.div3 {
		align-items: center;
		grid-area: 1 / 3 / 3 / 4;
	}

	p {
		margin: 0;
	}

	img {
		height: 5rem;
		width: auto;
	}
`

const ItemName = styled.h4`
	font-size: 1.5rem;
	text-overflow: ellipsis;
	white-space: nowrap;
`

const ItemDescription = styled.p`
	font-size: 0.9rem;
`

const ShopItemPriceContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: auto;

	p {
		font-size: 1.25rem;
		margin-left: 0.5rem;
	}
`

const ItemQuantity = styled.span`
	color: #333333;
	font-size: 0.7rem;
`

interface Props {
	activeItem: Item
	shopMode: string
}

export default function ShopItemPreview(props: Props): ReactElement {
	const {
		item_name,
		item_effect,
		item_effect_stat,
		item_effect_value,
		item_effect_duration,
		item_cost,
		item_icon,
	} = props.activeItem

	const sanitizeItemEffect = () => {
		let effect = item_effect.toLowerCase()
		let writtenEffectStat = ""
		console.log(item_effect_stat)
		if (item_effect_stat === "1") {
			writtenEffectStat = "Strength"
		} else if (item_effect_stat === "2") {
			writtenEffectStat = "Dexterity"
		} else {
			writtenEffectStat = "Intelligence"
		}

		switch (effect) {
			case "heal":
				return `Heal yourself for ${item_effect_value} Hit Points`
			case "buff":
				return `Increase your ${writtenEffectStat} by ${item_effect_value} for ${item_effect_duration} turns`
			case "debuff":
				return `Decrease the enemy's ${writtenEffectStat} by ${item_effect_value} for ${item_effect_duration} turns`
		}
	}

	if (props.activeItem.item_name === "") {
		return <div></div>
	} else {
		return (
			<PreviewContainer>
				<div className="div1">
					<img src={`/icons/items/${item_icon}`} alt="item icon" />
				</div>
				<div className="div2">
					<ItemName>{item_name}</ItemName>
					<ItemDescription>{sanitizeItemEffect()}</ItemDescription>
				</div>
				<div className="div3">
					<ShopItemPriceContainer>
						<i className="nes-icon coin"></i>
						<p>{item_cost}</p>
						<ItemQuantity>
							{props.shopMode === "sell"
								? `x${props.activeItem.quantity}`
								: ""}
						</ItemQuantity>
					</ShopItemPriceContainer>
				</div>
			</PreviewContainer>
		)
	}
}
