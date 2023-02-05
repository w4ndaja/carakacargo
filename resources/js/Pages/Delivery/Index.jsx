import Authenticated from "@/Layouts/Authenticated";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useRef, useState } from "react";
import DeletePrompt from "./DeletePrompt";
import Form from "./Form";

export default function ShippingRate({
    deliveries,
    provinces,
    originCities,
    originDistricts,
    destCities,
    destDistricts,
    drivers,
    products,
    clients,
    shippingRate,
    categories,
}) {
    const { flash } = usePage().props;
    const formRef = useRef();
    const deletePromptRef = useRef();
    const [originProvinceId, setOriginProvinceId] = useState();
    const [originCityId, setOriginCityId] = useState();
    const [destProvinceId, setDestProvinceId] = useState();
    const [destCityId, setDestCityId] = useState();
    const [originCityLoading, setOriginCityLoading] = useState(false);
    const [originDistrictLoading, setOriginDistrictLoading] = useState(false);
    const [destCityLoading, setDestCityLoading] = useState(false);
    const [destDistrictLoading, setDestDistrictLoading] = useState(false);
    useEffect(() => {
        if (originProvinceId || originCityId || destProvinceId || destCityId) {
            Inertia.reload({
                data: {
                    origin_province_id: originProvinceId,
                    origin_city_id: originCityId,
                    dest_province_id: destProvinceId,
                    dest_city_id: destCityId,
                },
                replace: true,
                only: [
                    "originCities",
                    "originDistricts",
                    "destCities",
                    "destDistricts",
                ],
                onStart() {
                    setOriginCityLoading(true);
                },
                onFinish() {
                    setOriginCityLoading(false);
                },
            });
        }
    }, [originProvinceId, originCityId, destProvinceId, destCityId]);

    const create = (e) => {
        e.preventDefault();
        formRef.current.create();
    };

    const searchData = (e) => {
        setSearch(e.target.value);
        _searchData(e.target.value);
    };

    const edit = (e, data) => {
        e.preventDefault();
        formRef.current.edit(data);
    };

    const destroy = (e, data) => {
        e.preventDefault();
        deletePromptRef.current.show(data);
    };

    return (
        <>
            <Head title="Carakacargo - Pengiriman" />

            <div className="p-10 flex-1 min-h-max flex flex-col pb-20 md:pb-10">
                <div className="text-3xl font-semibold text-indigo-900">
                    Pengiriman
                </div>
                <div className="text-gray-600 mt-2">Pengiriman</div>
                <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-3">
                        <button
                            onClick={create}
                            className="bg-green-500 px-4 py-2 rounded-xl text-white hover:-translate-x-1 transition"
                        >
                            Tambah
                        </button>
                    </div>
                </div>
                <div className="border rounded-xl mt-5 flex-1 mb-5 text-left">
                    <table className="w-full">
                        <thead>
                            <tr className="text-center">
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                    Kode Driver
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                    Kode Barang
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                    Resi
                                </th>
                                <th
                                    colSpan={3}
                                    className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs"
                                >
                                    Asal
                                </th>
                                <th
                                    colSpan={3}
                                    className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs"
                                >
                                    Tujuan
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                    Layanan
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                    Status
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                    Tarif
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                    Kustomer
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                    #
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries.data.map((item, i) => (
                                <tr key={i}>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.driver?.user?.name}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.product?.code}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.waybill}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.origin_province?.name}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.origin_city?.name}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.origin_district?.name}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.dest_province?.name}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.dest_city?.name}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.dest_district?.name}
                                    </td>
                                    <td className="text-capitalize border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.service_type}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.status}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs text-right">
                                        Rp. {item._price || "-"}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        {item.client?.code}
                                    </td>
                                    <td className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs">
                                        <div className="flex gap-3 w-100 justify-center">
                                            <button
                                                role="button"
                                                type="button"
                                                onClick={(e) => edit(e, item)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    class="bi bi-pen"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                </svg>
                                            </button>
                                            <button
                                                role="button"
                                                type="button"
                                                onClick={(e) =>
                                                    destroy(e, item)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    class="bi bi-eraser"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {deliveries.total == 0 && (
                                <tr>
                                    <td
                                        colSpan={999}
                                        className="text-center px-4 py-2 text-indigo-300 text-xl"
                                    >
                                        <div className="flex flex-col items-center mt-10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={64}
                                                height={64}
                                                fill="currentColor"
                                                className="bi bi-bag-dash"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
                                                />
                                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                            </svg>
                                            <span className="mt-5">
                                                {" "}
                                                Data Kosong...{" "}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex mt-auto">
                    {deliveries.links.map((item, i) => (
                        <Link
                            key={i}
                            href={item.url}
                            className="bg-indigo-600 text-white px-4 py-2 first:rounded-l-xl last:rounded-r-xl hover:bg-indigo-500"
                            dangerouslySetInnerHTML={{ __html: item.label }}
                        ></Link>
                    ))}
                </div>
            </div>
            <Form
                ref={formRef}
                provinces={provinces}
                originCities={originCities}
                originCityLoading={originCityLoading}
                originDistricts={originDistricts}
                originDistrictLoading={originDistrictLoading}
                destCities={destCities}
                destCityLoading={destCityLoading}
                destDistricts={destDistricts}
                destDistrictLoading={destDistrictLoading}
                setOriginProvinceId={setOriginProvinceId}
                setOriginCityId={setOriginCityId}
                setDestProvinceId={setDestProvinceId}
                setDestCityId={setDestCityId}
                drivers={drivers}
                products={products}
                clients={clients}
                shippingRate={shippingRate}
                categories={categories}
            />
            <DeletePrompt ref={deletePromptRef} />
        </>
    );
}
ShippingRate.layout = (page) => <Authenticated>{page}</Authenticated>;
