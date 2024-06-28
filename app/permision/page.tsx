import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
        <div className='w-full h-screen flex items-center justify-center flex-col'>
            <p className='text-3xl my-2'>Görünüşe göre buraya erişmeye yetkiniz yok.</p>
            <p className='text-2xl my-2'>Bir yanlışlık olduğunu düşünüyorsanız "Giriş Yapmayı" deneyebilirsiniz.</p>
            <div className='flex items-center'>
                <Link href={'/login'} className='my-2 mx-2'>
                    <Button variant='contained' color='warning'>Kullanıcı Girişi</Button>
                </Link>
                <Link href={'/login-admin'} className='my-2 mx-2'>
                    <Button variant='contained' color='primary'>Yönetici Girişi</Button>
                </Link>
            </div>
        </div>
    )
}

export default page