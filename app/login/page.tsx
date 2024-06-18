'use client';
import { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
type Props = {}

function page({ }: Props) {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const Login = () => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }

    return (
        <div className='w-full flex xl:flex-row h-screen items-center justify-between'>
            <title>Login</title>
            <div className='xl:w-5/12 w-full h-full flex items-center justify-center px-24'>
                <div className='w-full'>
                    <div className='text-[3rem]'>
                        <img className='w-[20rem] mb-4' src="/flexiwork.png" alt="" />
                    </div>
                    <TextField onChange={(e) => setUsername(e.target.value)} value={username} id="filled-basic" className='w-full my-2' label="Kullanıcı Adı" variant="filled" />
                    <TextField onChange={(e) => setPassword(e.target.value)} value={password} id="filled-basic" className='w-full my-2' label="Şifre" type='password' variant="filled" />
                    <Button onClick={Login} variant="contained" size='large' className='w-full my-2'>Giriş Yap</Button>
                    <div className='my-2'>
                        Hesabın yok mu? <Link className='text-blue-500' href={'/register'}>
                            Kayıt Ol
                        </Link>
                    </div>
                </div>
            </div>
            <div className='bg-green-400 xl:w-7/12 w-full h-full xl:flex hidden shdd rounded-l-[3rem]'>
                <img className='w-full h-auto rounded-l-[3rem]' src="https://www.ikea.com/images/an-ikea-co-worker-in-the-swedish-restaurant-serving-a-plate--1a2e8a8d4a9807b0de265ffbe9ddd9bf.jpg?f=xl" alt="" />
            </div>
        </div>
    )
}

export default page