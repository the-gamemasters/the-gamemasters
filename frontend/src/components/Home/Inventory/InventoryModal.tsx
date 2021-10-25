import React, { ReactElement, useState, useEffect } from "react"
import ReactModal from "react-modal"
import CloseButton from "../../General/CloseButton"
import InventoryLeft from "./InventoryLeft"
import InventoryRight from "./InventoryRight"
import styled from "styled-components"

const inventoryModalStyles = {
	overlay: {
		backgroundColor: "rgba(39, 39, 39, 0.6)",
	},
	content: {
		padding: "1.5rem 2rem",
		borderColor: "#000",
		borderStyle: "solid",
		borderWidth: "4px",
		backgroundColor: "white",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		border: "none",
		background: "none",
		outline: "none",
		height: "85%",
		width: "70%",
	},
}

const ModalContent = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 7fr;
	grid-column-gap: 0px;
	grid-row-gap: 25px;
	height: 80%;
`

const ModalContentTop = styled.div`
	height: 100%;
`

const ModalContentBottom = styled.div`
	display: grid;
	grid-template-columns: 2fr 3fr;
	grid-column-gap: 25px;
	grid-row-gap: 0px;
`

export interface Item {
	item_key: number
	item_name: string
	item_effect: string
	item_effect_stat: string
	item_effect_value: number
	item_effect_duration: number
	item_cost: number
	world: number
	item_icon: string
}

const blankItem: Item = {
	item_key: 0,
	item_name: "",
	item_effect: "",
	item_effect_stat: "",
	item_effect_value: 0,
	item_effect_duration: 0,
	item_cost: 0,
	world: 0,
	item_icon: "",
}

const blankItems: Item[] = []

ReactModal.setAppElement("#root")

interface Props {
	inventoryOpen: boolean
	closeModal: any
}

export default function InventoryModal(props: Props): ReactElement {
	const [activeItem, setActiveItem] = useState(blankItem)
	const [inventoryItems, setInventoryItems] = useState(blankItems)

	useEffect(() => {
		setInventoryItems(require("./inventoryItems.json"))
	}, [inventoryItems])

	const handleClickItem = (item: Item) => {
		setActiveItem(item)
	}

	return (
		<ReactModal style={inventoryModalStyles} isOpen={props.inventoryOpen}>
			<CloseButton closeModal={props.closeModal} />
			<h2 className="title nes-text is-success">Inventory</h2>
			<ModalContent>
				<ModalContentTop></ModalContentTop>
				<ModalContentBottom>
					<InventoryLeft
						inventoryItems={inventoryItems}
						handleClickItem={handleClickItem}
						activeItem={activeItem}
					/>
					<InventoryRight activeItem={activeItem} />
				</ModalContentBottom>
			</ModalContent>
		</ReactModal>
	)
}
