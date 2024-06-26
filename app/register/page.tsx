'use client';
import { useEffect, useState } from 'react'
import { Button, TextField, Tab, Tabs, Alert } from '@mui/material';

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

  const [alert, setAlert] = useState({
    content: '',
    severity: 'success',
    open: false
  })
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const Register = (e: any) => {
    e.preventDefault();
    fetch('/api/register', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(RegisterForm)
    })
      .then(res => res.json())
      .then(res => {

        if (res.status === 200) {
          setAlert({
            content: 'Kayıt işlemi başarılı',
            severity: 'success',
            open: true
          })

          setTimeout(() => {
            setAlert({
              content: '',
              severity: '',
              open: false
            })
          }, 2000);
        } else {
          setAlert({
            content: 'Kayıt işlemi başarısız',
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
    <div className='w-full h-screen'>
      <title>Kayıt Ol</title>
      {
        // @ts-ignore
        alert.open && <Alert severity={alert.severity}>
          {alert.content}
        </Alert>
      }
      <div className='absolute top-0 left-0 backdrop-blur-xl w-full h-full flex items-center justify-center xl:py-32 py-0 z-50'>
        <div className='bg-[rgba(240,242,245,.3)] backdrop-blur-[20rem] min-h-full xl:w-6/12 w-full overflow-y-scroll hidesc px-10 py-4 z-50'>
          <div className='w-full flex items-center justify-between'>
            <img className='w-[20rem] my-4' src="/flexiwork.png" alt="" />
            <p className='text-xl text xl:block hidden txshadow'>Kullanıcı kayıt formu</p>
          </div>
          <form onSubmit={Register}>
            <TextField required onChange={handleChange} name='name' value={RegisterForm.name} color='warning' className='w-full my-2' label="İsim" variant="filled" />
            <TextField required onChange={handleChange} name='surname' value={RegisterForm.surname} color='warning' className='w-full my-2' label="Soyisim" variant="filled" />
            <TextField required onChange={handleChange} name='username' value={RegisterForm.username} color='warning' className='w-full my-2' label="Kullanıcı adı" variant="filled" />
            <TextField type='email' required onChange={handleChange} name='mail' value={RegisterForm.mail} color='warning' className='w-full my-2' label="Mail" variant="filled" />
            <TextField type='tel' inputProps={{ maxLength: 11 }} required onChange={handleChange} name='number' value={RegisterForm.number} color='warning' className='w-full my-2' label="Telefon numarası 05xxx" variant="filled" />
            <TextField inputProps={{ minLength: 8 }} required onChange={handleChange} name='password' value={RegisterForm.password} color={RegisterForm.password === passwordConfirm ? 'warning' : 'error'} className='w-full my-2' label="Şifre" type='password' variant="filled" />
            <TextField inputProps={{ minLength: 8 }} required onChange={(e) => { setPasswordConfirm(e.target.value) }} value={passwordConfirm} color={RegisterForm.password === passwordConfirm ? 'warning' : 'error'} className='w-full my-2' label="Şifre Onay" type='password' variant="filled" />
            <Button disabled={RegisterForm.password === passwordConfirm ? false : true} type='submit' variant="contained" color='warning' size='large' className='w-full my-2 capitalize'>
              {RegisterForm.password === passwordConfirm ? 'Kayıt ol' : 'Şifrelere aynı değil'}
            </Button>
          </form>
          <div className='my-2 w-full'>
            Zaten hesabın var mı? <Link className='text-[#fcba03]' href={'/login'}>
              Giriş yap
            </Link>
          </div>
        </div>
      </div>
      <video className='h-screen w-full object-fill z-5' src="/video.mp4" loop autoPlay muted></video>
    </div >
  )
}

export default page