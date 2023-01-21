import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

function Form(props, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [title, setTitle] = useState('Tambah User');
    const { errors: _errors, roles } = usePage().props;
    const [errors, setErrors] = useState(_errors);
    const formRef = useRef();
    useImperativeHandle(ref, () => ({
        create: () => {
            setTitle('Tambah User');
            setData({});
            setIsOpen(true);
        },
        edit: data => {
            setTitle('Edit User');
            setData(data);
            setIsOpen(true);
        }
    }));
    const submit = e => {
        e.preventDefault();
        let form = new FormData(e.target);
        if (data.id) {
            form.append('_method', 'put');
            return Inertia.post(route('users.update', data.id), form);
        }
        return Inertia.post(route('users.store'), form, {
            onSuccess: success => {
                formRef.current.reset()
            }
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
                            <label htmlFor="input_email">Email</label>
                            <input name="email" defaultValue={ data.email } type="email" className={ `uppercase px-4 py-2 rounded shadow ${errors.email ? 'border-red-500' : ''}` } id="input_email" />
                            { errors.email && (<span className="text-red-500">{ errors.email }</span>) }
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_name">Nama</label>
                            <input name="name" defaultValue={ data.name } type="text" className={ `px-4 py-2 rounded shadow ${errors.name ? 'border-red-500' : ''}` } id="input_name" />
                            { errors.name && (<span className="text-red-500">{ errors.name }</span>) }
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_password">Password</label>
                            <input name="password" defaultValue={ `` } type="password" className={ `px-4 py-2 rounded shadow ${errors.password ? 'border-red-500' : ''}` } id="input_password" />
                            { errors.password && (<span className="text-red-500">{ errors.password }</span>) }
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_password_confirmation">Konfirmasi Password</label>
                            <input name="password_confirmation" defaultValue={ `` } type="password" className={ `px-4 py-2 rounded shadow ${errors.password_confirmation ? 'border-red-500' : ''}` } id="input_password_confirmation" />
                            { errors.password_confirmation && (<span className="text-red-500">{ errors.password_confirmation }</span>) }
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_role">Role</label>
                            <select name="role" defaultValue={ data.role } className={ `px-4 py-2 rounded shadow ${errors.role ? 'border-red-500' : ''}` } id="input_role" >
                                <option value="">Pilih Role</option>
                                <option value="Admin">Admin</option>
                            <option value="Kurir">Kurir</option>
                            </select>
                            { errors.role && (<span className="text-red-500">{ errors.role }</span>) }
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
