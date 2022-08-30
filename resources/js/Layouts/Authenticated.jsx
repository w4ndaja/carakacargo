import React, { useEffect, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import NavItem from '@/Components/NavItem';
import Logout from '@/Components/Logout';
import Toast from '@/Components/Toast';

export default function Authenticated({ children }) {
    const { props: { auth, flash }, component } = usePage();
    const logoutRef = useRef();
    const showLogoutPopup = e => {
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
            <Toast ref={ toastRef } />
            <div className="min-h-screen flex">
                <div className="md:w-[251px] flex md:flex-col fixed md:relative bottom-0 rounded-t-xl md:rounded-t-none w-full" style={ {
                    background: 'linear-gradient(175.93deg, #0064FF -10.23%, #B200F1 102.58%)'
                } }>
                    <div className="gap-5 items-center md:p-8 p-2 md:flex hidden">
                        <svg className='min-w-[36px]' width={ 36 } height={ 39 } viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.931 0.133362L33.668 8.02284L17.931 15.8913L2.19403 8.02284L17.931 0.133362ZM0.47345 30.6631V10.8975L16.5881 18.9548V38.7205L0.47345 30.6631ZM19.2739 18.9548L35.3886 10.8975V30.6631L19.2739 38.7205V18.9548Z" fill="#F3D7FF" />
                        </svg>
                        <div className="text-white font-bold">Hi { auth.user.name }! Selamat Datang</div>
                    </div>
                    <div className="md:px-8 px-2 hidden md:block">
                        <div className="w-full border-b border-2 opacity-20"></div>
                    </div>
                    <div className="md:mt-2 md:mb-10 flex flex-1 justify-between md:block">
                        <Link href="/dashboard" className={ `${component.startsWith('Dashboard') ? 'md:border-l-4 bg-white/20' : ''} py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20` }>
                            <svg className="min-w-[20px]" xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                            </svg>
                            <span className="whitespace-nowrap truncate hidden md:block" title="Dashboard">Dashboard</span>
                        </Link>
                        <NavItem active={ component.startsWith('Master') } content={ <>
                            <svg xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
                            </svg>
                            <span className="whitespace-nowrap truncate hidden md:block" title="Master">Master</span>
                        </> } items={ <>
                            <NavItem active={ component.startsWith('Master/Category') } href="/categories" content={ <>
                                <svg xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" className="bi bi-tag" viewBox="0 0 20 20">
                                    <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
                                    <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z" />
                                </svg>
                                <span className="whitespace-nowrap truncate" title="Kategori">Kategori</span>
                            </> } />
                            <NavItem active={ component.startsWith('Master/Driver') } href="/drivers" content={ <>
                                <svg xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" className="bi bi-person-badge" viewBox="0 0 20 20">
                                    <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                                </svg>
                                <span className="whitespace-nowrap truncate" title="Kurir">Kurir</span>
                            </> } />
                            <NavItem active={ component.startsWith('Master/Vehicle') } href="/vehicles" content={ <>
                                <svg xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" className="bi bi-truck-front" viewBox="0 0 20 20">
                                    <path d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Z" />
                                    <path fillRule="evenodd" d="M4 2a1 1 0 0 0-1 1v3.9c0 .625.562 1.092 1.17.994C5.075 7.747 6.792 7.5 8 7.5c1.208 0 2.925.247 3.83.394A1.008 1.008 0 0 0 13 6.9V3a1 1 0 0 0-1-1H4Zm0 1h8v3.9c0 .002 0 .001 0 0l-.002.004a.013.013 0 0 1-.005.002h-.004C11.088 6.761 9.299 6.5 8 6.5s-3.088.26-3.99.406h-.003a.013.013 0 0 1-.005-.002L4 6.9c0 .001 0 .002 0 0V3Z" />
                                    <path fillRule="evenodd" d="M1 2.5A2.5 2.5 0 0 1 3.5 0h9A2.5 2.5 0 0 1 15 2.5v9c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.496 2.496 0 0 1-1-2v-9ZM3.5 1A1.5 1.5 0 0 0 2 2.5v9A1.5 1.5 0 0 0 3.5 13h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12.5 1h-9Z" />
                                </svg>
                                <span className="whitespace-nowrap truncate" title="Kendaraan">Kendaraan</span>
                            </> } />
                            <NavItem active={ component.startsWith('Master/Client') } href="/clients" content={ <>
                                <svg xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" className="bi bi-people" viewBox="0 0 20 20">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                                </svg>
                                <span className="whitespace-nowrap truncate" title="Pelanggan">Pelanggan</span>
                            </> } />
                            <NavItem active={ component.startsWith('Master/User') } href="/users" content={ <>
                                <svg xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                                <span className="whitespace-nowrap truncate" title="User">User</span>
                            </> } />
                        </> } />
                        <Link href="/products" className={ `${component.startsWith('Master/Product') ? 'md:border-l-4 bg-white/20' : ''} py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20` }>
                            <svg xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" className="bi bi-house" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                            </svg>
                            <span className="whitespace-nowrap truncate hidden md:block" title="Gudang">Gudang</span>
                        </Link>
                        <Link href="/deliveries" className={ `${component.startsWith('Delivery') ? 'md:border-l-4 bg-white/20' : ''} py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20` }>
                            <svg xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                            <span className="whitespace-nowrap truncate hidden md:block" title="Pengiriman">Pengiriman</span>
                        </Link>
                        {/* <Link href="/report" className={`${component.startsWith('Report') ? 'md:border-l-4 bg-white/20' : ''} py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" viewBox="0 0 16 16">
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
                            </svg>
                            <span className="whitespace-nowrap truncate hidden md:block" title="Laporan">Laporan</span>
                        </Link> */}
                        <Link href="/setting" className={ `${component.startsWith('Setting') ? 'md:border-l-4 bg-white/20' : ''} py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20` }>
                            <svg xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                            </svg>
                            <span className="whitespace-nowrap truncate hidden md:block" title="Pengaturan">Pengaturan</span>
                        </Link>
                    </div>
                    <div className="sticky mt-auto bottom-0 hidden md:block">
                        <div onClick={ showLogoutPopup } className={ `${component.startsWith('Setting') ? 'md:border-l-4 bg-white/20' : ''} py-5 font-bold md:px-10 px-4 text-white flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-all hover:md:border-l-4 hover:bg-white/20` }>
                            <svg xmlns="http://www.w3.org/2000/svg" width={ 20 } height={ 20 } fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                            </svg>
                            <span className="whitespace-nowrap truncate hidden md:block" title="Pengaturan">Keluar</span>
                        </div>
                    </div>
                </div>
                { children }
            </div>
            <Logout ref={ logoutRef } />
        </>
    );
}
