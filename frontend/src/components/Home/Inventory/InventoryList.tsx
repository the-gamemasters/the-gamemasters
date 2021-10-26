import React, { ReactElement } from "react"
import styled from "styled-components"
import InventoryItem from "./InventoryItem"
import { Equipment } from "./InventoryModal"

interface Props {
	inventoryItems: Equipment[]
	handleClickItem: any
	activeItem: Equipment
}

const InventoryListContainer = styled.div`
	border: 4px solid black;
	height: 100%;
	width: 90%;
	background-color: #dddddd;
`

const List = styled.ul`
	list-style: none;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
`

export default function InventoryList(props: Props): ReactElement {
	return (
		<InventoryListContainer className="">
			<List
			// listLength={props.shop.items.length || 4}
			>
				{props.inventoryItems.map((ele, i) => {
					return (
						<InventoryItem
							handleClickItem={props.handleClickItem}
							activeItem={props.activeItem}
							item={ele}
							key={i}
						/>
					)
				})}
			</List>
		</InventoryListContainer>
	)
}
