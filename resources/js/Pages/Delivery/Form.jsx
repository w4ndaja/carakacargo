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
        drivers,
        products,
        clients,
        shippingRate,
        categories,
        ...props
    },
    ref
) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [title, setTitle] = useState("Tambah Pengiriman");
    const { errors: _errors } = usePage().props;
    const [errors, setErrors] = useState(_errors);
    const [shippingRateLoading, setShippingRateLoading] = useState(false);
    const [price, setPrice] = useState("-");

    const formRef = useRef();
    useImperativeHandle(ref, () => ({
        create: () => {
            setTitle("Tambah Pengiriman");
            setData({});
            setForm({});
            setIsOpen(true);
        },
        edit: (data) => {
            setTitle("Edit Pengiriman");
            setData(data);
            setForm({ ...form, ...data, _method: "PUT" });
            setOriginProvinceId(data.origin_province_id);
            setDestProvinceId(data.dest_province_id);
            setOriginCityId(data.origin_city_id);
            setDestCityId(data.dest_city_id);
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
        driver_id: "",
        product_id: "",
        waybill: "0000000000",
        origin_province_id: "",
        origin_city_id: "",
        origin_district_id: "",
        dest_province_id: "",
        dest_city_id: "",
        dest_district_id: "",
        service_type: "",
        status: "warehouse",
        client_id: "",
        price: 0,
    });
    const submit = (e) => {
        e.preventDefault();
        setForm("_method", "POST");
        if (data.id) {
            setForm("_method", "PUT");
            console.log("form =>", form);
            return Inertia.post(route("deliveries.update", data.id), {
                ...form,
                price: shippingRate.price,
            });
        }
        return Inertia.post(
            route("deliveries.store"),
            { ...form, price: shippingRate.price },
            {
                onSuccess: () => {
                    setForm("dest_province_id", "");
                    setForm("dest_city_id", "");
                    setForm("dest_district_id", "");
                },
            }
        );
    };
    useEffect(() => {
        setErrors(_errors);
    }, [_errors]);
    useEffect(() => {
        setErrors({});
    }, [isOpen]);
    useEffect(() => {
        if (
            form.service_type &&
            form.dest_district_id &&
            form.origin_district_id
        ) {
            Inertia.reload({
                data: {
                    dest_district_id: form.dest_district_id,
                    origin_district_id: form.origin_district_id,
                    shipping_channel: form.service_type,
                    product_id: form.product_id,
                },
                replace: true,
                only: ["shippingRate"],
                onStart() {
                    setShippingRateLoading(true);
                },
                onFinish() {
                    setShippingRateLoading(false);
                    setForm("price", shippingRate?.price || "0");
                },
            });
        }
    }, [form.service_type, form.dest_district_id, form.origin_district_id]);
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
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="input_driver_id">Driver</label>
                                <select
                                    value={form.driver_id}
                                    name="driver_id"
                                    onChange={(e) => {
                                        setForm("driver_id", e.target.value);
                                    }}
                                    type="text"
                                    className={`px-4 py-2 rounded shadow disabled:bg-gray-100 ${
                                        errors.driver_id ? "border-red-500" : ""
                                    }`}
                                    id="input_driver_id"
                                >
                                    <option value="">Pilih Driver</option>
                                    {drivers.map((item, i) => (
                                        <option key={i} value={item.id}>
                                            {item.user?.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.driver_id && (
                                    <span className="text-red-500">
                                        {errors.driver_id}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="product_id">Barang</label>
                                <select
                                    value={form.product_id}
                                    name="product_id"
                                    onChange={(e) => {
                                        const product = products.find(
                                            (item) => item?.id == e.target.value
                                        );
                                        setForm({
                                            ...form,
                                            product_id: e.target.value,
                                            client_id: product?.client_id,
                                            waybill: product?.resi,
                                        });
                                    }}
                                    type="text"
                                    className={`px-4 py-2 rounded shadow disabled:bg-gray-100 ${
                                        errors.product_id
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    id="product_id"
                                >
                                    <option value="">Pilih Barang</option>
                                    {products.map((item, i) => (
                                        <option key={i} value={item.id}>
                                            {item.code}
                                        </option>
                                    ))}
                                </select>
                                {errors.product_id && (
                                    <span className="text-red-500">
                                        {errors.product_id}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 flex flex-col gap-2 border rounded px-3 py-2   ">
                                <label htmlFor="input_waybill">Resi</label>
                                <div className="flex flex-1 items-center gap-2">
                                    <input
                                        value={form.waybill}
                                        name="waybill"
                                        type="text"
                                        className={`w-full px-4 py-2 rounded shadow ${
                                            errors.waybill
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="input_waybill"
                                        readOnly
                                    />
                                </div>
                                {errors.waybill && (
                                    <span className="text-red-500">
                                        {errors.waybill}
                                    </span>
                                )}
                            </div>
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
                                <label htmlFor="input_service_type">
                                    Layanan
                                </label>
                                <div className="flex flex-1 items-center gap-2">
                                    <select
                                        value={form.service_type}
                                        name="service_type"
                                        onChange={(e) =>
                                            setForm(
                                                "service_type",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-2 rounded shadow ${
                                            errors.service_type
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="input_service_type"
                                    >
                                        <option value="">Pilih layanan</option>
                                        {categories.map((item, i) => (
                                            <option key={i} value={item.name}>
                                                {item.name} - {item.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.service_type && (
                                    <span className="text-red-500">
                                        {errors.service_type}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 flex flex-col gap-2 border rounded px-3 py-2   ">
                                <label htmlFor="input_status">Status</label>
                                <div className="flex flex-1 items-center gap-2">
                                    <select
                                        value={form.status}
                                        name="status"
                                        onChange={(e) =>
                                            setForm("status", e.target.value)
                                        }
                                        className={`w-full px-4 py-2 rounded shadow ${
                                            errors.status
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="input_status"
                                    >
                                        <option value="warehouse">
                                            Warehouse
                                        </option>
                                        <option value="on_delivery">
                                            On Delivery
                                        </option>
                                        <option value="received">
                                            Diterima
                                        </option>
                                    </select>
                                </div>
                                {errors.status && (
                                    <span className="text-red-500">
                                        {errors.status}
                                    </span>
                                )}
                            </div>
                            <div className="mb-3 flex flex-col gap-2 border rounded px-3 py-2   ">
                                <label htmlFor="input_price">Pengiriman</label>
                                <div className="flex flex-1 items-center gap-2">
                                    <div className="font-semibold">Rp. </div>
                                    {!shippingRateLoading &&
                                    shippingRate?._price ? (
                                        <div className="px-3 py-2 rounded-lg bg-green-100 text-green-600">
                                            {shippingRate?._price}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="h-[40px] w-[120px] bg-gray-200 animate-pulse rounded-lg"></div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3 flex flex-col gap-2 border rounded px-3 py-2   ">
                                <label htmlFor="input_client_id">
                                    Customer
                                </label>
                                <div className="flex flex-1 items-center gap-2">
                                    <select
                                        value={form.client_id}
                                        name="client_id"
                                        readOnly
                                        className={`w-full px-4 py-2 rounded shadow ${
                                            errors.client_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        id="input_client_id"
                                    >
                                        {clients.map((item, i) => (
                                            <option value={item.id} key={i}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.client_id && (
                                    <span className="text-red-500">
                                        {errors.client_id}
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
