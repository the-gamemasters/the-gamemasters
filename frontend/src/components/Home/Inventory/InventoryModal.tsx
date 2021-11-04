import React, { ReactElement, useState, useEffect } from "react"
import ReactModal from "react-modal"
import CloseButton from "../../General/CloseButton"
import InventoryItemPreview from "./InventoryItemPreview"
import InventoryList from "./InventoryList"
import EquippedItems from "./EquippedItems"
import styled from "styled-components"
import axios from "axios"
import { useAppSelector, useAppDispatch } from "../../../redux/reduxHooks"
import {
	selectCharId,
	selectUserId,
	setArmor,
	setWeapon,
} from "../../../redux/userSlice"

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
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 4fr 1fr;
	grid-column-gap: 50px;
	grid-row-gap: 30px;
	height: 90%;
	padding: 0 5%;
`

const ModalContentTopLeft = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		border: 4px solid black;
		height: 100%;
		width: 70%;
	}
`

const ModalContentTopRight = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const ModalContentBottomLeft = styled.div`
	height: 100%;
	width: 100%;
`
const ModalContentBottomRight = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

export interface Equipment {
	charactersequipment_key: number
	equipment_key: number
	slot: number
	equipment_name: string
	equipment_description: string
	equipment_effect_stat: string
	equipment_effect_stat_value: number
	equipped: boolean
	equipment_icon: string
}

const blankEquipment: Equipment = {
	charactersequipment_key: 0,
	equipment_key: 0,
	slot: 1,
	equipment_name: "",
	equipment_description: "",
	equipment_effect_stat: "",
	equipment_effect_stat_value: 0,
	equipped: false,
	equipment_icon: "item-placeholder.png",
}

const blankEquipmentList: Equipment[] = []

ReactModal.setAppElement("#root")

interface Props {
	inventoryOpen: boolean
	closeModal: any
}

export default function InventoryModal(props: Props): ReactElement {
	const [activeItem, setActiveItem] = useState(blankEquipment)
	const [inventoryItems, setInventoryItems] = useState(blankEquipmentList)
	const [loading, setLoading] = useState(true)
	const [equippedArmor, setEquippedArmor] = useState(blankEquipment)
	const [equippedWeapon, setEquippedWeapon] = useState(blankEquipment)
	const userId = useAppSelector(selectUserId)
	const charId = useAppSelector(selectCharId)
	const dispatch = useAppDispatch()

	useEffect(() => {
		//TODO make GET axios call to retrieve user's inventory
		axios.get(`/api/equipment/${charId}`).then((response) => {
			setInventoryItems(response.data.characterEquipment)

			let eArmor = response.data.characterEquipment.find(
				(e: Equipment) => {
					console.log(e)
					return e.equipped && e.slot === 1
				}
			)

			let eWeapon = response.data.characterEquipment.find(
				(e: Equipment) => {
					return e.equipped && e.slot === 2
				}
			)

			if (!eArmor) {
				eArmor = blankEquipment
			}
			if (!eWeapon) {
				eWeapon = blankEquipment
			}

			setEquippedArmor(eArmor)
			dispatch(setArmor(eArmor))
			setEquippedWeapon(eWeapon)
			dispatch(setWeapon(eWeapon))
			setLoading(false)
		})
		//Placeholder
	}, [])

	const handleClickItem = (item: Equipment) => {
		setActiveItem(item)
	}

	const handleEquip = () => {
		let editEquipmentBody
		if (activeItem.slot === 1) {
			editEquipmentBody = {
				unequip: equippedArmor.charactersequipment_key,
				equip: activeItem.charactersequipment_key,
			}
			axios
				.put(`/api/equipment/${charId}`, editEquipmentBody)
				.then((response) => {
					setEquippedArmor(response.data.newEquipment[0])
				})
				.catch((err) => {
					console.error(err)
				})
		} else {
			editEquipmentBody = {
				unequip: equippedWeapon.charactersequipment_key,
				equip: activeItem.charactersequipment_key,
			}
			axios
				.put(`/api/equipment/${charId}`, editEquipmentBody)
				.then((response) => {
					setEquippedWeapon(response.data.newEquipment[0])
				})
				.catch((err) => {
					console.error(err)
				})
		}
	}
	if (loading) {
		return (
			<ReactModal
				style={inventoryModalStyles}
				isOpen={props.inventoryOpen}></ReactModal>
		)
	} else {
		return (
			<ReactModal
				style={inventoryModalStyles}
				isOpen={props.inventoryOpen}>
				<CloseButton closeModal={props.closeModal} />
				<h2 className="title nes-text is-success">Inventory</h2>
				<ModalContent>
					<ModalContentTopLeft>
						<img
							alt="char model"
							src="https://i.pinimg.com/originals/4b/05/e4/4b05e4f47846461cce2c470aa2cf477a.png"
						/>
					</ModalContentTopLeft>
					<ModalContentTopRight>
						<InventoryList
							inventoryItems={inventoryItems}
							handleClickItem={handleClickItem}
							activeItem={activeItem}
						/>
					</ModalContentTopRight>
					<ModalContentBottomLeft>
						<EquippedItems
							equippedArmor={equippedArmor}
							equippedWeapon={equippedWeapon}
							handleClickItem={handleClickItem}
							activeItem={activeItem}
						/>
					</ModalContentBottomLeft>
					<ModalContentBottomRight>
						<InventoryItemPreview
							activeItem={activeItem}
							equippedArmor={equippedArmor}
							equippedWeapon={equippedWeapon}
							handleEquip={handleEquip}
						/>
					</ModalContentBottomRight>
				</ModalContent>
			</ReactModal>
		)
	}
}
