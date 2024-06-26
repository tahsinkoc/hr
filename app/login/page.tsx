'use client';
import { useEffect, useState } from 'react'
import { Alert, Button, TextField } from '@mui/material';
import Link from 'next/link';

type Props = {}
type alertType = {
    content: string,
    severity: string,
    open: boolean
}

function page({ }: Props) {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [alert, setAlert] = useState<alertType>({
        content: '',
        severity: 'success',
        open: false
    })


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

                if (res.status === 200) {
                    setAlert({
                        content: 'Giriş başarılı',
                        severity: 'success',
                        open: true
                    })
                    localStorage.setItem('auth', res.message)
                    setTimeout(() => {
                        setAlert({
                            content: '',
                            severity: '',
                            open: false
                        })
                    }, 2000);
                } else {
                    setAlert({
                        content: 'Kullanıcı adı veya şifre yanlış',
                        severity: 'error',
                        open: true
                    })

                    setTimeout(() => {
                        setAlert({
                            content: '',
                            severity: '',
                            open: false
                        })
                    }, 2000);
                }

                console.log(res);
            })
    }

    return (
        <div className='w-full overflow-y-hidden'>
            <title>Login</title>
            <div className='w-full flex items-center justify-center fixed top-0 z-50 py-10'>
                {
                    // @ts-ignore
                    alert.open && <Alert severity={alert.severity}>
                        {alert.content}
                    </Alert>
                }
            </div>
            <div className='relative top-0 w-full h-full'>
                <div className='flex xl:flex-row h-screen items-center justify-center xl:py-36 w-full'>
                    <div className='xl:w-5/12 w-full h-full flex items-center justify-center xl:px-24 px-4 bg-[rgba(240,242,245,.3)] backdrop-blur-2xl z-30 relative'>
                        <div className='w-full rounded-lg flex items-center justify-center flex-col'>
                            <div className='text-[3rem]'>
                                <img className='w-[20rem] my-8' src="/flexiwork.png" alt="" />
                            </div>
                            {/* sx={{ input: { color: 'white' } }} */}
                            <TextField color='warning' onChange={(e) => setUsername(e.target.value)} value={username} className='w-full my-2' sx={{ input: { borderColor: 'orange' } }} label="Kullanıcı Adı" variant="filled" />
                            <TextField color='warning' onChange={(e) => setPassword(e.target.value)} value={password} className='w-full my-2' label="Şifre" type='password' variant="filled" />
                            <Button onClick={Login} variant="contained" color='warning' size='large' className='w-full my-2 capitalize'>Giriş Yap</Button>
                            <div className='my-2'>
                                Hesabın yok mu? <Link className='text-[#fcba03]' href={'/register'}>
                                    Kayıt Ol
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute w-full h-full z-0 bottom-0'>
                    <div className='w-full h-full backdrop-blur-xl absolute bottom-0'></div>
                    <video className='xl:w-full w-auto xl:h-auto h-screen' src="/video.mp4" loop autoPlay muted></video>
                </div>
            </div>
        </div>
    )
}

export default page