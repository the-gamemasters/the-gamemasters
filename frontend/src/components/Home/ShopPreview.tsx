import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import ShopModal from "./ShopModal";

const ShopPreviewContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	color: black;
	height: 100%;
	width: 100%;
`;

const ShopPreviewDiv = styled.div`
	height: 60%;
	width: 80%;
	background-color: white;
`;
const ShopPreviewImg = styled.img`
	height: 5em;
	width: auto;
`;

const EnterShopBtn = styled.button`
	margin-top: 1em;
`;

interface Props {}

export default function ShopPreview(props: Props): ReactElement {
	const [shopOpen, setShopOpen] = useState(false);

	const handleOpenShop = () => {
		setShopOpen(true);
	};

	const handleCloseShop = () => {
		setShopOpen(false);
	};

	return (
		<ShopPreviewContainer>
			<ShopPreviewDiv className="nes-container ">
				<ShopPreviewImg
					alt="preview of shop"
					src="https://img.freepik.com/free-vector/desert-oasis-with-palms-catus-nature-landscape-scene_1308-49571.jpg?size=626&ext=jpg"
				/>
				<p>"A shop setup by an oasis in the desert."</p>
				<EnterShopBtn
					onClick={() => handleOpenShop()}
					type="button"
					className="nes-btn is-warning">
					Enter Shop
				</EnterShopBtn>
				<ShopModal shopOpen={shopOpen} closeModal={handleCloseShop} />
			</ShopPreviewDiv>
		</ShopPreviewContainer>
	);
}
