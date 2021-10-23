import React, { ReactElement } from "react"
import ReactModal from "react-modal"
import styled, { keyframes } from "styled-components"

const loadingModalStyles = {
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
		padding: "10px",
		height: "35%",
		width: "50%",
	},
}

const blink = keyframes`
    /**
     * At the start of the animation the dot
     * has an opacity of .2
     */
    0% {
      opacity: .2;
    }
    /**
     * At 20% the dot is fully visible and
     * then fades out slowly
     */
    20% {
      opacity: 1;
    }
    /**
     * Until it reaches an opacity of .2 and
     * the animation can start again
     */
    100% {
      opacity: .2;
    }
`

const Container = styled.div`
	background: white;
	position: relative;
	padding: 1.5rem 2rem;
	border-color: #000;
	border-style: solid;
	border-width: 4px;
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
	text-align: center;

	& span {
		animation: blink 1.4s infinite both;
	}

	& span:nth-child(2) {
		animation-delay: 0.2s;
	}

	& span:nth-child(3) {
		animation-delay: 0.4s;
	}
`

ReactModal.setAppElement("#root")

interface Props {
	ready: boolean
}

export default function LoadingModal(props: Props): ReactElement {
	return (
		<div>
			<ReactModal style={loadingModalStyles} isOpen={!props.ready}>
				<Container className="nes-text is-warning">
					Waiting for opponent
					<span>.</span>
					<span>.</span>
					<span>.</span>
				</Container>
			</ReactModal>
		</div>
	)
}
