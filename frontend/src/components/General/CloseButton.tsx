import React, { ReactElement } from "react";
import styled from "styled-components";

const XButton = styled.button`
    float: right;
    margin-bottom: 5px;
    position: absolute;
    left: 89%;
    bottom: 85%;
`;

interface Props {
    closeModal: any;
}

export default function CloseButton(props: Props): ReactElement {
    return (
        <XButton
            onClick={() => props.closeModal()}
            type="button"
            className="nes-btn is-error">
            <i className="nes-icon close is-small"></i>
        </XButton>
    );
}
