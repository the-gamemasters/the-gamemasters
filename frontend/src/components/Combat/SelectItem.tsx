import React, { ReactElement } from "react";
import styled from "styled-components";

const Item = styled.li`
    margin-bottom: 1em;
    padding-left: 0.1em;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
            14 0,
        pointer;
`;

interface Props {
    objectName: string;
    selectType?: "spell" | "item";
    closeModal: any;
    handleAction: any;
}

export default function SelectItem(props: Props): ReactElement {
    function setHovered(e: any) {
        e.target.style.backgroundColor = "#ffffff";
        e.target.style.color = "#212529";
    }

    function setNotHovered(e: any) {
        e.target.style.backgroundColor = "#212529";
        e.target.style.color = "#ffffff";
    }

    function handleClick() {
        props.handleAction(
            `${props.selectType === "item" ? "item" : "spell"}`,
            props.objectName
        );
        props.closeModal();
    }

    return (
        <Item
            onMouseEnter={(e) => setHovered(e)}
            onMouseLeave={(e) => setNotHovered(e)}
            onClick={() => handleClick()}>
            {props.objectName}
        </Item>
    );
}
