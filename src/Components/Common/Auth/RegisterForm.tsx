import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { RegisterSchema } from '@/schemas';
import { signup } from '@/actions/register';
import FormToast from './FormToast';

export default function RegisterForm({ isPending, startTransition }: { isPending: boolean, startTransition: any }) {
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            // dob: "",
            gender: "",
            country: "",
        },
    });

    const [feedback, setFeedback] = useState<{
        error?: boolean
        msg?: string
    }>();

    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        startTransition(async () => {
            setFeedback({
                error: undefined,
                msg: undefined,
            });
    
            const result: { error: boolean, msg: string } = await signup(data);

            setFeedback(result);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5 w-[50vw]">
            <div className="col-span-1">
                <label className="input input-bordered input-md flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input disabled={isPending} type="text" placeholder="Username" {...register("username")} className="grow" />
                </label>
                {errors.username && <ErrorMsg msg={errors.username.message} />}
            </div>

            <div className="col-span-1">
                <label className="input input-bordered input-md flex items-center gap-2 col-span-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input disabled={isPending} type="text" placeholder="Email" {...register("email")} className="grow" />
                </label>
                {errors.email && <ErrorMsg msg={errors.email.message} />}
            </div>

            <div className="col-span-1">
                <label className="input input-bordered input-md flex items-center gap-2 col-span-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                    </svg>
                    <input disabled={isPending} type="password" placeholder="Password" {...register("password")} className="grow" />
                </label>
                {errors.password && <ErrorMsg msg={errors.password.message} />}
            </div>

            {/* <div className="col-span-1">
                <label className="input input-bordered input-md flex items-center gap-2 col-span-1">
                    <input disabled={isPending} type="date" placeholder="Date of birth" {...register("dob")} className="grow" />
                </label>
                {errors.dob && <ErrorMsg msg={errors.dob.message} />}
            </div> */}

            <div className="col-span-1">
                <select  disabled={isPending} className="select w-full input-bordered" {...register("gender")}>
                    <option disabled selected value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                </select>
                {errors.gender && <ErrorMsg msg={errors.gender.message} />}
            </div>

            <div className="col-span-1">
                <select disabled={isPending} className="select w-full input-bordered" {...register("country")}>
                    <option disabled selected value="">Select Country</option>
                    <option value="country1">Country 1</option>
                    <option value="country2">Country 2</option>
                </select>
                {errors.country && <ErrorMsg msg={errors.country.message} />}
            </div>

            <div className="col-span-2">
                <FormToast {...feedback} />
            </div>
            <button type="submit" className="col-span-2 btn btn-primary text-white">Register</button>
        </form>
    );
}

function ErrorMsg( { msg }: { msg: string | undefined }) {
    return (
        <p className="text-primary text-sm text-left mt-1">{msg}</p>
    )
}
