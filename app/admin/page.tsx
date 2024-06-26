import React from 'react'
import DrawerListe from '@/components/client/DrawerList'

type Props = {}

function page({ }: Props) {
    return (
        <div className='bg-[rgba(149,152,158,.4)] min-h-screen'>
            <DrawerListe />
        </div>
    )
}

export default page