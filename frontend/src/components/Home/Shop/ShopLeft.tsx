import React, { ReactElement } from "react";
import styled from "styled-components";
import ShopList from "./ShopList";
import { Item } from "./ShopModal";

interface Props {
	shopItems: Item[];
	handleClickItem: any;
	activeItem: Item;
}

const ShopLeftContainer = styled.div`
	height: 100%;
	width: 100%;
`;

export default function ShopLeft(props: Props): ReactElement {
	return (
		<ShopLeftContainer>
			<ShopList
				handleClickItem={props.handleClickItem}
				shopItems={props.shopItems}
				activeItem={props.activeItem}
			/>
		</ShopLeftContainer>
	);
}
