import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';

export default function UserBox(props) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [value, setValue] = useState({})

    const search = () => {
        let result = {
            name,
            phone
        }
        setValue(result)
    }

    const searchReset = () => {
        setName('')
        setPhone('')
        setValue({})
    }

    return (
        <div>
            <div className='grid gap-8 my-26 mx-20 md:grid-cols-none xl:grid-cols-2'>
                {/* CARD FORM START */}
                <div className='sticky'>
                    <div className='shadow-2xl shadow-slate-300 bg-white/80 rounded-lg'>
                        <div className='container py-16 px-24 space-y-10'>
                            <UserForm
                                search={search}
                                reset={searchReset}
                                nameSet={setName}
                                phoneSet={setPhone}
                                name={name}
                                phone={phone}
                            />
                        </div>
                    </div>
                </div>
                {/* CARD FORM END */}

                {/* CARD LIST START */}
                <div>
                    <div className=''>
                        <div className='bg-gradient-to-tr from-blue-700 to-blue-500 px-8 py-1 rounded-md shadow-md'>
                            <h1 className='text-3xl text-white font-bold tracking-wide'>Phonebook App</h1>
                        </div>

                        <div className='container mt-8'>
                            <UserList data={value} />
                        </div>
                    </div>
                </div>
                {/* CARD LIST END */}
            </div>
        </div >
    )
}