import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SetStateAction, useState } from 'react';
import { Card, CardContent, CardHeader, TextField, Button } from '@mui/material';
import { Container } from '@mui/system';
import Link from '@/src/components/Link';
import { userService } from '@/src/services';

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
        if(data.password!==data.cpassword){
            setError("Password and Confirm Password must be same");
            return;
        }
        setIsFetching(true);
        userService.register({
            username: data.username,
            email: data.email,
            password: data.password
        }).then(() => {
            router.push('http://localhost:3000')
        }).catch((err: { message: SetStateAction<string>; }) => {
            console.error(err);
            setError(err.message);
        }).finally(() => {
            setIsFetching(false);
        });
    };

    return (
        <Container maxWidth="lg">
            <Card className='m-2'>
                <CardHeader title="Register" />
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <TextField size="small" {...register("username")} placeholder='Username' />
                            <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.username?.message}</small>
                        </div>
                        <div>
                            <TextField size="small" {...register("email")} placeholder='Email' />
                            <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.email?.message}</small>
                        </div>
                        <div>
                            <TextField size="small" {...register("password")} type="password" placeholder='Password' />
                            <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.password?.message}</small>
                        </div>
                        <div>
                            <TextField size="small" {...register("cpassword")} type="password" placeholder='Confirm Password' />
                            <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.cpassword?.message}</small>
                        </div>

                        <div>
                            <Button
                                type='submit'
                                className='mb-2 self-center w-fit'
                                variant='outlined'
                                color='secondary'>
                                Sign Up
                            </Button>
                        </div>
                        <div>
                            <small>Have an account? <Link href={'/auth/signin'}>Sign In</Link></small>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )
}