import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { KoliInput } from "./KoliInput";

function Form({ clients, newResi, ...props }, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [title, setTitle] = useState("Tambah Barang");
    const { errors: _errors, categories } = usePage().props;
    const [errors, setErrors] = useState(_errors);
    const [koli, setKoli] = useState(1);
    const [koliInputs, setKoliInputs] = useState([]);

    useImperativeHandle(ref, () => ({
        create: () => {
            setTitle("Tambah Barang");
            Inertia.reload({
                replace: true,
                data: {
                    newResi: true,
                },
                onSuccess: (data) => {
                    setData({ resi: newResi });
                },
            });
            setIsOpen(true);
        },
        edit: (data) => {
            setTitle("Edit Barang");
            setData(data);
            setIsOpen(true);
        },
    }));
    const submit = (e) => {
        e.preventDefault();
        let form = new FormData(e.target);
        if (data.id) {
            form.append("_method", "put");
            return Inertia.post(route("products.update", data.id), form);
        }
        return Inertia.post(route("products.store"), form);
    };
    useEffect(() => {
        setErrors(_errors);
    }, [_errors]);
    useEffect(() => {
        setErrors({});
    }, [isOpen]);
    return (
        <Transition
            show={isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
            <Dialog
                {...props}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed z-10 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="relative bg-gray-50 shadow-xl rounded-2xl max-w-sm mx-auto p-5 lg:min-w-[620px]">
                        <Dialog.Title className="text-xl text-center mb-3 border-b pb-3">
                            {title}
                        </Dialog.Title>
                        <form onSubmit={submit}>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_client_id">
                                    Customer
                                </label>
                                <select
                                    name="client_id"
                                    defaultValue={data.client_id}
                                    className={`uppercase px-4 py-2 rounded shadow ${
                                        errors.client_id ? "border-red-500" : ""
                                    }`}
                                    id="input_client_id"
                                >
                                    <option value="">Choose Customer</option>
                                    {clients.map((item, i) => (
                                        <option value={item.id} key={i}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.client_id && (
                                    <span className="text-red-500">
                                        {errors.client_id}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_resi">Resi</label>
                                <input
                                    name="resi"
                                    defaultValue={data.resi}
                                    type="text"
                                    className={`uppercase px-4 py-2 rounded shadow read-only:bg-gray-50 text-green-600 ${
                                        errors.resi ? "border-red-500" : ""
                                    }`}
                                    id="input_resi"
                                    readOnly
                                />
                                {errors.resi && (
                                    <span className="text-red-500">
                                        {errors.resi}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_code">Kode</label>
                                <input
                                    name="code"
                                    defaultValue={data.code}
                                    type="text"
                                    className={`uppercase px-4 py-2 rounded shadow ${
                                        errors.code ? "border-red-500" : ""
                                    }`}
                                    id="input_code"
                                />
                                {errors.code && (
                                    <span className="text-red-500">
                                        {errors.code}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_label">Label</label>
                                <input
                                    name="label"
                                    defaultValue={data.label}
                                    type="text"
                                    className={`px-4 py-2 rounded shadow ${
                                        errors.label ? "border-red-500" : ""
                                    }`}
                                    id="input_label"
                                />
                                {errors.label && (
                                    <span className="text-red-500">
                                        {errors.label}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_koli">Jumlah Koli</label>
                                <input
                                    name="koli"
                                    defaultValue={data.koli}
                                    type="number"
                                    className={`px-4 py-2 rounded shadow ${
                                        errors.koli ? "border-red-500" : ""
                                    }`}
                                    id="input_koli"
                                    value={koli}
                                    min={1}
                                    onChange={(e) => setKoli(e.target.value)}
                                />
                                {errors.koli && (
                                    <span className="text-red-500">
                                        {errors.koli}
                                    </span>
                                )}
                            </div>
                            <div className="rounded-xl border-t border-r border-l mb-3">
                                <KoliInput
                                    koliInputs={koliInputs}
                                    setKoliInputs={setKoliInputs}
                                    quantity={koli}
                                    data={data}
                                    errors={errors}
                                />
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_weight_total">
                                    Total Berat
                                </label>
                                <input
                                    name="weight_total"
                                    type="number"
                                    className={`px-4 py-2 rounded shadow read-only:bg-gray-200 text-gray-700 ${
                                        errors.weight_total
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    id="input_weight_total"
                                    value={koliInputs.reduce((carry, item) => carry + parseInt(item?.weight || 0), 0)}
                                    readOnly
                                />
                                {errors.weight_total && (
                                    <span className="text-red-500">
                                        {errors.weight_total}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_category_id">
                                    Kategori
                                </label>
                                <select
                                    name="category_id"
                                    defaultValue={data.category_id}
                                    className={`px-4 py-2 rounded shadow ${
                                        errors.category_id
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    id="input_category_id"
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((item, i) => (
                                        <option key={i} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <span className="text-red-500">
                                        {errors.category_id}
                                    </span>
                                )}
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
