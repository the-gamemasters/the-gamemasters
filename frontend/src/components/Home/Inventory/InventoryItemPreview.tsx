import React, { ReactElement, useState } from "react"
import styled from "styled-components"
import { Equipment } from "./InventoryModal"

const PreviewContainer = styled.div`
	height: 70%;
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
	font-size: 1.1rem;
	text-overflow: ellipsis;
	white-space: nowrap;
`

const ItemStats = styled.p`
	font-size: 0.8rem;
`

interface Props {
	activeItem: Equipment
	equippedArmor: Equipment
	equippedWeapon: Equipment
	handleEquip: any
}

export default function InventoryItemPreview(props: Props): ReactElement {
	const {
		charactersequipment_key,
		equipment_key,
		equipment_name,
		slot,
		equipment_description,
		equipment_effect_stat,
		equipment_effect_stat_value,
		equipped,
		equipment_icon,
	} = props.activeItem

	const sanitizeItemStats = () => {
		if (slot === 1) {
			if (equipment_effect_stat === "con") {
				return `+${equipment_effect_stat_value} Constitution`
			} else {
				return `+${equipment_effect_stat_value} Dexterity`
			}
		} else {
			if (equipment_effect_stat === "str") {
				return `+${equipment_effect_stat_value} Strength`
			} else {
				return `+${equipment_effect_stat_value} Intelligence`
			}
		}
	}

	if (props.activeItem.equipment_name === "") {
		return <div></div>
	} else {
		return (
			<PreviewContainer>
				<div className="div1">
					<img
						src={
							equipment_icon !== ""
								? `/icons/equipment/${equipment_icon}`
								: `/icons/equipment/item-placeholder.png`
						}
						alt="item icon"
					/>
				</div>
				<div className="div2">
					<ItemName>{equipment_name}</ItemName>
					<ItemStats>{sanitizeItemStats()}</ItemStats>
				</div>
				<div className="div3">
					<button
						className={`nes-btn ${
							props.activeItem.equipment_key ===
								props.equippedArmor.equipment_key ||
							props.activeItem.equipment_key ===
								props.equippedWeapon.equipment_key
								? "is-disabled"
								: "is-success"
						}`}
						onClick={
							props.activeItem.equipment_key ===
								props.equippedArmor.equipment_key ||
							props.activeItem.equipment_key ===
								props.equippedWeapon.equipment_key
								? undefined
								: () => props.handleEquip()
						}
					>
						Equip
					</button>
				</div>
			</PreviewContainer>
		)
	}
}
