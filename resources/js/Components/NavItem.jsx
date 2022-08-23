import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';

export default function NavItem({ content, items = null, href = null, active = false }) {
    const [open, setOpen] = useState(false);
    const toggleOpen = e => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(open => !open);
        if(href){
            Inertia.visit(href)
        }
    };
    return (
        <>
            <div onClick={toggleOpen} className={`relative font-bold text-white cursor-pointer transition-all ${(!items || !open) && 'hover:translate-x-1 hover:md:border-l-4 hover:bg-white/20'} ${(active && !items) && 'md:border-l-4 md:bg-white/20'}`}>
                <div className="flex items-center gap-4 py-5 md:px-10 px-4">
                    {content}
                    {items && <svg className={`ml-auto transition-all ${(open || active) ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>}
                </div>
                <div className={`overflow-hidden transition-height md:relative md:bottom-0 md:bg-transparent md:rounded-t-none absolute bottom-[60px] rounded-t-xl bg-indigo-700 ${(open) ? 'max-h-96' : 'max-h-0'}`}>
                    {items}
                </div>
            </div>
        </>
    );
}
