import React, { ReactElement, useState } from "react"
import styled from "styled-components"
import ShopModal from "./Shop/ShopModal"

const ShopPreviewContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	color: black;
	height: 100%;
	width: 100%;
`

const ShopPreviewDiv = styled.div`
	height: 60%;
	width: 80%;
	background-color: white;
	background-size: cover;
	background-position: center;
	border: 4px solid black;
	padding: 1rem;

	> div {
		margin-top: 2rem;
	}
`

const ShopDescription = styled.div`
	background-color: rgba(22, 22, 22, 0.6);

	> p {
		color: white;
	}
`

const EnterShopBtn = styled.button`
	margin-top: 1em;
`

interface Props {
	currentWorld: number
}

export default function ShopPreview(props: Props): ReactElement {
	const [shopOpen, setShopOpen] = useState(false)
	const [previewBackground, setPreviewBackground] = useState("")

	const handleOpenShop = () => {
		setShopOpen(true)
	}

	const handleCloseShop = () => {
		setShopOpen(false)
	}

	const retrievePreview = () => {
		switch (props.currentWorld) {
			case 1:
				return [
					"/images/world-1-shop.png",
					'"A lonely cave with a dim fire in the back."',
				]
			case 2:
				return [
					"/images/world-2-shop.png",
					'"A small rest stop in a desert oasis."',
				]
			case 3:
				return [
					"/images/world-3-shop.png",
					'"A vendor\'s stall filled with abnormal trinkets."',
				]
			case 4:
				return [
					"/images/world-4-shop.jpg",
					'"A redemption booth at a local arcade."',
				]
			case 5:
				return [
					"/images/world-5-shop.gif",
					'"A brightly-lit convenience store that slightly smells like tar."',
				]
			default:
				return ["/images/world-1-shop.png", '"An unknown vendor."']
		}
	}

	return (
		<ShopPreviewContainer>
			<ShopPreviewDiv
				style={{
					backgroundImage: `url(${retrievePreview()[0]})`,
				}}
				className="">
				<div>
					<ShopDescription>
						<p>{retrievePreview()[1]}</p>
					</ShopDescription>

					<EnterShopBtn
						onClick={() => handleOpenShop()}
						type="button"
						className="nes-btn is-warning">
						Enter Shop
					</EnterShopBtn>
				</div>
				<ShopModal
					currentWorld={props.currentWorld}
					shopOpen={shopOpen}
					closeModal={handleCloseShop}
				/>
			</ShopPreviewDiv>
		</ShopPreviewContainer>
	)
}
