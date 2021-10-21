import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { Item } from "./InventoryModal";

interface Props {
	item: Item;
	handleClickItem: any;
	activeItem: Item;
}

const ShopItemContainer = styled.li`
	height: 5rem;
	border-bottom: 1px solid #000000;
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	grid-template-rows: 1fr;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
	align-items: center;
	cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
			14 0,
		pointer;

	p {
		margin: 0;
	}

	.item-name {
		margin-left: 0.5em;
	}

	img {
		height: 4rem;
		width: auto;
	}
`;

const ShopItemPriceContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: auto;
`;

export default function ShopItem(props: Props): ReactElement {
	const [hovered, setHovered] = useState(false);

	const handleHover = () => {
		setHovered(!hovered);
	};

	const handleClick = () => {
		props.handleClickItem(props.item);
	};

	return (
		<ShopItemContainer
			onMouseEnter={() => handleHover()}
			onMouseLeave={() => handleHover()}
			onClick={() => handleClick()}
			style={{
				backgroundColor: hovered
					? "#bdbdbd"
					: props.activeItem === props.item
					? "#969696"
					: undefined,
			}}>
			<img src={`/icons/shop/${props.item.item_icon}`} alt="item icon" />
			<p className="item-name">{props.item.item_name}</p>
			<ShopItemPriceContainer>
				<i className="nes-icon coin is-small"></i>
				<p>{props.item.item_cost}</p>
			</ShopItemPriceContainer>
		</ShopItemContainer>
	);
}
