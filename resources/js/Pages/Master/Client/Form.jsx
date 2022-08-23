import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import axios from 'axios';

function Form(props, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [title, setTitle] = useState('Tambah Barang');
    const { errors: _errors, provinces } = usePage().props;
    const [errors, setErrors] = useState(_errors);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
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
            return Inertia.visit(route('products.update', data.id), { method: 'put', data: form });
        }
        return Inertia.post(route('products.store'), form);
    };

    const getCities = async e => {
        const province = e.target.value;
        try {
            const { data } = await axios.get(route('cities.by-province', province));
            setCities(data);
        } catch (e) {
            console.log(e);
            setCities([]);
        }
    };

    const getDistricts = async e => {
        const city = e.target.value;
        try {
            const { data } = await axios.get(route('districts.by-city', city));
            setDistricts(data);
        } catch (e) {
            setDistricts([]);
            console.log(e);
        }
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
                            <label htmlFor="input_name">Nama</label>
                            <input name="name" defaultValue={data.name} type="text" className={`px-4 py-2 rounded shadow ${errors.name ? 'border-red-500' : ''}`} id="input_name" />
                            {errors.name && (<span className="text-red-500">{errors.name}</span>)}
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_phone">HP</label>
                            <input name="phone" defaultValue={data.phone} type="text" className={`px-4 py-2 rounded shadow ${errors.phone ? 'border-red-500' : ''}`} id="input_phone" />
                            {errors.phone && (<span className="text-red-500">{errors.phone}</span>)}
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_province_id">Provinsi</label>
                            <select name="province_id" onChange={getCities} defaultValue={data.province_id} className={`px-4 py-2 rounded shadow ${errors.province_id ? 'border-red-500' : ''}`} id="input_province_id" >
                                <option value="">Pilih Provinsi</option>
                                {provinces.map((item, i) => (
                                    <option key={i} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {errors.province_id && (<span className="text-red-500">{errors.province_id}</span>)}
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_city_id">Kota/Kabupaten</label>
                            <select name="city_id" onChange={getDistricts} defaultValue={data.city_id} className={`px-4 py-2 rounded shadow ${errors.city_id ? 'border-red-500' : ''}`} id="input_city_id" >
                                <option value="">Pilih Kota</option>
                                {cities.map((item, i) => (
                                    <option key={i} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {errors.city_id && (<span className="text-red-500">{errors.city_id}</span>)}
                        </div>
                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_district_id">Kecamatan</label>
                            <select name="district_id" defaultValue={data.district_id} className={`px-4 py-2 rounded shadow ${errors.district_id ? 'border-red-500' : ''}`} id="input_district_id" >
                                {districts.map((item, i) => (
                                    <option key={i} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {errors.district_id && (<span className="text-red-500">{errors.district_id}</span>)}
                        </div>

                        <div className="mb-3 flex flex-col gap-2">
                            <label htmlFor="input_address">Alamat</label>
                            <textarea name="address" defaultValue={data.address} type="text" className={`px-4 py-2 rounded shadow ${errors.address ? 'border-red-500' : ''}`} id="input_address" />
                            {errors.address && (<span className="text-red-500">{errors.address}</span>)}
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