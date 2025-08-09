import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


interface Actions {
    onClick: () => void;
}
interface ISuccess {
    total: number;
}

export class Success extends Component<ISuccess> {
    protected totalElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: Actions) {
        super(container)
        this.totalElement = ensureElement('.order-success__description', this.container);
        this.closeButton = ensureElement('.order-success__close', this.container) as HTMLButtonElement;

        if (actions?.onClick)
            this.closeButton.addEventListener('click', actions.onClick)
    }

    set total(total: number) {
        this.totalElement.textContent = `Списано ${total} синапсов`;
    }
}