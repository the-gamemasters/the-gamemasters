import React, { ReactElement } from "react";
import ReactModal from "react-modal";
import CloseButton from "../General/CloseButton";

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
		width: "80%",
	},
};

const XButton = styled(CloseButton)`
	right: 80%;
`;

const MenuList = styled.ul`
	list-style-type: none;
	line-height: 3em;
`;

ReactModal.setAppElement("#root");

interface Props {
	shopOpen: boolean;
	closeModal: any;
}

export default function ShopModal(props: Props): ReactElement {
	return (
		<div>
			<ReactModal style={shopModalStyles} isOpen={props.shopOpen}>
				<div className="nes-dialog" id="dialog-default">
					<XButton closeModal={props.closeModal} />
					<p className="title nes-text is-primary">Shop</p>
					<menu className="dialog-menu flex-dialog-menu">
						<MenuList>
							{/* {props.selectType === "spell"
                                ? props.partyInstance.spells.map(
                                      (ele: any, i: number) => {
                                          return (
                                              <div
                                                  objectName={ele.spellName}
                                                  selectType={props.selectType}
                                                  handleAction={
                                                      props.handleAction
                                                  }
                                                  closeModal={props.closeModal}
                                                  key={i}></div>
                                          );
                                      }
                                  )
                                : props.partyInstance.items.map(
                                      (ele: any, i: number) => {
                                          return (
                                              <div
                                                  objectName={ele.itemName}
                                                  selectType={props.selectType}
                                                  handleAction={
                                                      props.handleAction
                                                  }
                                                  closeModal={props.closeModal}
                                                  key={i}></div>
                                          );
                                      }
                                  )} */}
						</MenuList>
					</menu>
				</div>
			</ReactModal>
		</div>
	);
}
