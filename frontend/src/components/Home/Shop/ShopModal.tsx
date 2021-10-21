import React, { ReactElement, useState, useEffect } from "react";
import ReactModal from "react-modal";
import CloseButton from "../../General/CloseButton";
import ShopLeft from "./ShopLeft";
import ShopRight from "./ShopRight";
import styled from "styled-components";

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
		width: "70%",
	},
};

const ModalContent = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 7fr;
	grid-column-gap: 0px;
	grid-row-gap: 25px;
	height: 80%;
`;

const ModalContentTop = styled.div`
	height: 100%;
`;

const SwitchModeBtn = styled.button`
	width: 15rem;
	height: 3rem;
	font-size: 0.8rem;
`;

const ModalContentBottom = styled.div`
	display: grid;
	grid-template-columns: 2fr 3fr;
	grid-column-gap: 25px;
	grid-row-gap: 0px;
`;

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
};

const blankItems: Item[] = [];

ReactModal.setAppElement("#root");

interface Props {
	shopOpen: boolean;
	closeModal: any;
}

export default function ShopModal(props: Props): ReactElement {
	const [activeItem, setActiveItem] = useState(blankItem);
	const [shopMode, setShopMode] = useState("buy");
	const [shopItems, setShopItems] = useState(blankItems);

	useEffect(() => {
		setShopItems(require("./shopItems.json"));
	}, [shopItems]);

	const handleClickItem = (item: Item) => {
		setActiveItem(item);
	};

	const handleShopModeChange = () => {
		if (shopMode === "buy") {
			setShopMode("sell");
		} else {
			setShopMode("buy");
		}
	};

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
				</ModalContentTop>
				<ModalContentBottom>
					<ShopLeft
						shopItems={shopItems}
						handleClickItem={handleClickItem}
						activeItem={activeItem}
					/>
					<ShopRight shopMode={shopMode} activeItem={activeItem} />
				</ModalContentBottom>
			</ModalContent>
		</ReactModal>
	);
}
