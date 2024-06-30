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
import AuthProvider from '@/components/client/AuthProvider';

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

    const [open, setOpen] = useState({
        open: false,
        content: true
    });


    const [tabi, setTabi] = useState<number>(0);
    const [trgt, setTrgt] = useState({
        spam: false,
        status: false
    })
    function TabContent(index: number) {
        console.log(index);
        setTabi(index)

        let stats = [
            { spam: false, status: false },
            { spam: true, status: false },
            { spam: false, status: true }
        ]

        setTrgt(stats[index])
        // return divs[index]
    }


    return (
        <AuthProvider role='admin' direction='/login-admin'>
            <div className='bg-[rgba(149,152,158,.4)] min-h-screen'>
                <DrawerListe />
                <div className='px-4'>
                    <div className='w-full'>
                        <Tabs indicatorColor='primary' textColor='primary' className='bg-white' value={tabi} onChange={(e, a) => TabContent(a)}>
                            <Tab label='Onay bekleyen Şirket hesapları' value={0} />
                            <Tab label='Spam Hesaplar' value={1} />
                            <Tab label='Onaylanmış Hesaplar' value={2} />
                        </Tabs>
                        <div className='my-3'>
                            <ConfirmTable status={trgt.status.toString()} spam={trgt.spam.toString()} />
                            {/* {TabContent(tabi)} */}
                        </div>
                    </div>


                </div>
            </div>
        </AuthProvider>
    )
}

export default page