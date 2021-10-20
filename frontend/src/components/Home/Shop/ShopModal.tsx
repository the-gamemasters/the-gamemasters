import React, { ReactElement, useState, useEffect } from "react";
import ReactModal from "react-modal";
import CloseButton from "../../General/CloseButton";
import ShopLeft from "./ShopLeft";
import ShopRight from "./ShopRight";
import styled from "styled-components";
import shopItems from "./shopItems.json";

const shopModalStyles = {
	overlay: {
		backgroundColor: "rgba(39, 39, 39, 0.6)",
	},
	content: {
		padding: "1.5rem 2rem",
		"border-color": "#000",
		"border-style": "solid",
		"border-width": "4px",
		backgroundColor: "white",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		border: "none",
		background: "none",
		outline: "none",
		height: "85%",
		width: "80%",
	},
};

const ModalContent = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr;
	grid-column-gap: 25px;
	grid-row-gap: 0px;
	height: 80%;
`;

ReactModal.setAppElement("#root");

interface Props {
	shopOpen: boolean;
	closeModal: any;
}

export default function ShopModal(props: Props): ReactElement {
	useEffect(() => {
		//Make call to get shop items from DB
	});
	return (
		<ReactModal style={shopModalStyles} isOpen={props.shopOpen}>
			<CloseButton closeModal={props.closeModal} />
			<h2 className="title nes-text is-primary">Shop</h2>
			<ModalContent>
				<ShopLeft shopItems={shopItems} />
				<ShopRight />
			</ModalContent>
		</ReactModal>
	);
}
