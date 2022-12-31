import React, { useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import NavItem from "@/Components/NavItem";
import Logout from "@/Components/Logout";
import Toast from "@/Components/Toast";
import { WelcomeIcon } from "@/Components/WelcomeIcon";
import { DashboardIcon } from "@/Components/DashboardIcon";
import { MasterIcon } from "@/Components/MasterIcon";
import CategoryIcon from "@/Components/CategoryIcon";
import DriverIcon from "@/Components/DriverIcon";
import VehicleIcon from "@/Components/VehicleIcon";
import ClientIcon from "@/Components/ClientIcon";
import ShippingRateIcon from "@/Components/ShippingRateIcon";
import UserIcon from "@/Components/UserIcon";
import ProductIcon from "@/Components/ProductIcon";
import DeliveryIcon from "@/Components/DeliveryIcon";
import LogoutIcon from "@/Components/LogoutIcon";
import DollarIcon from "@/Components/DollarIcon";

export default function Authenticated({ children }) {
    const {
        props: { auth, flash },
        component,
    } = usePage();
    const logoutRef = useRef();
    const showLogoutPopup = (e) => {
        e.preventDefault();
        logoutRef.current.show();
    };
    const toastRef = useRef();
    useEffect(() => {
        if (flash.success) {
            toastRef.current.push(flash.success);
        }
    }, [flash]);
    return (
        <>
            <Toast ref={toastRef} />
            <div className="min-h-screen flex">
                <div
                    className="md:w-[251px] flex md:flex-col fixed md:relative bottom-0 md:rounded-t-none w-full"
                    style={{
                        background:
                            "linear-gradient(175.93deg, #0064FF -10.23%, #B200F1 102.58%)",
                    }}
                >
                    <div className="gap-5 items-center md:p-8 p-2 md:flex hidden">
                        <WelcomeIcon />
                        <div className="text-white font-bold">
                            Hi {auth.user.name}! Selamat Datang
                        </div>
                    </div>
                    <div className="md:px-8 px-2 hidden md:block">
                        <div className="w-full border-b border-2 opacity-20"></div>
                    </div>
                    <div className="md:mt-2 md:mb-10 flex flex-1 justify-between md:block">
                        <Link
                            href="/dashboard"
                            className={`${
                                component.startsWith("Dashboard")
                                    ? "md:border-l-4 bg-white/20"
                                    : ""
                            } py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20`}
                        >
                            <DashboardIcon />
                            <span
                                className="whitespace-nowrap truncate hidden md:block"
                                title="Dashboard"
                            >
                                Dashboard
                            </span>
                        </Link>
                        <NavItem
                            active={component.startsWith("Master")}
                            content={
                                <>
                                    <MasterIcon />
                                    <span
                                        className="whitespace-nowrap truncate hidden md:block"
                                        title="Master"
                                    >
                                        Master
                                    </span>
                                </>
                            }
                            items={
                                <>
                                    <NavItem
                                        active={component.startsWith(
                                            "Master/Category"
                                        )}
                                        href="/categories"
                                        content={
                                            <>
                                                <CategoryIcon />
                                                <span
                                                    className="whitespace-nowrap truncate"
                                                    title="Kategori"
                                                >
                                                    Kategori
                                                </span>
                                            </>
                                        }
                                    />
                                    <NavItem
                                        active={component.startsWith(
                                            "Master/Driver"
                                        )}
                                        href="/drivers"
                                        content={
                                            <>
                                                <DriverIcon />
                                                <span
                                                    className="whitespace-nowrap truncate"
                                                    title="Kurir"
                                                >
                                                    Kurir
                                                </span>
                                            </>
                                        }
                                    />
                                    <NavItem
                                        active={component.startsWith(
                                            "Master/Vehicle"
                                        )}
                                        href="/vehicles"
                                        content={
                                            <>
                                                <VehicleIcon />
                                                <span
                                                    className="whitespace-nowrap truncate"
                                                    title="Kendaraan"
                                                >
                                                    Kendaraan
                                                </span>
                                            </>
                                        }
                                    />
                                    <NavItem
                                        active={component.startsWith(
                                            "Master/Client"
                                        )}
                                        href="/clients"
                                        content={
                                            <>
                                                <ClientIcon />
                                                <span
                                                    className="whitespace-nowrap truncate"
                                                    title="Pelanggan"
                                                >
                                                    Pelanggan
                                                </span>
                                            </>
                                        }
                                    />
                                    <NavItem
                                        active={component.startsWith(
                                            "Master/ShippingRate"
                                        )}
                                        href="/shipping-rates"
                                        content={
                                            <>
                                                <DollarIcon />
                                                <span
                                                    className="whitespace-nowrap truncate"
                                                    title="Tarif"
                                                >
                                                    Tarif
                                                </span>
                                            </>
                                        }
                                    />
                                    <NavItem
                                        active={component.startsWith(
                                            "Master/User"
                                        )}
                                        href="/users"
                                        content={
                                            <>
                                                <UserIcon />
                                                <span
                                                    className="whitespace-nowrap truncate"
                                                    title="User"
                                                >
                                                    User
                                                </span>
                                            </>
                                        }
                                    />
                                </>
                            }
                        />
                        <Link
                            href="/products"
                            className={`${
                                component.startsWith("Master/Product")
                                    ? "md:border-l-4 bg-white/20"
                                    : ""
                            } py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20`}
                        >
                            <ProductIcon />
                            <span
                                className="whitespace-nowrap truncate hidden md:block"
                                title="Gudang"
                            >
                                Gudang
                            </span>
                        </Link>
                        <Link
                            href="/deliveries"
                            className={`${
                                component.startsWith("Delivery")
                                    ? "md:border-l-4 bg-white/20"
                                    : ""
                            } py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20`}
                        >
                            <DeliveryIcon />
                            <span
                                className="whitespace-nowrap truncate hidden md:block"
                                title="Pengiriman"
                            >
                                Pengiriman
                            </span>
                        </Link>
                        {/* <Link href="/report" className={`${component.startsWith('Report') ? 'md:border-l-4 bg-white/20' : ''} py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" viewBox="0 0 16 16">
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
                        </svg>
                        <span className="whitespace-nowrap truncate hidden md:block" title="Laporan">Laporan</span>
                    </Link> */}
                        {/* <Link href="/setting" className={ `${component.startsWith('Setting') ? 'md:border-l-4 bg-white/20' : ''} py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20` }>
                        <svg xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                        </svg>
                        <span className="whitespace-nowrap truncate hidden md:block" title="Pengaturan">Pengaturan</span>
                    </Link> */}
                    </div>
                    <div className="bg-indigo-600/90 sticky mt-auto bottom-0 hidden md:block">
                        <div
                            onClick={showLogoutPopup}
                            className={`${
                                component.startsWith("Setting")
                                    ? "md:border-l-4 bg-white/20"
                                    : ""
                            } py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20`}
                        >
                            <LogoutIcon />
                            <span
                                className="whitespace-nowrap truncate hidden md:block"
                                title="Pengaturan"
                            >
                                Keluar
                            </span>
                        </div>
                    </div>
                </div>
                {children}
            </div>
            <Logout ref={logoutRef} />
        </>
    );
}
