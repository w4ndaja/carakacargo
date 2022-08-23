import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { debounce } from 'lodash';
import React, { useCallback, useRef, useState } from 'react';
import Form from './Form';

export default function Product({ products }) {
  const { flash } = usePage().props;
  const formRef = useRef();
  const [search, setSearch] = useState('');
  const _searchData = useCallback(debounce(value => {
    Inertia.reload({ data: { search : value }, replace: true });
  }, 150), []);
  const create = e => {
    e.preventDefault();
    formRef.current.create();
  };

  const searchData = e => {
    setSearch(e.target.value);
    _searchData(e.target.value);
  };

  const edit = (e, data) => {
    e.preventDefault();
    formRef.current.edit(data);
  };

  const destroy = (e, data) => {
    e.preventDefault();
    // formRef
    if (confirm('Delete?')) {
      alert('hilang cuk');
    }
  };
  return (
    <>
      <Head title="Carakacargo -  Pengiriman" />

      <div className="p-10 flex-1 min-h-max flex flex-col pb-20 md:pb-10">
        <div className="text-3xl font-semibold text-indigo-900">Pengiriman Barang</div>
        <div className="text-gray-600 mt-2">List Pengiriman Barang</div>
        <div className="flex items-center justify-between mt-6">
          <div className="relative flex items-center">
            <label className='absolute left-3 z-20' htmlFor="input_search">
              <svg className="fill-gray-400" xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </label>
            <input id="input_search" value={search} onChange={searchData} type="text" className="z-10 text-gray-600 pl-10 pr-4 py-2 border rounded-xl max-w-[20px] focus:max-w-[200px] focus:md:max-w-max transition-width absolute left-0 md:max-w-max" />
          </div>
          <div className="flex gap-3">
            <button onClick={create} className="bg-green-500 px-4 py-2 rounded-xl text-white hover:-translate-x-1 transition">Tambah</button>
          </div>
        </div>
        <div className="border rounded-xl mt-5 flex-1 mb-5">
          <table className='w-full'>
            <thead>
              <tr>
                <th className='border-r last:border-r-0 border-b py-2'>Kode</th>
                <th className='border-r last:border-r-0 border-b py-2'>Nama</th>
                <th className='border-r last:border-r-0 border-b py-2'>Kategori</th>
                <th className='border-r last:border-r-0 border-b py-2'>Deskripsi</th>
                <th className='border-r last:border-r-0 border-b py-2'>#</th>
              </tr>
            </thead>
            <tbody>
              {products.data.map((item, i) => (
                <tr key={i}>
                  <th className='border-r last:border-r-0 border-b py-2'>{item.code}</th>
                  <th className='border-r last:border-r-0 border-b py-2'>{item.name}</th>
                  <th className='border-r last:border-r-0 border-b py-2'>{item.category?.name}</th>
                  <th className='border-r last:border-r-0 border-b py-2'>{item.description}</th>
                  <th className='border-r last:border-r-0 border-b py-2'>
                    <button role="button" type="button" onClick={e => edit(e, item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                      </svg>
                    </button>
                    <button role="button" type="button" onClick={e => destroy(e, item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16">
                        <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
                      </svg>
                    </button>
                  </th>
                </tr>
              ))}
              {products.total == 0 && <tr><td colSpan={999} className="text-center px-4 py-2 text-indigo-300 text-xl">
                <div className="flex flex-col items-center mt-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} fill="currentColor" className="bi bi-bag-dash" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                  <span className="mt-5"> Data Kosong... </span>
                </div>
              </td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex mt-auto">
          {products.links.map(item => <Link href={item.url} className="bg-indigo-600 text-white px-4 py-2 first:rounded-l-xl last:rounded-r-xl hover:bg-indigo-500" dangerouslySetInnerHTML={{ __html: item.label }}></Link>)}
        </div>
      </div>
      <Form ref={formRef} />
    </>
  );
}
Product.layout = page => <Authenticated >{page}</Authenticated>;
