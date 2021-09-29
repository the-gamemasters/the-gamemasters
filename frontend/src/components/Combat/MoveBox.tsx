import React, { ReactElement } from "react";

interface Props {
    handleAction: any;
    currentTurn?: any;
    myParty?: string;
    loading?: boolean;
}

//TODO Need to optimize this function heavily

export default function MoveBox(props: Props): ReactElement {
    console.log(props.currentTurn);
    if (props.currentTurn !== props.myParty) {
        return (
            <div className="moves-container">
                <button
                    type="button"
                    className="nes-btn attack-btn is-disabled">
                    Attack
                </button>
                <button
                    type="button"
                    className="nes-btn spells-btn is-disabled">
                    Spells
                </button>
                <button type="button" className="nes-btn item-btn is-disabled">
                    Items
                </button>
                <button type="button" className="nes-btn evade-btn is-disabled">
                    Evade
                </button>
            </div>
        );
    } else {
        return (
            <div className="moves-container">
                <button
                    type="button"
                    className="nes-btn attack-btn"
                    onClick={() => props.handleAction("attack")}>
                    Attack
                </button>
                <button
                    type="button"
                    className="nes-btn spells-btn"
                    onClick={() => props.handleAction("spell")}>
                    Spells
                </button>
                <button
                    type="button"
                    className="nes-btn item-btn"
                    onClick={() => props.handleAction("item")}>
                    Items
                </button>
                <button
                    type="button"
                    className="nes-btn evade-btn"
                    onClick={() => props.handleAction("evade")}>
                    Evade
                </button>
            </div>
        );
    }
}
