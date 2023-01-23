import Authenticated from '@/Layouts/Authenticated'
import { Inertia } from '@inertiajs/inertia'
import { Head, Link, usePage } from '@inertiajs/inertia-react'
import { debounce } from 'lodash'
import React, { useCallback, useRef, useState } from 'react'
import DeletePrompt from './DeletePrompt'
import Form from './Form'
import RowVehicle from './RowVehicle';

export default function Vehicle({ vehicles }) {
  const { flash } = usePage().props
  const formRef = useRef()
  const deletePromptRef = useRef()
  const [search, setSearch] = useState('')

  const _searchData = useCallback(debounce(value => {
    Inertia.reload({ data: { search : value }, replace: true })
  }, 150), [])

  const create = e => {
    e.preventDefault()
    formRef.current.create()
  }

  const searchData = e => {
    setSearch(e.target.value)
    _searchData(e.target.value)
  }

  const edit = (e, data) => {
    e.preventDefault()
    formRef.current.edit(data)
  }

  const destroy = (e, data) => {
    e.preventDefault()
    deletePromptRef.current.show(data)
  }

  const title = ['Master', 'Piece']

  return (
    <>
      <Head title="Carakacargo - Kendaraan" />

      <div className="p-10 flex-1 min-h-max flex flex-col pb-20 md:pb-10 overflow-auto">
        <div className="text-3xl font-semibold text-indigo-900">Kendaraan</div>
        <div className="text-gray-600 mt-2">Master Data Kendaraan</div>
        <div className="flex items-center justify-between mt-6">
          <div className="relative flex items-center">
            <label className='absolute left-3 z-10' htmlFor="input_search">
              <svg className="fill-gray-400" xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </label>
            <input id="input_search" value={search} onChange={searchData} type="text" className="text-gray-600 pl-10 pr-4 py-2 border rounded-xl max-w-[20px] focus:max-w-[200px] focus:md:max-w-max transition-width absolute left-0 md:max-w-max" />
          </div>
          <div className="flex gap-3">
            <button onClick={create} className="bg-green-500 px-4 py-2 rounded-xl text-white hover:-translate-x-1 transition">Tambah</button>
          </div>
        </div>
        <div className="border rounded-xl mt-5 flex-1 mb-5 overflow-auto">
          <table className='w-full'>
            <thead>
              <tr>
                <th className='whitespace-nowrap border-r last:border-r-0 border-b p-2'>Kode</th>
                <th className='whitespace-nowrap border-r last:border-r-0 border-b p-2'>Merk</th>
                <th className='whitespace-nowrap border-r last:border-r-0 border-b p-2'>Tipe</th>
                <th className='whitespace-nowrap border-r last:border-r-0 border-b p-2'>No Pol</th>
                <th className='whitespace-nowrap border-r last:border-r-0 border-b p-2'>Tahun</th>
                <th className='whitespace-nowrap border-r last:border-r-0 border-b p-2'>Masa Berlaku STNK</th>
                <th className='whitespace-nowrap border-r last:border-r-0 border-b p-2'>Masa Berlaku KIR</th>
                <th className='border-r last:border-r-0 border-b p-2'>#</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.data.map((item, i) => (
                <RowVehicle item={item} edit={edit} destroy={destroy} key={i} />
              ))}
              {vehicles.total == 0 && <tr><td colSpan={999} className="text-center px-4 py-2 text-indigo-300 text-xl">
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
          {vehicles.links.map(item => <Link href={item.url} className="bg-indigo-600 text-white px-4 py-2 first:rounded-l-xl last:rounded-r-xl hover:bg-indigo-500" dangerouslySetInnerHTML={{ __html: item.label }}></Link>)}
        </div>
      </div>
      <Form ref={formRef} />
      <DeletePrompt ref={deletePromptRef} />
    </>
  )
}
Vehicle.layout = page => <Authenticated >{page}</Authenticated>
