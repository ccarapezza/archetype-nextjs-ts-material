import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SetStateAction, useState } from 'react';
import { Card, CardContent, CardHeader, TextField, Button, IconButton, Box } from '@mui/material';
import { Container } from '@mui/system';
import Link from '@/src/components/Link';
import { userService } from '@/src/services';
import { useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

  

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
    const { status } = useSession();
    if(status === "authenticated") {
        console.log("Already authenticated. Redirecting...")
        router.push('/')
    }
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
        <Container className='bg-slate-200 flex items-center justify-center w-100 max-w-none'>
            <Card className='max-w-sm w-96'>
                <CardHeader title="Register" />
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <TextField size="small" {...register("username")} placeholder='Username' fullWidth/>
                            <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.username?.message}</small>
                        </div>
                        <div>
                            <TextField size="small" {...register("email")} placeholder='Email' fullWidth/>
                            <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.email?.message}</small>
                        </div>
                        <div>
                            <TextField size="small" {...register("password")} type="password" placeholder='Password' fullWidth/>
                            <small style={{color: "red", display: "block", marginBottom: "15px"}}>{errors.password?.message}</small>
                        </div>
                        <div>
                            <TextField size="small" {...register("cpassword")} type="password" placeholder='Confirm Password' fullWidth/>
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
                            <small>Have an account? <Link href={'/auth/sign-in'}>Sign In</Link></small>
                        </div>
                    </form>
                    <Box className="flex justify-end">
                        <Link href={'/'} >    
                            <IconButton className='mt-4'>
                                <FontAwesomeIcon href="/" icon={faHouse}/>
                            </IconButton>
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}