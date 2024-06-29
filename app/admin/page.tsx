'use client';
import React, { useEffect, useState } from 'react';
import DrawerListe from '@/components/client/DrawerList';

import {
    Table,
    TableBody,
    TableHead,
    TableContainer,
    TableRow,
    TableCell,
    Paper,
    Button,
    Modal,
    Typography,
    Box,
    TextField,
    Tabs,
    Tab,
} from '@mui/material';

import ConfirmTable from '@/components/client/ConfirmTable';
import { AuthClient } from '@/components/client/Authentication';

type Props = {}

type fetchItem = {
    companyName: string,
    status: boolean,
    companyUserId: string,
    phone: string,
    mail: string,
    taxId: string
}

type fetchData = {
    data: [],
    status: number
}

function page({ }: Props) {

    useEffect(() => {
        AuthClient('admin', '/login-admin').then((res) => {
        })
    }, [])


    const [open, setOpen] = useState({
        open: false,
        content: true
    });


    const [tabi, setTabi] = useState<number>(0);

    function TabContent(index: number) {

        let divs = [
            <ConfirmTable />,
            <div className='w-full'>
                Content2
            </div>,
            <div className='w-full'>
                Content3
            </div>,
            <div className='w-full'>
                Content4
            </div>
        ]

        return divs[index]
    }


    return (
        <div className='bg-[rgba(149,152,158,.4)] min-h-screen'>
            <DrawerListe />
            <div className='px-4'>
                <div className='w-full'>
                    <Tabs indicatorColor='primary' textColor='primary' className='bg-white' value={tabi} onChange={(e, a) => setTabi(a)}>
                        <Tab label='Onay bekleyen Şirket hesapları' value={0} />
                        <Tab label='Spam Hesaplar' value={1} />
                        <Tab label='Onaylanmış Hesaplar' value={2} />
                    </Tabs>
                    <div className='my-3'>
                        {TabContent(tabi)}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default page