'use client';
import React, { useState, useEffect } from 'react'

type Props = {
    spam: string,
    status: string
}
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
    Skeleton
} from '@mui/material';

type fetchData = {
    data: [],
    status: number
}


type fetchItem = {
    companyName: string,
    status: boolean,
    companyUserId: string,
    phone: string,
    mail: string,
    taxId: string
}
function ConfirmTable({ spam, status }: Props) {

    const [confirms, setConfirms] = useState<fetchData>();
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState('')
    function handleChange(e: any) {
        let val = e.target.value;
        if (val === '' || val === ' ') {
            setSearch('-**-');
        }
        setSearch(val)
    }
    const [open, setOpen] = useState({
        open: false,
        content: true
    });
    useEffect(() => {
        let token = localStorage.getItem('auth');
        if (token) {
            fetch(`/api/confirms/${search.length > 0 ? search : '-**-'}`, {
                method: 'GET',
                headers: {
                    'Auth': token,
                    'Status': status,
                    'Spam': spam
                }
            })
                .then(res => res.json())
                .then(res => {
                    setConfirms(res)
                    console.log(res);
                })
        } else {

        }

    }, [search, spam, status, open])



    type postData = {
        username: string,
        mod: boolean
    }


    const [postData, setPostData] = useState<postData>({
        username: '',
        mod: false
    })
    const [confirmText, setConfirmText] = useState<string>('');

    function handleClick(content: boolean, username: string) {
        setPostData({
            username: username,
            mod: content
        });
        setOpen({ open: true, content: content });
    }

    function sendReq() {
        let token = localStorage.getItem('auth');
        if (token) {
            fetch('/api/company-confirmation', {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                    'Auth': token
                }
            }).then(res => res.json())
                .then(res => {
                    setOpen({ open: false, content: false })
                })
        }

    }

    return (
        <div className='w-full'>
            <div className='w-full'>
                <div className='bg-white w-96 rounded-md my-2 p-2'>
                    <TextField size='small' variant='outlined' className='w-full' label='Ara' value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            {
                confirms?.data ? <TableContainer component={Paper} aria-label="simple table">
                    <Modal open={open.open} onClose={() => setOpen({ open: false, content: false })}>
                        {
                            open.content ? <div className='absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] shadow-lg p-4 bg-white sm:w-[30rem] w-11/12' >
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Şirketi onaylamak için "onayla" yazınız.
                                </Typography>
                                <TextField value={confirmText} onChange={(e) => setConfirmText(e.target.value)} size='small' className='w-full mt-4' color='success' label="Yaz" />
                                <Button onClick={sendReq} disabled={confirmText !== 'onayla'} variant='contained' className='mt-4' color='success'>
                                    Onayla
                                </Button>
                            </div> : <div className='absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] shadow-lg p-4 bg-white sm:w-[30rem] w-11/12' >
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Şirketi spam listesine almak için "spam" yazınız.
                                </Typography>
                                <TextField value={confirmText} onChange={(e) => setConfirmText(e.target.value)} size='small' className='w-full mt-4' color='error' label="Yaz" />
                                <Button onClick={sendReq} disabled={confirmText !== 'spam'} variant='contained' className='mt-4' color='error'>
                                    Spam
                                </Button>
                            </div>
                        }
                    </Modal>
                    <Table>
                        <TableHead>
                            <TableRow className='uppercase'>
                                <TableCell>Şirket Adı</TableCell>
                                <TableCell>Şirket Kullanıcı Adı</TableCell>
                                <TableCell>Mail Adresi</TableCell>
                                <TableCell>Telefon Numarası</TableCell>
                                <TableCell align={status === 'false' && spam === 'false' ? 'left' : 'right'}>Vergi Numarası</TableCell>
                                {
                                    status === 'false' && spam === 'false' ? <TableCell align="right">İşlemler</TableCell> : <></>
                                }

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {confirms?.data?.map((item: fetchItem) => (
                                <TableRow
                                    key={item.companyUserId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.companyName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.companyUserId}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.mail}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.phone}
                                    </TableCell>
                                    <TableCell align={status === 'false' && spam === 'false' ? 'left' : 'right'} component="th" scope="row">
                                        {item.taxId}
                                    </TableCell>
                                    {
                                        status === 'false' && spam === 'false' ? <TableCell align='right' component="th" scope="row">
                                            <div className='flex flex-row justify-end'>
                                                <Button onClick={() => handleClick(true, item.companyUserId)} className='mx-2' color='success' variant='outlined'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                                    </svg>
                                                    <p className='ml-2 xl:block hidden'>Onayla</p>
                                                </Button>
                                                <Button onClick={() => handleClick(false, item.companyUserId)} className='mx-2' color='error' variant='outlined'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                                    </svg>
                                                    <p className='ml-2 xl:block hidden'>Spam olarak işaretle</p>
                                                </Button>
                                            </div>
                                        </TableCell> : <></>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> :
                    <Skeleton variant='rectangular' width='100%' height={450} />
            }
        </div>
    )
}

export default ConfirmTable