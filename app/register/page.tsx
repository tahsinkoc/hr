'use client';
import { useEffect, useState } from 'react'
import { Button, TextField, Tab, Tabs } from '@mui/material';

import Link from 'next/link';
type Props = {}

function page({ }: Props) {


  const [RegisterForm, setRegisterForm] = useState<RegisterInfo>({
    mail: '',
    number: '',
    name: '',
    password: '',
    surname: '',
    username: ''
  });


  const handleChange = (e: any) => {
  }


  const Login = () => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ RegisterForm })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
  }

  return (
    <div className='w-full h-screen'>
      <title>Kayıt Ol</title>
      <div className='absolute top-0 left-0 backdrop-blur-xl w-full h-full flex items-center justify-start z-50'>
        <div className='bg-[rgba(240,242,245,.3)] backdrop-blur-2xl h-full w-6/12 overflow-y-scroll hidesc px-10 z-50 flex items-center justify-center flex-col'>
          <TextField color='warning' className='w-full my-2' sx={{ input: { borderColor: 'orange' } }} label="Kullanıcı Adı" variant="filled" />
          <TextField color='warning' className='w-full my-2' label="Şifre" type='password' variant="filled" />
          <Button onClick={Login} variant="contained" color='warning' size='large' className='w-full my-2 capitalize'>Giriş Yap</Button>
          <div className='my-2'>
            Hesabın yok mu? <Link className='text-[#fcba03]' href={'/register'}>
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
      <video className='h-screen w-full object-fill z-5' src="/video.mp4" loop autoPlay muted></video>
    </div >
  )
}

export default page