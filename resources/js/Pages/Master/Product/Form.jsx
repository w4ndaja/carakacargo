import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { Warehouse } from "@/domain/models/warehouse";
import { Koli } from "@/domain/models/koli";

function Form({ clients, newResi, cities, ...props }, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("Tambah Barang");
    const { errors: _errors, categories } = usePage().props;
    const [errors, setErrors] = useState(_errors);
    const [warehouse, setWarehouse] = useState(Warehouse.create({
        category_id: '',
        label: '',
        resi: '',
        koli: '',
        client_id: '',
        dest_city_id: '',
        total_berat: '',
        total_kubikasi: '',
        kolis: [],
    }));
    useImperativeHandle(ref, () => ({
        create: () => {
            setTitle("Tambah Barang");
            Inertia.reload({
                replace: true,
                data: {
                    newResi: true,
                },
                onSuccess: () => {
                    // setData({ resi: newResi });
                    setWarehouse(warehouse => Warehouse.create(warehouse).set({ resi: newResi }).unmarshall());
                },
            });
            setIsOpen(true);
        },
        edit: (data) => {
            setTitle("Edit Barang");
            // setData(data);
            // setKoli(data.koli);
            setWarehouse(Warehouse.create(data).unmarshall());
            setIsOpen(true);
        },
    }));
    const submit = (e) => {
        e.preventDefault();
        // let form = new FormData(e.target);
        if (warehouse.id) {
            // form.append("_method", "put");
            // return Inertia.post(route("products.update", data.id), form);
            return Inertia.post(route("products.update", warehouse.id), {
                _method: 'PUT',
                ...warehouse
            });
        }
        // return Inertia.post(route("products.store"), form);
        return Inertia.post(route("products.store"), {
            method: 'POST',
            ...warehouse
        });
    };
    useEffect(() => {
        setErrors(_errors);
    }, [_errors]);
    useEffect(() => {
        setErrors({});
    }, [isOpen]);
    return (
        <Transition
            show={ isOpen }
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
            <Dialog
                { ...props }
                open={ isOpen }
                onClose={ () => setIsOpen(false) }
                className="fixed z-10 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="relative bg-gray-50 shadow-xl rounded-2xl max-w-sm mx-auto p-5 lg:min-w-[1024px]">
                        <Dialog.Title className="text-xl text-center mb-3 border-b pb-3">
                            { title }
                        </Dialog.Title>
                        <form onSubmit={ submit }>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_client_id">
                                    Customer
                                </label>
                                <select
                                    name="client_id"
                                    // value={ data.client_id }
                                    value={ warehouse.client_id || '' }
                                    onChange={ (e) => {
                                        // setData((d) => ({
                                        //     ...d,
                                        //     client_id: e.target.value,
                                        // }))
                                        setWarehouse(warehouse => Warehouse.create(warehouse).set({ client_id: e.target.value }).unmarshall());
                                    }
                                    }
                                    className={ `form-select uppercase px-4 py-2 rounded shadow ${errors.client_id ? "border-red-500" : ""
                                        }` }
                                    id="input_client_id"
                                >
                                    <option value="">Choose Customer</option>
                                    { clients.map((item, i) => (
                                        <option value={ item.id } key={ i }>
                                            { item.name }
                                        </option>
                                    )) }
                                </select>
                                { errors.client_id && (
                                    <span className="text-red-500">
                                        { errors.client_id }
                                    </span>
                                ) }
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_resi">Resi</label>
                                <input
                                    name="resi"
                                    // value={ data.resi }
                                    value={ warehouse.resi }
                                    onChange={ (e) => {
                                        // setData((d) => ({
                                        //     ...d,
                                        //     resi: e.target.value,
                                        // }));
                                        setWarehouse(warehouse => Warehouse.create(warehouse).set({ resi: e.target.value }).unmarshall());
                                    }
                                    }
                                    type="text"
                                    className={ `uppercase px-4 py-2 rounded shadow read-only:bg-gray-50 text-green-600 ${errors.resi ? "border-red-500" : ""
                                        }` }
                                    id="input_resi"
                                    readOnly
                                />
                                { errors.resi && (
                                    <span className="text-red-500">
                                        { errors.resi }
                                    </span>
                                ) }
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_dest_city_id">Kota Tujuan Pengiriman</label>
                                <select
                                    name="dest_city_id"
                                    // value={ data.dest_city_id }
                                    value={ warehouse.dest_city_id || '' }
                                    onChange={ (e) => {
                                        // setData((d) => ({
                                        //     ...d,
                                        //     dest_city_id: e.target.value,
                                        // }));
                                        setWarehouse(warehouse => Warehouse.create(warehouse).set({ dest_city_id: e.target.value }).unmarshall());
                                    }
                                    }
                                    className={ `uppercase px-4 py-2 rounded shadow ${errors.dest_city_id ? "border-red-500" : ""
                                        }` }
                                    id="input_dest_city_id"
                                >
                                    <option value="">Choose Dest City</option>
                                    { cities.map(item => (
                                        <option key={ item.id } value={ item.id }>{ item.name }</option>
                                    )) }
                                </select>
                                { errors.dest_city_id && (
                                    <span className="text-red-500">
                                        { errors.dest_city_id }
                                    </span>
                                ) }
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_label">Label</label>
                                <input
                                    name="label"
                                    // value={ data.label }
                                    value={ warehouse.label }
                                    onChange={ (e) => {
                                        // setData((d) => ({
                                        //     ...d,
                                        //     label: e.target.value,
                                        // }))
                                        setWarehouse(warehouse => Warehouse.create(warehouse).set({ label: e.target.value }).unmarshall());
                                    }
                                    }
                                    type="text"
                                    className={ `px-4 py-2 rounded shadow ${errors.label ? "border-red-500" : ""
                                        }` }
                                    id="input_label"
                                />
                                { errors.label && (
                                    <span className="text-red-500">
                                        { errors.label }
                                    </span>
                                ) }
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_category_id">
                                    Kategori
                                </label>
                                <select
                                    name="category_id"
                                    // value={ data.category_id }
                                    value={ warehouse.category_id || '' }
                                    onChange={ (e) => {
                                        // setData((d) => ({
                                        //     ...d,
                                        //     category_id: e.target.value,
                                        // }));
                                        setWarehouse(warehouse => Warehouse.create(warehouse).set({ category_id: e.target.value }).unmarshall());
                                    }
                                    }
                                    className={ `px-4 py-2 rounded shadow ${errors.category_id
                                        ? "border-red-500"
                                        : ""
                                        }` }
                                    id="input_category_id"
                                >
                                    <option value="">Pilih Kategori</option>
                                    { categories.map((item, i) => (
                                        <option key={ i } value={ item.id }>
                                            { item.name }
                                        </option>
                                    )) }
                                </select>
                                { errors.category_id && (
                                    <span className="text-red-500">
                                        { errors.category_id }
                                    </span>
                                ) }
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_koli">Jumlah Koli</label>
                                <input
                                    name="koli"
                                    onChange={ (e) => {
                                        // setData((d) => ({
                                        //     ...d,
                                        //     koli: e.target.value,
                                        // }));
                                        // setKoli(e.target.value);
                                        setWarehouse(warehouse => Warehouse.create(warehouse).setKoli(e.target.value).unmarshall());
                                    } }
                                    type="number"
                                    className={ `px-4 py-2 rounded shadow ${errors.koli ? "border-red-500" : ""
                                        }` }
                                    id="input_koli"
                                    // value={ data.koli || koli }
                                    value={ warehouse.koli }
                                    min={ 1 }
                                />
                                { errors.koli && (
                                    <span className="text-red-500">
                                        { errors.koli }
                                    </span>
                                ) }
                            </div>
                            <div className="rounded-xl border-t border-r border-l mb-3">
                                { warehouse.kolis?.map((item, i) => (
                                    <div key={ item.id } className="flex gap-2 flex-nowrap border-b rounded-xl p-3">
                                        <div className="my-auto font-semibold whitespace-nowrap">
                                            Koli { i + 1 }
                                        </div>
                                        <div className="grid grid-cols-2 lg:grid-cols-7 gap-2" key={ i }>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="input_length">Panjang</label>
                                                <input
                                                    name={ `kolis[${i}][length]` }
                                                    value={ item.length }
                                                    onChange={ (e) =>
                                                        setWarehouse((warehouse) =>
                                                            Warehouse.create(warehouse).set({
                                                                kolis: warehouse.kolis?.map((item, _i) =>
                                                                    i == _i
                                                                        ? Koli.create(item).set({ length: e.target.value, }).unmarshall()
                                                                        : item
                                                                )
                                                            }).unmarshall()
                                                        )
                                                    }
                                                    type="number"
                                                    className={ `px-4 py-2 rounded shadow ${errors.length ? "border-red-500" : ""
                                                        }` }
                                                    id="input_length"
                                                />
                                                { errors.length && (
                                                    <span className="text-red-500">
                                                        { errors.length }
                                                    </span>
                                                ) }
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="input_width">Lebar</label>
                                                <input
                                                    name={ `kolis[${i}][width]` }
                                                    value={ item.width }
                                                    onChange={ (e) =>
                                                        setWarehouse((warehouse) =>
                                                            Warehouse.create(warehouse).set({
                                                                kolis: warehouse.kolis?.map((item, _i) =>
                                                                    i == _i
                                                                        ? Koli.create(item).set({ width: e.target.value, }).unmarshall()
                                                                        : item
                                                                )
                                                            }).unmarshall()
                                                        )
                                                    }
                                                    type="number"
                                                    className={ `px-4 py-2 rounded shadow ${errors.width ? "border-red-500" : ""
                                                        }` }
                                                    id="input_width"
                                                />
                                                { errors.width && (
                                                    <span className="text-red-500">{ errors.width }</span>
                                                ) }
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="input_height">Tinggi</label>
                                                <input
                                                    name={ `kolis[${i}][height]` }
                                                    value={ item.height }
                                                    onChange={ (e) =>
                                                        setWarehouse((warehouse) =>
                                                            Warehouse.create(warehouse).set({
                                                                kolis: warehouse.kolis?.map((item, _i) =>
                                                                    i == _i
                                                                        ? Koli.create(item).set({ height: e.target.value, }).unmarshall()
                                                                        : item
                                                                )
                                                            }).unmarshall()
                                                        )
                                                    }
                                                    type="number"
                                                    className={ `px-4 py-2 rounded shadow ${errors.height ? "border-red-500" : ""
                                                        }` }
                                                    id="input_height"
                                                />
                                                { errors.height && (
                                                    <span className="text-red-500">
                                                        { errors.height }
                                                    </span>
                                                ) }
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="input_weight">Berat Aktual</label>
                                                <input
                                                    name={ `kolis[${i}][weight]` }
                                                    value={ item.weight }
                                                    onChange={ (e) =>
                                                        setWarehouse((warehouse) =>
                                                            Warehouse.create(warehouse).set({
                                                                kolis: warehouse.kolis?.map((item, _i) =>
                                                                    i == _i
                                                                        ? Koli.create(item).set({ weight: e.target.value, }).unmarshall()
                                                                        : item
                                                                )
                                                            }).unmarshall()
                                                        )
                                                    }
                                                    type="number"
                                                    className={ `px-4 py-2 rounded shadow ${errors.weight ? "border-red-500" : ""
                                                        }` }
                                                    id="input_weight"
                                                />
                                                { errors.weight && (
                                                    <span className="text-red-500">
                                                        { errors.weight }
                                                    </span>
                                                ) }
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="input_vol_kg">Vol kg</label>
                                                <input
                                                    name={ `kolis[${i}][vol_kg]` }
                                                    value={ item.vol_kg }
                                                    onChange={() => {}}
                                                    // onChange={ (e) =>
                                                    //     setKoliInputs((koliInputs) =>
                                                    //         koliInputs.map((item, _i) =>
                                                    //             i == _i
                                                    //                 ? Koli.create(item).set({
                                                    //                     vol_kg: e.target.value,
                                                    //                 }).unmarshall()
                                                    //                 : item
                                                    //         )
                                                    //     )
                                                    // }
                                                    type="number"
                                                    className={ `px-4 py-2 rounded shadow ${errors.vol_kg ? "border-red-500" : ""
                                                        }` }
                                                    id="input_vol_kg"
                                                    readOnly
                                                />
                                                { errors.vol_kg && (
                                                    <span className="text-red-500">
                                                        { errors.vol_kg }
                                                    </span>
                                                ) }
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="input_cbm">CBM</label>
                                                <input
                                                    name={ `kolis[${i}][cbm]` }
                                                    value={ item.cbm }
                                                    onChange={e => {}}
                                                    // onChange={ (e) =>
                                                    //     setKoliInputs((koliInputs) =>
                                                    //         koliInputs.map((item, _i) =>
                                                    //             i == _i
                                                    //                 ? Koli.create(item).set({
                                                    //                     cbm: e.target.value,
                                                    //                 }).unmarshall()
                                                    //                 : item
                                                    //         )
                                                    //     )
                                                    // }
                                                    type="number"
                                                    className={ `px-4 py-2 rounded shadow ${errors.cbm ? "border-red-500" : ""
                                                        }` }
                                                    id="input_cbm"
                                                    readOnly
                                                />
                                                { errors.cbm && (
                                                    <span className="text-red-500">
                                                        { errors.cbm }
                                                    </span>
                                                ) }
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="input_total_kg">Total Kg</label>
                                                <input
                                                    name={ `kolis[${i}][total_kg]` }
                                                    value={ item.total_kg }
                                                    onChange={e => {}}
                                                    // onChange={ (e) =>
                                                    //     setKoliInputs((koliInputs) =>
                                                    //         koliInputs.map((item, _i) =>
                                                    //             i == _i
                                                    //                 ? Koli.create(item).set({
                                                    //                     total_kg: e.target.value,
                                                    //                 }).unmarshall()
                                                    //                 : item
                                                    //         )
                                                    //     )
                                                    // }
                                                    type="number"
                                                    className={ `px-4 py-2 rounded shadow ${errors.total_kg ? "border-red-500" : ""
                                                        }` }
                                                    id="input_total_kg"
                                                    readOnly
                                                />
                                                { errors.total_kg && (
                                                    <span className="text-red-500">
                                                        { errors.total_kg }
                                                    </span>
                                                ) }
                                            </div>
                                        </div>
                                    </div>
                                )) }
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-3 flex flex-col gap-2">
                                    <label htmlFor="input_total_berat">
                                        Total Berat
                                    </label>
                                    <input
                                        name="total_berat"
                                        type="number"
                                        className={ `px-4 py-2 rounded shadow read-only:bg-gray-200 text-gray-700 ${errors.total_berat
                                            ? "border-red-500"
                                            : ""
                                            }` }
                                        id="input_total_berat"
                                        onChange={e => {}}
                                        value={ warehouse.kolis?.reduce(
                                            (carry, item) =>
                                                carry + parseFloat(item?.total_kg || 0),
                                            0
                                        ) }
                                    />
                                    { errors.total_berat && (
                                        <span className="text-red-500">
                                            { errors.total_berat }
                                        </span>
                                    ) }
                                </div>
                                <div className="mb-3 flex flex-col gap-2">
                                    <label htmlFor="input_total_kubikasi">
                                        Total Kubikasi
                                    </label>
                                    <input
                                        name="total_kubikasi"
                                        type="number"
                                        className={ `px-4 py-2 rounded shadow read-only:bg-gray-200 text-gray-700 ${errors.total_kubikasi
                                            ? "border-red-500"
                                            : ""
                                            }` }
                                        id="input_total_kubikasi"
                                        onChange={e => {}}
                                        value={ warehouse.kolis?.reduce(
                                            (carry, item) =>
                                                carry + parseFloat(item?.cbm || 0),
                                            0
                                        ) }
                                    />
                                    { errors.total_kubikasi && (
                                        <span className="text-red-500">
                                            { errors.total_kubikasi }
                                        </span>
                                    ) }
                                </div>

                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <button
                                    type="submit"
                                    className="px-3 py-1 bg-indigo-700 text-white shadow rounded"
                                >
                                    Kirim
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
Form = forwardRef(Form);
export default Form;
