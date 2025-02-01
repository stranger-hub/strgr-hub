import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { LoginSchema } from '@/schemas';
import FormToast from './FormToast';
import { login } from '@/actions/login';

export default function LoginForm({ isPending, startTransition }: { isPending: boolean, startTransition: any }) {
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [feedback, setFeedback] = useState<{
        error?: boolean
        msg?: string
    }>();

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        startTransition(true);
        setFeedback({
            error: undefined,
            msg: undefined,
        });

        const result: { error: boolean, msg: string } = await login(data);

        if(result) {
            setFeedback(result);
        }
        startTransition(false);
    };

    return (
        <div className="grid grid-cols-1 gap-5 md:w-[30vw]">
            
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5">
                <div className="col-span-1">
                    <label className="input input-bordered input-md flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            type="text"
                            className="grow"
                            placeholder="Email"
                            {...register("email")}
                            disabled={isPending}
                        />
                    </label>
                    {errors.email && <ErrorMsg msg={errors.email.message} />}
                </div>

                <div className="col-span-1">
                    <label className="input input-bordered input-md flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input
                            type="password"
                            className="grow"
                            placeholder="Password"
                            {...register("password")}
                            disabled={isPending}
                        />
                    </label>
                    {errors.password && <ErrorMsg msg={errors.password.message} />}
                </div>
                <FormToast {...feedback} />
                <button disabled={isPending} type="submit" className="col-span-1 btn btn-primary text-white">Login</button>
            </form>
        </div>
    );
}

function ErrorMsg( { msg }: { msg: string | undefined }) {
    return (
        <p className="text-primary text-sm text-left mt-1">{msg}</p>
    )
}
