import React, { ReactElement, useState } from "react"
import styled from "styled-components"
import { Equipment } from "./InventoryModal"

interface Props {
	item: Equipment
	handleClickItem: any
	activeItem: Equipment
}

const InventoryItemContainer = styled.li`
	background-color: white;
	height: 20%;
	width: auto;
	border-bottom: 1px solid #000000;
	border-right: 1px solid #000000;
	display: grid;
	place-items: center;
	cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
			14 0,
		pointer;

	img {
		height: 4rem;
		width: auto;
	}
`

export default function InventoryItem(props: Props): ReactElement {
	const [hovered, setHovered] = useState(false)

	const handleHover = () => {
		setHovered(!hovered)
	}

	return (
		<InventoryItemContainer
			onMouseEnter={() => handleHover()}
			onMouseLeave={() => handleHover()}
			onClick={() => props.handleClickItem(props.item)}
			style={{
				backgroundColor: hovered
					? "#bdbdbd"
					: props.activeItem === props.item
					? "#969696"
					: undefined,
			}}
		>
			<img
				src={
					props.item.equipment_icon !== ""
						? `/icons/equipment/${props.item.equipment_icon}`
						: `/icons/equipment/item-placeholder.png`
				}
				alt="item icon"
			/>
		</InventoryItemContainer>
	)
}
