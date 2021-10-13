import React, { ReactElement } from "react"
import ReactModal from "react-modal"
import CloseButton from "../General/CloseButton"
import SelectItem from "./SelectItem"
import styled from "styled-components"

const selectModalStyles = {
	overlay: {
		backgroundColor: "rgba(39, 39, 39, 0.6)",
	},
	content: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		border: "none",
		background: "none",
		outline: "none",
		padding: "20px",
		height: "50%",
		width: "30%",
	},
}

const XButton = styled(CloseButton)`
	left: 80%;
`

const MenuList = styled.ul`
	list-style-type: none;
	line-height: 3em;
`

ReactModal.setAppElement("#root")

interface Props {
	selectOpen: boolean
	handleAction: any
	selectType?: "spell" | "item"
	partyInstance?: any
	closeModal: any
}

export default function SelectModal(props: Props): ReactElement {
	return (
		<div>
			<ReactModal style={selectModalStyles} isOpen={props.selectOpen}>
				<div
					className="nes-dialog is-dark is-rounded"
					id="dialog-dark-rounded">
					<XButton closeModal={props.closeModal} />
					<p className="title nes-text is-success">
						{props.selectType === "spell" ? "Spells" : "Items"}
					</p>
					<menu className="dialog-menu flex-dialog-menu">
						<MenuList>
							{props.selectType === "spell"
								? props.partyInstance.spells.map(
										(ele: any, i: number) => {
											return (
												<SelectItem
													objectName={ele.spellName}
													selectType={
														props.selectType
													}
													handleAction={
														props.handleAction
													}
													closeModal={
														props.closeModal
													}
													key={i}></SelectItem>
											)
										}
								  )
								: props.partyInstance.items.map(
										(ele: any, i: number) => {
											return (
												<SelectItem
													objectName={ele.itemName}
													objectQuantity={
														ele.inventoryQuantity
													}
													selectType={
														props.selectType
													}
													handleAction={
														props.handleAction
													}
													closeModal={
														props.closeModal
													}
													key={i}></SelectItem>
											)
										}
								  )}
						</MenuList>
					</menu>
				</div>
			</ReactModal>
		</div>
	)
}
