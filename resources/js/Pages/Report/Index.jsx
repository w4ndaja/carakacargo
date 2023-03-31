import { FilterIcon } from "@/Components/FilterIcon";
import { PrintIcon } from "@/Components/PrintIcon";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import React, { useRef } from "react";

export default function ShippingRate({ deliveries, drivers }) {
    const printArea = useRef();
    const printTable = (e) => {
        let printWindow = window.open("", "_blank");
        printWindow.document.head.innerHTML = window.document.head.innerHTML;
        printWindow.document.body.innerHTML = printArea.current.outerHTML;
        // printWindow.print();
        // printWindow.close();
    };

    return (
        <>
            <Head title="Carakacargo - Pengiriman" />
            <div className="p-10 flex-1 min-h-max flex flex-col pb-20 md:pb-10">
                <div className="flex">
                    <div className="text-3xl font-semibold text-indigo-900">
                        Laporan Pengiriman
                    </div>
                </div>
                <div className="flex w-full gap-4 p-4 border rounded mt-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="jenis_pengiriman_id_input">Jenis Pengiriman</label>
                        <select name="jenis_pengiriman_id" id="jenis_pengiriman_id_input" className="pl-4 pr-8 py-2 border rounded">
                            <option value="">Pilih Jenis Pengiriman</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="origin_city_id_input">Kota Asal</label>
                        <select name="origin_city_id" id="origin_city_id_input" className="pl-4 pr-8 py-2 border rounded">
                            <option value="">Pilih Kota Asal</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="dest_city_id_input">Kota Tujuan</label>
                        <select name="dest_city_id" id="dest_city_id_input" className="pl-4 pr-8 py-2 border rounded">
                            <option value="">Pilih Kota Tujuan</option>
                        </select>
                    </div>
                    <div className="ml-auto">
                    <button
                        onClick={printTable}
                        className="ml-auto p-4 border border-blue-500 rounded-xl hover:shadow text-blue-500"
                    >
                        <PrintIcon width={40} height={40} />
                    </button>
                    </div>
                </div>
                <div
                    className="border rounded-xl mt-5 flex-1 mb-5 text-left"
                    ref={printArea}
                >
                    <table className="w-full print:bg-red-400">
                        <thead>
                            <tr className="text-center">
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs pr-6 relative">
                                    Kode Driver
                                    <button className="flex items-center pr-2 absolute h-full top-0 right-0">
                                        <FilterIcon />
                                    </button>
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs pr-6 relative">
                                    Kode Barang
                                    <button className="flex items-center pr-2 absolute h-full top-0 right-0">
                                        <FilterIcon />
                                    </button>
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs pr-6 relative">
                                    Resi
                                    <button className="flex items-center pr-2 absolute h-full top-0 right-0">
                                        <FilterIcon />
                                    </button>
                                </th>
                                <th
                                    colSpan={3}
                                    className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs pr-6 relative"
                                >
                                    Asal
                                    <button className="flex items-center pr-2 absolute h-full top-0 right-0">
                                        <FilterIcon />
                                    </button>
                                </th>
                                <th
                                    colSpan={3}
                                    className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs pr-6 relative"
                                >
                                    Tujuan
                                    <button className="flex items-center pr-2 absolute h-full top-0 right-0">
                                        <FilterIcon />
                                    </button>
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs pr-6 relative">
                                    Layanan
                                    <button className="flex items-center pr-2 absolute h-full top-0 right-0">
                                        <FilterIcon />
                                    </button>
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs pr-6 relative">
                                    Status
                                    <button className="flex items-center pr-2 absolute h-full top-0 right-0">
                                        <FilterIcon />
                                    </button>
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs pr-6 relative">
                                    Tarif
                                    <button className="flex items-center pr-2 absolute h-full top-0 right-0">
                                        <FilterIcon />
                                    </button>
                                </th>
                                <th className="border-r last:border-r-0 border-b py-2 px-2 whitespace-nowrap text-xs pr-6 relative">
                                    Kustomer
                                    <button className="flex items-center pr-2 absolute h-full top-0 right-0">
                                        <FilterIcon />
                                    </button>
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
        </>
    );
}
ShippingRate.layout = (page) => <Authenticated>{page}</Authenticated>;
