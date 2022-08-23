import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from '@inertiajs/inertia-react';

function Logout(props, ref) {
    const [isOpen, setIsOpen] = useState(false);
    useImperativeHandle(ref, () => ({
        show: () => setIsOpen(true),
        hide: () => setIsOpen(false),
    }));
    return <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0">
        <Dialog {...props} open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                <div className="relative bg-gray-50 shadow-xl rounded-2xl max-w-sm mx-auto p-5">
                    <Dialog.Title className="text-xl text-center">Keluar?</Dialog.Title>
                    <Dialog.Description className="mt-6 px-6 py-3 bg-yellow-200 rounded-xl">
                        Apakah anda yakin ingin keluar?
                    </Dialog.Description>

                    <div className="flex justify-end mt-4 gap-4">
                        <button className='text-gray-500 px-4 py-2 border rounded-md hover:shadow transition' onClick={() => setIsOpen(false)}>Batal</button>
                        <Link href="/logout" method='post' className='flex items-center gap-3 bg-red-500 px-4 py-2 rounded-md hover:shadow hover:translate-x-1 transition text-white' onClick={() => setIsOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                            </svg>
                            <span>Keluar</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Dialog>
    </Transition>;
}
Logout = forwardRef(Logout);
export default Logout;