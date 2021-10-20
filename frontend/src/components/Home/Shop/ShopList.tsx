import React, { ReactElement } from "react";
import styled from "styled-components";
import ShopItem from "./ShopItem";
import { Item } from "./ShopLeft";

interface Props {
	shopItems: Item[];
}

const ShopListContainer = styled.div`
	height: 100%;
	width: 90%;
	padding: 0;
`;

const UL = styled.ul`
	list-style: none;
	padding: 0;
`;

export default function ShopList(props: Props): ReactElement {
	return (
		<ShopListContainer className="nes-container">
			<UL
			// listLength={props.shop.items.length || 4}
			>
				{props.shopItems.map((ele, i) => {
					if (ele.world === 2) {
						return <ShopItem item={ele} key={i} />;
					}
				})}
			</UL>
		</ShopListContainer>
	);
}
