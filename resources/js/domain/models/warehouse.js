import { uid } from "uid";
import { Koli } from "./koli";

export class Warehouse {
    #props;
    #_id;
    constructor(props) {
        this.#props = props;
        this.#_id = props.id || null;
    }
    static create(props) {
        return new Warehouse(props);
    }
    unmarshall() {
        return {
            id: this.id,
            category_id: this.category_id,
            label: this.label,
            koli: this.koli,
            client_id: this.client_id,
            resi: this.resi,
            dest_city_id: this.dest_city_id,
            total_berat: this.total_berat,
            total_kubikasi: this.total_kubikasi,
            kolis: (this.kolis || []).map(item => item.unmarshall()),
        };
    }
    set(props) {
        this.#props = {
            ...this.#props,
            ...props
        };
        return this;
    }
    setKoli(koli = 1) {
        this.#props.koli = koli;
        while ((this.kolis || []).length < this.koli) {
            this.#props.kolis.push(Koli.create({
                width: 0,
                length: 0,
                height: 0,
                weight: 0,
                vol_kg: 0,
                cbm: 0,
                total_berat: 0,
            }).unmarshall());
        }
        while ((this.kolis || []).length > this.koli) {
            this.#props.kolis.pop();
        }
        return this
    }
    get id() {
        return this.#_id;
    }
    get category_id() {
        return this.#props.category_id;
    }
    get label() {
        return this.#props.label;
    }
    get resi() {
        return this.#props.resi;
    }
    get koli() {
        return this.#props.koli;
    }
    get client_id() {
        return this.#props.client_id;
    }
    get resi() {
        return this.#props.resi;
    }
    get dest_city_id() {
        return this.#props.dest_city_id;
    }
    get total_berat() {
        return (this.#props.kolis || []).reduce((carry, item) => parseFloat(item.total_kg)+carry, 0);
    }
    get total_kubikasi() {
        return (this.#props.kolis || []).reduce((carry, item) => parseFloat(item.cbm)+carry, 0);
    }
    get kolis() {
        return (this.#props.kolis || []).map(item => Koli.create({...item, category_id : this.category_id}));
    }
}