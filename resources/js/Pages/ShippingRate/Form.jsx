import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";
import CloseIcon from "@/Components/CloseIcon";

function Form(
    {
        provinces,
        originCities,
        originDistricts,
        destCities,
        destDistricts,
        setOriginProvinceId,
        setOriginCityId,
        setDestProvinceId,
        setDestCityId,
        originCityLoading,
        originDistrictLoading,
        destCityLoading,
        destDistrictLoading,
        ...props
    },
    ref
) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [title, setTitle] = useState("Tambah Tarif");
    const { errors: _errors } = usePage().props;
    const [errors, setErrors] = useState(_errors);
    const formRef = useRef();
    useImperativeHandle(ref, () => ({
        create: () => {
            setTitle("Tambah Tarif");
            setData({});
            setIsOpen(true);
        },
        edit: (data) => {
            setTitle("Edit Tarif");
            setData(data);
            setIsOpen(true);
        },
    }));
    const {
        data: form,
        setData: setForm,
        post,
        processing,
        errors: formErrors,
    } = useForm({
        _method: "POST",
        origin_province_id: "",
        origin_city_id: "",
        origin_district_id: "",
        dest_province_id: "",
        dest_city_id: "",
        dest_district_id: "",
        shipping_channel: "",
        price: 0,
    });
    const submit = (e) => {
        e.preventDefault();
        setForm("_method", "POST");
        if (data.id) {
            setForm("_method", "PUT");
            return Inertia.post(route("shipping-rates.update", data.id), form);
        }
        return Inertia.post(route("shipping-rates.store"), form, {
            onSuccess: () => {
                setForm("dest_province_id", "");
                setForm("dest_city_id", "");
                setForm("dest_district_id", "");
            },
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
                    <div className="relative bg-gray-50 shadow-xl rounded-2xl max-w-xl mx-auto p-5">
                        <Dialog.Title className="text-xl text-center mb-3 border-b pb-3 flex justify-between">
                            {title}
                            <button onClick={(e) => setIsOpen(false)}>
                                <CloseIcon />
                            </button>
                        </Dialog.Title>
                        <form onSubmit={submit} ref={formRef}>
                            <div className="grid lg:grid-cols-3 gap-2 rounded border px-3 py-2 mb-2">
                                <div className="mb-3 flex flex-col gap-2">
                                    <label htmlFor="input_origin_province_id">
                                        Provinsi Asal
                                    </label>
                                    <select
                                        value={form.origin_province_id}
                                        name="origin_province_id"
                                        onChange={(e) => {
                                            setForm(
                                                "origin_province_id",
                                                e.target.value
                                            );
                                            setOriginProvinceId(e.target.value);
                                        }}
                                        type="text"
                                        className={`px-4 py-2 rounded shadow disabled:bg-gray-100 ${
                                            errors.origin_province_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="input_origin_province_id"
                                    >
                                        <option value="">
                                            Pilih Provinsi Asal
                                        </option>
                                        {provinces.map((item, i) => (
                                            <option key={i} value={item.code}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.origin_province_id && (
                                        <span className="text-red-500">
                                            {errors.origin_province_id}
                                        </span>
                                    )}
                                </div>
                                <div className="mb-3 flex flex-col gap-2">
                                    <label htmlFor="input_origin_province_id">
                                        Kota Asal
                                    </label>
                                    <select
                                        value={form.origin_city_id}
                                        name="origin_city_id"
                                        onChange={(e) => {
                                            setForm(
                                                "origin_city_id",
                                                e.target.value
                                            );
                                            setOriginCityId(e.target.value);
                                        }}
                                        type="text"
                                        className={`px-4 py-2 rounded shadow disabled:bg-gray-100 ${
                                            errors.origin_city_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="input_origin_city_id"
                                        disabled={
                                            originCityLoading ||
                                            originCities.length == 0
                                        }
                                    >
                                        <option value="">
                                            Pilih Kota Asal
                                        </option>
                                        {originCities.map((item, i) => (
                                            <option key={i} value={item.code}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.origin_city_id && (
                                        <span className="text-red-500">
                                            {errors.origin_city_id}
                                        </span>
                                    )}
                                </div>
                                <div className="mb-3 flex flex-col gap-2">
                                    <label htmlFor="input_origin_province_id">
                                        Kecamatan Asal
                                    </label>
                                    <select
                                        value={form.origin_district_id}
                                        name="origin_district_id"
                                        onChange={(e) =>
                                            setForm(
                                                "origin_district_id",
                                                e.target.value
                                            )
                                        }
                                        type="text"
                                        className={`px-4 py-2 rounded shadow disabled:bg-gray-100 ${
                                            errors.origin_district_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="input_origin_district_id"
                                        disabled={
                                            originDistrictLoading ||
                                            originDistricts.length == 0
                                        }
                                    >
                                        <option value="">
                                            Pilih Kecamatan Asal
                                        </option>
                                        {originDistricts.map((item, i) => (
                                            <option key={i} value={item.code}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.origin_district_id && (
                                        <span className="text-red-500">
                                            {errors.origin_district_id}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="grid lg:grid-cols-3 gap-2 rounded border px-3 py-2 mb-2">
                                <div className="mb-3 flex flex-col gap-2">
                                    <label htmlFor="input_dest_province_id">
                                        Provinsi Tujuan
                                    </label>
                                    <select
                                        value={form.dest_province_id}
                                        name="dest_province_id"
                                        onChange={(e) => {
                                            setForm(
                                                "dest_province_id",
                                                e.target.value
                                            );
                                            setDestProvinceId(e.target.value);
                                        }}
                                        type="text"
                                        className={`px-4 py-2 rounded shadow disabled:bg-gray-100 ${
                                            errors.dest_province_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="input_dest_province_id"
                                    >
                                        <option value="">
                                            Pilih Provinsi Tujuan
                                        </option>
                                        {provinces.map((item, i) => (
                                            <option key={i} value={item.code}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.dest_province_id && (
                                        <span className="text-red-500">
                                            {errors.dest_province_id}
                                        </span>
                                    )}
                                </div>
                                <div className="mb-3 flex flex-col gap-2">
                                    <label htmlFor="input_dest_province_id">
                                        Kota Tujuan
                                    </label>
                                    <select
                                        value={form.dest_city_id}
                                        name="dest_city_id"
                                        onChange={(e) => {
                                            setForm(
                                                "dest_city_id",
                                                e.target.value
                                            );
                                            setDestCityId(e.target.value);
                                        }}
                                        type="text"
                                        className={`px-4 py-2 rounded shadow disabled:bg-gray-100 ${
                                            errors.dest_city_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="input_dest_city_id"
                                        disabled={
                                            destCityLoading ||
                                            destCities.length == 0
                                        }
                                    >
                                        <option value="">
                                            Pilih Kota Tujuan
                                        </option>
                                        {destCities.map((item, i) => (
                                            <option key={i} value={item.code}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.dest_city_id && (
                                        <span className="text-red-500">
                                            {errors.dest_city_id}
                                        </span>
                                    )}
                                </div>
                                <div className="mb-3 flex flex-col gap-2">
                                    <label htmlFor="input_dest_province_id">
                                        Kecamatan Tujuan
                                    </label>
                                    <select
                                        value={form.dest_district_id}
                                        name="dest_district_id"
                                        onChange={(e) =>
                                            setForm(
                                                "dest_district_id",
                                                e.target.value
                                            )
                                        }
                                        type="text"
                                        className={`px-4 py-2 rounded shadow disabled:bg-gray-100 ${
                                            errors.dest_district_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="input_dest_district_id"
                                        disabled={
                                            destDistrictLoading ||
                                            destDistricts.length == 0
                                        }
                                    >
                                        <option value="">
                                            Pilih Kecamatan Tujuan
                                        </option>
                                        {destDistricts.map((item, i) => (
                                            <option key={i} value={item.code}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.dest_district_id && (
                                        <span className="text-red-500">
                                            {errors.dest_district_id}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3 flex flex-col gap-2 border rounded px-3 py-2   ">
                                <label htmlFor="input_shipping_channel">
                                    Jenis Pengiriman
                                </label>
                                <div className="flex flex-1 items-center gap-2">
                                    <select
                                        value={form.shipping_channel}
                                        name="shipping_channel"
                                        onChange={(e) =>
                                            setForm(
                                                "shipping_channel",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-2 rounded shadow ${
                                            errors.shipping_channel
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="input_shipping_channel"
                                    >
                                        <option value="">
                                            Pilih Jenis Pengiriman
                                        </option>
                                        <option value="darat">Darat</option>
                                        <option value="laut">Laut</option>
                                        <option value="udara">Udara</option>
                                    </select>
                                </div>
                                {errors.shipping_channel && (
                                    <span className="text-red-500">
                                        {errors.shipping_channel}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 flex flex-col gap-2 border rounded px-3 py-2   ">
                                <label htmlFor="input_price">Tarif</label>
                                <div className="flex flex-1 items-center gap-2">
                                    <span>Rp. </span>
                                    <input
                                        value={form.price}
                                        name="price"
                                        onChange={(e) =>
                                            setForm("price", e.target.value)
                                        }
                                        type="number"
                                        className={`w-full px-4 py-2 rounded shadow ${
                                            errors.price ? "border-red-500" : ""
                                        }`}
                                        id="input_price"
                                    />
                                </div>
                                {errors.price && (
                                    <span className="text-red-500">
                                        {errors.price}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <button
                                    type="submit"
                                    className="px-3 py-1 bg-indigo-700 text-white shadow rounded"
                                >
                                    Simpan
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
