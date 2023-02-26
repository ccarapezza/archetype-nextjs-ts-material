'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from 'react';

interface IRegisterForm {
    username: string,
    email: string,
    password: string,
    cpassword: string
}

const schema = yup.object({
    username: yup.string().min(3).max(20).required(),
    email: yup.string().email().min(3).max(50).required(),
    password: yup.string().min(3).max(20).required(),
    cpassword: yup.string().min(3).max(20).required()
}).required();

export default function Register(){
    const router = useRouter();
    const [error, setError] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<IRegisterForm>({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data: IRegisterForm) => {
        const options = {
            method: "POST",
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
        setIsFetching(true);
        await fetch('http://localhost:3000/api/auth/signup', options)
        .then(async res => {
            const response = await res.json();
            if(res.ok){
                if(response){
                    router.push('http://localhost:3000')
                }
            }else{
                setError(response.message)
            }
        });
        setIsFetching(false);
    };

    return (
        <section>
            <div>
                <h1>Register</h1>
            </div>
            {isFetching&&
                <div>Loading...</div>
            }
            {!isFetching&&
                <form onSubmit={handleSubmit(onSubmit)}>
                    {error&&
                        <small style={{color: "red", display: "block", margin: "15px"}}>{error}</small>
                    }
                    <div>
                        <input {...register("username")} placeholder='Username' />
                        <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.username?.message}</small>
                    </div>
                    <div>
                        <input {...register("email")} placeholder='Email' />
                        <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.email?.message}</small>
                    </div>
                    <div>
                        <input {...register("password")}  type="password" placeholder='Password'/>
                        <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.password?.message}</small>
                    </div>
                    <div>
                        <input {...register("cpassword")}  type="password" placeholder='Confirm Password'/>
                        <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.cpassword?.message}</small>
                    </div>
                    <div>
                        <button type='submit'>
                            Sign Up
                        </button>
                    </div>
                </form>
            }
            <div>
                <small>Have an account? <Link href={'/auth/signin'}>Sign In</Link></small>
            </div>
        </section>
    )
}