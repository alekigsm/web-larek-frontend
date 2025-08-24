import { IItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { Card } from "./Card";

interface Actions {
    onClick: () => void;
}

export class CardCatalog extends Card {
    constructor(container: HTMLElement, actions: Actions) {
        super(container);

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
        }
    }
}
