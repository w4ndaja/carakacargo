import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

function Form(props, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [title, setTitle] = useState('Tambah Kurir');
    const { errors: _errors, users, vehicles } = usePage().props;
    const [errors, setErrors] = useState(_errors);
    const formRef = useRef();
    useImperativeHandle(ref, () => ({
        create: () => {
            setTitle('Tambah Kurir');
            setData({});
            setIsOpen(true);
        },
        edit: data => {
            setTitle('Edit Kurir');
            setData(data);
            setIsOpen(true);
        }
    }));
    const submit = e => {
        e.preventDefault();
        let form = new FormData(e.target);
        if (data.id) {
            form.append('_method', 'put');
            return Inertia.post(route('drivers.update', data.id), form);
        }
        return Inertia.post(route('drivers.store'), form, {
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
                            <label htmlFor="input_user_id">Akun</label>
                            <select name="user_id" defaultValue={ data.user_id } type="text" className={ `uppercase px-4 py-2 rounded shadow ${errors.user_id ? 'border-red-500' : ''}` } id="input_user_id" >
                                <option value="">Pilih Akun</option>
                                { users.map((user, i) => (
                                    <option key={ i } value={ user.id }>{ user.name }</option>
                                )) }
                            </select>
                            { errors.user_id && (<span className="text-red-500">{ errors.user_id }</span>) }
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_vehicle_id">Kendaraan</label>
                            <select name="vehicle_id" defaultValue={ data.vehicle_id } type="text" className={ `px-4 py-2 rounded shadow ${errors.vehicle_id ? 'border-red-500' : ''}` } id="input_vehicle_id" >
                                <option value="" selected disabled>Pilih Kendaraan</option>
                                <option value="">Kosong</option>
                                { vehicles.map((vehicle, i) => (
                                    <option key={i} value={ vehicle.id }>{ vehicle.code }</option>
                                )) }
                            </select>
                            { errors.vehicle_id && (<span className="text-red-500">{ errors.vehicle_id }</span>) }
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_license_type">SIM</label>
                            <input name="license_type" defaultValue={ data.license_type } license_type="text" className={ `px-4 py-2 rounded shadow ${errors.license_type ? 'border-red-500' : ''}` } id="input_license_type" />
                            { errors.license_type && (<span className="text-red-500">{ errors.license_type }</span>) }
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_license_valid_until">Masa Berlaku SIM</label>
                            <input name="license_valid_until" defaultValue={ data.license_valid_until } type="date" className={ `px-4 py-2 rounded shadow ${errors.license_valid_until ? 'border-red-500' : ''}` } id="input_license_valid_until" />
                            { errors.license_valid_until && (<span className="text-red-500">{ errors.license_valid_until }</span>) }
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
