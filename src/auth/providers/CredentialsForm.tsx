import React from 'react'
import { signIn } from "next-auth/react"
import { ClientSafeProvider } from "next-auth/react/types"
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

interface IRegisterForm {
    username: string,
    password: string,
}

const schema = yup.object({
    username: yup.string().min(3).max(20).required(),
    password: yup.string().min(3).max(20).required()
}).required();

export default function CredentialsForm({ provider }: { provider: ClientSafeProvider } ) {
    const searchParams = useSearchParams();
    const [errorParam, setErrorParam] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm<IRegisterForm>({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data: IRegisterForm) => {
        signIn(provider.id, { username: data.username, password: data.password });
    };
    useEffect(() => {
        if(searchParams.get("error")){
            setErrorParam(searchParams.get("error")!);
        }
    }, [setErrorParam, searchParams])
    
    return (<>
        {errorParam&&
            <small style={{color: "red", display: "block", margin: "15px"}}>Usuario y/o contraseña incorrectos</small>
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input {...register("username")} type="text" placeholder='Username'/>
                <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.username?.message}</small>
            </div>
            <div>
                <input {...register("password")} type="password" placeholder='Password'/>
                <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.password?.message}</small>
            </div>
            <div>
                <button type='submit'>
                    <FontAwesomeIcon icon={faKey} /> Sign in
                </button>
            </div>
            <div>
                <small>Haven't an account? <Link href={'/auth/register'}>Sign Up</Link></small>
            </div>
        </form>  
    </>)
}
