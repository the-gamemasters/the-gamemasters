import React, { ReactElement } from "react";
import styled from "styled-components";
import { Item } from "./ShopModal";

import ShopItemPreview from "./ShopItemPreview";

interface Props {
	activeItem: Item;
	shopMode: string;
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
`;

export default function ShopRight(props: Props): ReactElement {
	return (
		<ShopRightContainer>
			<ShopItemPreview activeItem={props.activeItem} />
			{props.shopMode === "buy" ? (
				<button className={"nes-btn is-success"}>Buy</button>
			) : (
				<button className={"nes-btn is-error"}>Sell</button>
			)}
		</ShopRightContainer>
	);
}
