import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

function Form(props, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [title, setTitle] = useState('Tambah Kategori');
    const { errors: _errors } = usePage().props;
    const [errors, setErrors] = useState(_errors);
    const formRef = useRef();
    useImperativeHandle(ref, () => ({
        create: () => {
            setTitle('Tambah Kategori');
            setData({});
            setIsOpen(true);
        },
        edit: data => {
            setTitle('Edit Kategori');
            setData(data);
            setIsOpen(true);
        }
    }));
    const submit = e => {
        e.preventDefault();
        let form = new FormData(e.target);
        if (data.id) {
            form.append('_method', 'put');
            return Inertia.post(route('categories.update', data.id), form);
        }
        return Inertia.post(route('categories.store'), form, {
            onSuccess: () => formRef.current.reset()
        });
    };
    useEffect(() => {
        setErrors(_errors);
    }, [_errors]);
    useEffect(() => {
        setErrors({});
    }, [isOpen]);
    return <Transition
        show={ isOpen }
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0">
        <Dialog { ...props } open={ isOpen } onClose={ () => setIsOpen(false) } className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                <div className="relative bg-gray-50 shadow-xl rounded-2xl max-w-sm mx-auto p-5 min-w-[420px]">
                    <Dialog.Title className="text-xl text-center mb-3 border-b pb-3">{ title }</Dialog.Title>
                    <form onSubmit={ submit } ref={ formRef }>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_code">Kode</label>
                            <input name="code" defaultValue={ data.code } type="text" className={ `uppercase px-4 py-2 rounded shadow ${errors.code ? 'border-red-500' : ''}` } id="input_code" />
                            { errors.code && (<span className="text-red-500">{ errors.code }</span>) }
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_name">Nama</label>
                            <input name="name" defaultValue={ data.name } type="text" className={ `px-4 py-2 rounded shadow ${errors.name ? 'border-red-500' : ''}` } id="input_name" />
                            { errors.name && (<span className="text-red-500">{ errors.name }</span>) }
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_description">Deskripsi</label>
                            <textarea name="description" defaultValue={ data.description } type="text" className={ `px-4 py-2 rounded shadow ${errors.description ? 'border-red-500' : ''}` } id="input_description" />
                            { errors.description && (<span className="text-red-500">{ errors.description }</span>) }
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <button type="submit" className="px-3 py-1 bg-indigo-700 text-white shadow rounded">Kirim</button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    </Transition>;
}
Form = forwardRef(Form);
export default Form;
