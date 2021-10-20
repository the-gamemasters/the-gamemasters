import React, { ReactElement } from "react";
import styled from "styled-components";

import ShopItemPreview from "./ShopItemPreview";

interface Props {}

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
			<ShopItemPreview />
			<button className={"nes-btn is-success"}>Buy</button>
		</ShopRightContainer>
	);
}
