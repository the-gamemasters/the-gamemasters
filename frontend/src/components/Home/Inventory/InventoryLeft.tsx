import React, { ReactElement } from "react";
import styled from "styled-components";
import { Item } from "./InventoryModal";

interface Props {
	inventoryItems: Item[];
	handleClickItem: any;
	activeItem: Item;
}

const InventoryLeftContainer = styled.div`
	height: 100%;
	width: 100%;
`;

export default function ShopLeft(props: Props): ReactElement {
	return <InventoryLeftContainer></InventoryLeftContainer>;
}
