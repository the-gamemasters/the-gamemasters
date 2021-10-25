import React, { ReactElement } from "react"
import styled from "styled-components"
import ShopItem from "./InventoryItem"
import { Item } from "./InventoryModal"

interface Props {
	shopItems: Item[]
	handleClickItem: any
	activeItem: Item
}

const InventoryListContainer = styled.div`
	height: 100%;
	width: 90%;
	padding: 0;
`

const List = styled.ul`
	list-style: none;
	padding: 0;
`

export default function InventoryList(props: Props): ReactElement {
	return (
		<InventoryListContainer className="nes-container">
			<List
			// listLength={props.shop.items.length || 4}
			>
				{props.shopItems.map((ele, i) => {
					if (ele.world === 2) {
						return (
							<ShopItem
								handleClickItem={props.handleClickItem}
								activeItem={props.activeItem}
								item={ele}
								key={i}
							/>
						)
					}
				})}
			</List>
		</InventoryListContainer>
	)
}
