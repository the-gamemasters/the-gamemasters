import React, { ReactElement } from "react";
import styled from "styled-components";
import ShopList from "./ShopList";

interface Props {
	shopItems: Item[];
}

export interface Item {
	item_key: number;
	item_name: string;
	item_effect: string;
	item_effect_stat: string;
	item_effect_value: number;
	item_effect_duration: number;
	item_cost: number;
	world: number;
	item_icon: string;
}

const ShopLeftContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 7fr;
	grid-column-gap: px;
	grid-row-gap: 5px;
	height: 1fr;
`;

const SwitchModeBtn = styled.button`
	width: 15rem;
	height: 3rem;
	font-size: 0.8rem;
`;

export default function ShopLeft(props: Props): ReactElement {
	return (
		<ShopLeftContainer>
			<SwitchModeBtn className="nes-btn is-primary is-small">
				Switch Shop Mode
			</SwitchModeBtn>
			<ShopList shopItems={props.shopItems} />
		</ShopLeftContainer>
	);
}
