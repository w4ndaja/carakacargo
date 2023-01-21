import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col p-14">
                <div className="ml-auto text-3xl">
                    Dashboard
                </div>
                <div className="grid md:grid-cols-4 grid-flow-row auto-rows-auto gap-10 mt-10">
                    <div className="group border rounded-xl p-6 flex flex-col gap-3 items-center justify-center cursor-pointer hover:border-blue-600 hover:text-blue-600 transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="group-hover:text-blue-600 text-gray-400 text-lg font-semibold">Gudang</div>
                        <div className="text-4xl font-bold">{props.warehouses}</div>
                    </div>
                    <div className="group border rounded-xl p-6 flex flex-col gap-3 items-center justify-center cursor-pointer hover:border-blue-600 hover:text-blue-600 transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="group-hover:text-blue-600 text-gray-400 text-lg font-semibold">Pengiriman</div>
                        <div className="text-4xl font-bold">{props.deliveries}</div>
                    </div>
                    <div className="group border rounded-xl p-6 flex flex-col gap-3 items-center justify-center cursor-pointer hover:border-blue-600 hover:text-blue-600 transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="group-hover:text-blue-600 text-gray-400 text-lg font-semibold">Kurir</div>
                        <div className="text-4xl font-bold">{props.couriers}</div>
                    </div>
                    <div className="group border rounded-xl p-6 flex flex-col gap-3 items-center justify-center cursor-pointer hover:border-blue-600 hover:text-blue-600 transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="group-hover:text-blue-600 text-gray-400 text-lg font-semibold">Pelanggan</div>
                        <div className="text-4xl font-bold">{props.clients}</div>
                    </div>
                </div>
                {/* <div className="border rounded-xl flex mt-6 flex-wrap">
                    <div className="flex flex-col flex-1 py-10 px-9">
                        <div className="text-xl font-bold">Statistik Pengiriman</div>
                        <div className="flex justify-between flex-wrap mt-2">
                            <div className="text-gray-400">Kamis, 21 Maret 2026</div>
                            <div className="flex gap-6">
                                <div className="flex items-center text-gray-400 gap-3">
                                    <div className="w-[16px] border-b-2 border-blue-700"></div>
                                    Hari ini
                                </div>
                                <div className="flex items-center text-gray-400 gap-3">
                                    <div className="w-[16px] border-b-2 border-gray-400"></div>
                                    Kemarin
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-l">
                        <div className="py-10 px-9 flex items-center flex-col border-b last:border-b-0">
                            <div className="text-gray-400">Dalam Perjalanan</div>
                            <div className="text-2xl font-semibold">449</div>
                        </div>
                        <div className="py-10 px-9 flex items-center flex-col border-b last:border-b-0">
                            <div className="text-gray-400">Sampai Tujuan</div>
                            <div className="text-2xl font-semibold">449</div>
                        </div>
                        <div className="py-10 px-9 flex items-center flex-col border-b last:border-b-0">
                            <div className="text-gray-400">Total Pengiriman</div>
                            <div className="text-2xl font-semibold">449</div>
                        </div>
                        <div className="py-10 px-9 flex items-center flex-col border-b last:border-b-0">
                            <div className="text-gray-400">Average response time</div>
                            <div className="text-2xl font-semibold">3h 4m</div>
                        </div>
                        <div className="py-10 px-9 flex items-center flex-col border-b last:border-b-0">
                            <div className="text-gray-400">Presentase terselesaikan</div>
                            <div className="text-2xl font-semibold">94%</div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}

Dashboard.layout = page => <Authenticated >{page}</Authenticated>;
