import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
    import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Guest>
            <Head title="Log in" />
            <div class="flex justify-center">
                <ApplicationLogo />
            </div>
            <div className="text-2xl font-semibold text-center mt-9">Masuk</div>
            <div className="text-gray-400 text-center">Silahkan masukan email dasdsdn password</div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit} className="mt-14">
                <div>
                    <Label forInput="email" value="EMAIL" />

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="w-full mt-2"
                        autoComplete="email"
                        isFocused={true}
                        handleChange={onHandleChange}
                        placeholder="Email Address"
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="PASSWORD" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full mt-2"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                        placeholder="Password"
                    />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <Button className="ml-4" processing={processing}>
                        Log in
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
