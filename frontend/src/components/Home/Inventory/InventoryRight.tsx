import React, { ReactElement } from "react";
import styled from "styled-components";
import { Item } from "./InventoryModal";

import ShopItemPreview from "./ShopItemPreview";

interface Props {
	activeItem: Item;
}

const InventoryRightContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 4fr 1fr;
	height: 100%;
	justify-items: center;

	button {
		width: 40%;
	}
`;

export default function ShopRight(props: Props): ReactElement {
	return (
		<InventoryRightContainer>
			<ShopItemPreview activeItem={props.activeItem} />

			<button className={"nes-btn is-success"}>Equip</button>
		</InventoryRightContainer>
	);
}