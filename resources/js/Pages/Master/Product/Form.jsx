import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

function Form(props, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [title, setTitle] = useState('Tambah Barang');
    const { errors: _errors, categories } = usePage().props;
    const [errors, setErrors] = useState(_errors);
    useImperativeHandle(ref, () => ({
        create: () => {
            setTitle('Tambah Barang');
            setData({});
            setIsOpen(true);
        },
        edit: data => {
            setTitle('Edit Barang');
            setData(data);
            setIsOpen(true);
        }
    }));
    const submit = e => {
        e.preventDefault();
        let form = new FormData(e.target);
        if (data.id) {
            form.append('_method', 'put')
            return Inertia.post(route('products.update', data.id), form);
        }
        return Inertia.post(route('products.store'), form);
    };
    useEffect(() => {
        setErrors(_errors);
    }, [_errors]);
    useEffect(() => {
        setErrors({});
    }, [isOpen]);
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
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_code">Kode</label>
                            <input name="code" defaultValue={data.code} type="text" className={`uppercase px-4 py-2 rounded shadow ${errors.code ? 'border-red-500' : ''}`} id="input_code" />
                            {errors.code && (<span className="text-red-500">{errors.code}</span>)}
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_label">Label</label>
                            <input name="label" defaultValue={data.label} type="text" className={`px-4 py-2 rounded shadow ${errors.label ? 'border-red-500' : ''}`} id="input_label" />
                            {errors.label && (<span className="text-red-500">{errors.label}</span>)}
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_koli">Jumlah Koli</label>
                            <input name="koli" defaultValue={data.koli} type="number" className={`px-4 py-2 rounded shadow ${errors.koli ? 'border-red-500' : ''}`} id="input_koli" />
                            {errors.koli && (<span className="text-red-500">{errors.koli}</span>)}
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_length">Panjang</label>
                            <input name="length" defaultValue={data.length} type="number" className={`px-4 py-2 rounded shadow ${errors.length ? 'border-red-500' : ''}`} id="input_length" />
                            {errors.length && (<span className="text-red-500">{errors.length}</span>)}
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_width">Lebar</label>
                            <input name="width" defaultValue={data.width} type="number" className={`px-4 py-2 rounded shadow ${errors.width ? 'border-red-500' : ''}`} id="input_width" />
                            {errors.width && (<span className="text-red-500">{errors.width}</span>)}
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_height">Tinggi</label>
                            <input name="height" defaultValue={data.height} type="number" className={`px-4 py-2 rounded shadow ${errors.height ? 'border-red-500' : ''}`} id="input_height" />
                            {errors.height && (<span className="text-red-500">{errors.height}</span>)}
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_weight">Berat</label>
                            <input name="weight" defaultValue={data.weight} type="number" className={`px-4 py-2 rounded shadow ${errors.weight ? 'border-red-500' : ''}`} id="input_weight" />
                            {errors.weight && (<span className="text-red-500">{errors.weight}</span>)}
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_category_id">Kategori</label>
                            <select name="category_id" defaultValue={data.category_id} className={`px-4 py-2 rounded shadow ${errors.category_id ? 'border-red-500' : ''}`} id="input_category_id" >
                                <option value="">Pilih Kategori</option>
                                {categories.map((item, i) => (
                                    <option key={i} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {errors.category_id && (<span className="text-red-500">{errors.category_id}</span>)}
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
