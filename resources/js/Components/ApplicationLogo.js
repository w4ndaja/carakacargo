import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
export default function ApplicationLogo({ className }) {
    const { logo } = usePage().props;
    return (
        <>
            <img src={logo} className={className} alt="No Image" />
        </>
    );
}
