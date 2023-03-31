import { uid } from "uid";

export class Koli {
    #props;
    #_id;
    constructor(props) {
        this.#props = props;
        this.#_id = props.id || uid();
    }
    static create(props) {
        return new Koli(props);
    }
    set(props) {
        this.#props = {
            ...this.#props,
            ...props
        };
        return this;
    }
    unmarshall() {
        return {
            id: this.id,
            width: this.width,
            length: this.length,
            height: this.height,
            weight: this.weight,
            vol_kg: this.vol_kg,
            cbm: this.cbm,
            total_kg: this.total_kg,
        };
    }
    get id() {
        return this.#_id;
    }
    get width() {
        return this.#props.width;
    }
    get length() {
        return this.#props.length;
    }
    get height() {
        return this.#props.height;
    }
    get weight() {
        return this.#props.weight;
    }
    get vol_kg() {
        const categoryId = this.#props.category_id;
        let divisionValue = 4000; // default for darat|laut
        if (categoryId == 6 || categoryId == 7 || categoryId == 8 || categoryId == 11 || categoryId == 12) {
            divisionValue = 4000;
        } else {
            divisionValue = 6000;
        }
        return ((this.#props.length || 0) * (this.#props.width || 0) * (this.#props.height || 0)) / divisionValue;
    }
    get cbm() {
        return (this.#props.length || 0) * (this.#props.width || 0) * (this.#props.height || 0) / 1000000;
    }
    get total_kg() {
        return this.weight > this.vol_kg ? this.weight : this.vol_kg;
    }
}