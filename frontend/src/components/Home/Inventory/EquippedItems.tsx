import React, { ReactElement, useState } from "react"
import styled from "styled-components"
import { Equipment } from "./InventoryModal"

const EquippedItemsContainer = styled.div`
	border: none;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	> div {
		height: 100%;
		width: 70%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
`

const EquippedBox = styled.div`
	height: 5rem;
	width: 5rem;
	border: 4px solid #000000;
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

interface Props {
	equippedArmor: Equipment
	equippedWeapon: Equipment
	handleClickItem: any
	activeItem: Equipment
}

export default function EquippedItems(props: Props): ReactElement {
	const [armorHovered, setArmorHovered] = useState(false)
	const [weaponHovered, setWeaponHovered] = useState(false)

	const handleArmorHover = () => {
		setArmorHovered(!armorHovered)
	}

	const handleWeaponHover = () => {
		setWeaponHovered(!weaponHovered)
	}
	return (
		<EquippedItemsContainer>
			<div>
				<EquippedBox
					onClick={() => props.handleClickItem(props.equippedArmor)}
					onMouseEnter={() => handleArmorHover()}
					onMouseLeave={() => handleArmorHover()}
					style={{
						backgroundColor: armorHovered
							? "#bdbdbd"
							: props.activeItem === props.equippedArmor
							? "#969696"
							: undefined,
					}}
				>
					<img
						src={`/icons/equipment/${props?.equippedArmor.equipment_icon}`}
						alt="current armor"
					/>
				</EquippedBox>
				<EquippedBox
					onClick={() => props.handleClickItem(props.equippedWeapon)}
					onMouseEnter={() => handleWeaponHover()}
					onMouseLeave={() => handleWeaponHover()}
					style={{
						backgroundColor: weaponHovered
							? "#bdbdbd"
							: props.activeItem === props.equippedWeapon
							? "#969696"
							: undefined,
					}}
				>
					<img
						src={`/icons/equipment/${props?.equippedWeapon.equipment_icon}`}
						alt="current weapon"
					/>
				</EquippedBox>
			</div>
		</EquippedItemsContainer>
	)
}
