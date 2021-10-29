import React, { ReactElement } from "react"
import styled from "styled-components"
import ShopItem from "./ShopItem"
import { Item } from "./ShopModal"

interface Props {
	shopItems: Item[]
	handleClickItem: any
	activeItem: Item
	currentWorld: number
	charItems: Item[]
	shopMode: string
}

const ShopListContainer = styled.div`
	height: 100%;
	width: 90%;
	padding: 0;
`

const List = styled.ul`
	list-style: none;
	padding: 0;
`

export default function ShopList(props: Props): ReactElement {
	if (props.shopMode === "buy") {
		return (
			<ShopListContainer className="nes-container">
				<List
				// listLength={props.shop.items.length || 4}
				>
					{props.shopItems.map((ele, i) => {
						if (ele.world === props.currentWorld) {
							return (
								<ShopItem
									handleClickItem={props.handleClickItem}
									activeItem={props.activeItem}
									item={ele}
									key={i}
									shopMode={props.shopMode}
								/>
							)
						}
					})}
				</List>
			</ShopListContainer>
		)
	} else {
		return (
			<ShopListContainer className="nes-container">
				<List
				// listLength={props.shop.items.length || 4}
				>
					{props.charItems.map((ele, i) => {
						return (
							<ShopItem
								handleClickItem={props.handleClickItem}
								activeItem={props.activeItem}
								item={ele}
								key={i}
								shopMode={props.shopMode}
							/>
						)
					})}
				</List>
			</ShopListContainer>
		)
	}
}
