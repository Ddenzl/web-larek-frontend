import { IUserData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ISuccess {
    total: IUserData['total'];
}

interface ISuccessAction {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected _total: HTMLElement;
    protected _close: HTMLElement;

    constructor(container: HTMLElement, action: ISuccessAction) {
        super(container);

        this._total = ensureElement<HTMLElement>('.order-success__close', this.container)
        this._close = ensureElement<HTMLElement>('.order-success__description', this.container);

        if (action?.onClick) {
            this._close.addEventListener('click', action.onClick);
        }
    }

    set total(value: IUserData['total']) {
        this.setText(this._total, `Списано ${value} синапсов`)
    }
}