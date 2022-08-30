import React from 'react'
import { Link, usePage } from '@inertiajs/inertia-react'

export default function Guest({ children }) {
    const { props: { bgLogin } } = usePage()
    return (
        <div className="grid grid-cols-4 min-h-screen">
            <div className="col-span-4 md:col-span-3 min-h-screen overflow-hidden">
                <img className='h-full' src={bgLogin} alt="" />
            </div>
            <div className="absolute md:relative bg-white/90 w-full mt-6 px-6 py-8 md:bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    )
}
