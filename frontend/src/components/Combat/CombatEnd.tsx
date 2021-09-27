import React, { ReactElement } from "react";

interface Props {
    result?: string;
}

export default function CombatEnd(props: Props): ReactElement {
    return (
        <div>
            <section>
                <dialog
                    className="nes-dialog is-dark is-rounded"
                    id="dialog-dark-rounded">
                    <form method="dialog">
                        <p className="title">Dark and Rounded dialog</p>
                        <p>Alert: this is a dialog.</p>
                        <menu className="dialog-menu">
                            <button className="nes-btn">Cancel</button>
                            <button className="nes-btn is-primary">
                                Confirm
                            </button>
                        </menu>
                    </form>
                </dialog>
            </section>
        </div>
    );
}
