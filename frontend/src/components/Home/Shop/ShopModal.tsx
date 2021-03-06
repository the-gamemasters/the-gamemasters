import React, { ReactElement, useState, useEffect } from "react"
import ReactModal from "react-modal"
import CloseButton from "../../General/CloseButton"
import ShopLeft from "./ShopLeft"
import ShopRight from "./ShopRight"
import styled from "styled-components"
import axios from "axios"
import { useAppSelector, useAppDispatch } from "../../../redux/reduxHooks"
import {
	selectCharId,
	selectUserId,
	selectCharInfo,
	setCharGold,
	setInventory,
	selectInventory,
	selectCharGold,
} from "../../../redux/userSlice"

const shopModalStyles = {
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
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 1fr;

	> div {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
`

const SwitchModeBtn = styled.button`
	width: 15rem;
	height: 3rem;
	font-size: 0.8rem;
`

const ModalContentBottom = styled.div`
	display: grid;
	grid-template-columns: 2fr 3fr;
	grid-column-gap: 25px;
	grid-row-gap: 0px;
`

const PurseImg = styled.img`
	height: 3rem;
	margin-right: 1rem;
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
	quantity: number
	charactersinventory_key: number
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
	quantity: 0,
	charactersinventory_key: 0,
}

const blankItems: Item[] = []

ReactModal.setAppElement("#root")

interface Props {
	shopOpen: boolean
	closeModal: any
	currentWorld: number
}

export default function ShopModal(props: Props): ReactElement {
	const [activeItem, setActiveItem] = useState(blankItem)
	const [shopMode, setShopMode] = useState("buy")
	const [loading, setLoading] = useState(true)
	const [shopItems, setShopItems] = useState(blankItems)
	const [charItems, setCharItems] = useState(blankItems)
	const [gold, setGold] = useState(0)
	const userId = useAppSelector(selectUserId)
	const charId = useAppSelector(selectCharId)
	const charGold = useAppSelector(selectCharGold)
	const dispatch = useAppDispatch()

	useEffect(() => {
		// if (props.shopOpen === true) {
		axios.get(`/api/items`).then((response) => {
			setShopItems(response.data.shopItems)
			axios.get(`/api/items/${charId}`).then((response) => {
				console.log("second axios call")
				setCharItems(response.data.characterItems)
				setLoading(false)
			})
		})

		setGold(charGold)

		console.log(props.shopOpen)

		//TODO get gold amount from characters table
	}, [gold])
	const handleClickItem = (item: Item) => {
		setActiveItem(item)
	}

	const handleBuyItem = async (item: Item) => {
		const response = await axios.post(`/api/items/${charId}`, {
			itemKey: item.item_key,
			cost: item.item_cost,
		})

		// console.log(response, "buy item")
		dispatch(setInventory(response.data.characterItems))
		setCharItems(response.data.characterItems)
		setGold(response.data.newGold[0].gold)
		dispatch(setCharGold(response.data.newGold[0].gold))

		// update gold on store and retrieve
	}

	const handleSellItem = async (item: Item) => {
		const response = await axios.put(`/api/items/${charId}`, {
			invKey: item.charactersinventory_key,
			value: item.item_cost,
		})

		// console.log(response, "sell item")
		dispatch(setInventory(response.data.characterItems))
		setCharItems(response.data.characterItems)
		setGold(response.data.newGold[0].gold)
		dispatch(setCharGold(response.data.newGold[0].gold))
	}

	const handleShopModeChange = () => {
		if (shopMode === "buy") {
			setShopMode("sell")
		} else {
			setShopMode("buy")
		}
	}
	//might get rid of
	if (loading === true) {
		return (
			<ReactModal
				style={shopModalStyles}
				isOpen={props.shopOpen}></ReactModal>
		)
	} else {
		return (
			<ReactModal style={shopModalStyles} isOpen={props.shopOpen}>
				<CloseButton closeModal={props.closeModal} />
				<h2 className="title nes-text is-primary">Shop</h2>
				<ModalContent>
					<ModalContentTop>
						<SwitchModeBtn
							onClick={() => handleShopModeChange()}
							className="nes-btn is-primary is-small">
							Switch Shop Mode
						</SwitchModeBtn>
						<div>
							<PurseImg
								src={"/icons/items/purse.png"}
								alt="purse"
							/>
							<span>{gold}</span>
						</div>
					</ModalContentTop>
					<ModalContentBottom>
						<ShopLeft
							shopItems={shopItems}
							charItems={charItems}
							handleClickItem={handleClickItem}
							activeItem={activeItem}
							currentWorld={props.currentWorld}
							shopMode={shopMode}
						/>
						<ShopRight
							shopMode={shopMode}
							activeItem={activeItem}
							handleBuyItem={handleBuyItem}
							handleSellItem={handleSellItem}
						/>
					</ModalContentBottom>
				</ModalContent>
			</ReactModal>
		)
	}
}
