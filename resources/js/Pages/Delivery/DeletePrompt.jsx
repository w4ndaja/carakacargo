import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';

function DeletePrompt(props, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('Hapus data');
    const [data, setData] = useState({})
    useImperativeHandle(ref, () => ({
        show: data => {
            setTitle('Hapus Data ?');
            setData(data);
            setIsOpen(true);
        }
    }));
    const submit = e => {
        e.preventDefault();
        if (data.id) {
            return Inertia.visit(route('deliveries.destroy', data.id), { method: 'delete' });
        }
    };
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
                <div className="relative bg-gray-50 shadow-xl rounded-2xl max-w-sm mx-auto p-5 min-w-[420px]">
                    <Dialog.Title className="text-xl text-center mb-3 border-b pb-3">{title}</Dialog.Title>
                    <form onSubmit={submit}>
                        <div className="mb-3 flex justify-end gap-2">
                            <button onClick={() => setIsOpen(false)} type="button" role="button" className="px-3 py-1 bg-white text-indigo-700 border-indigo-700 shadow rounded">Batal</button>
                            <button type="submit" className="px-3 py-1 bg-indigo-700 text-white shadow rounded">Hapus</button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    </Transition>;
}
DeletePrompt = forwardRef(DeletePrompt);
export default DeletePrompt;