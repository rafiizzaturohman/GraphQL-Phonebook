import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';


export default function UserItem(props) {

    const [user, setUser] = useState({
        name: props.users.name,
        phone: props.users.phone
    })

    const [edit, setEdit] = useState({
        isEdit: false
    })

    const handleEditClick = () => {
        setEdit({
            isEdit: true
        })
    }

    const handleCancelEditClick = () => {
        setEdit({
            isEdit: false
        })
    }

    const save = useCallback(() => {
        props.update(user.name, user.phone)
        setEdit({
            isEdit: false
        })
    }, [props, user])


    if (edit.isEdit === true) {
        return (
            <div className='container shadow-2xl shadow-slate-300 bg-white/80 rounded-lg w-auto h-auto space-y-2 px-8 py-5' >
                <div className='flex space-x-3 items-center'>
                    <FontAwesomeIcon icon='signature' />

                    <input type='text' name='name' id='name' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className='px-2 py-1 border border-blue-400/75 rounded-lg w-full' required />
                </div>

                <div className='flex space-x-4 items-center'>
                    <FontAwesomeIcon icon='phone' />

                    <input type='tel' pattern='[08][0-9]{11}' name='phone' id='phone' value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} className='px-2 py-1 border border-blue-400/75 rounded-lg w-full' required />
                </div>

                <div className='flex justify-evenly py-2'>
                    <button type='button' onClick={save} className='transition hover:text-slate-400 hover:delay-100 font-semibold tracking-wider'>Update</button>

                    <button type='button' onClick={handleCancelEditClick} className='transition hover:text-slate-400 hover:delay-100 font-semibold tracking-wider'>Cancel</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='transition ease-in-out container shadow-lg shadow-slate-300 bg-white/80 rounded-lg w-auto h-auto space-y-4 px-8 py-5  border-2 border-blue-200 hover:-translate-y-1 hover:scale-103' >
                <div className='flex space-x-3 items-center'>
                    <FontAwesomeIcon icon='signature' />

                    <h1>{user.name}</h1>
                </div>

                <div className='flex space-x-4 items-center opacity-60'>
                    <FontAwesomeIcon icon='phone' />

                    <h1>{user.phone}</h1>
                </div>

                <div className='flex justify-evenly py-2'>
                    <button type='button' onClick={handleEditClick} className='transition hover:text-slate-400 hover:delay-100 font-semibold tracking-wider'>
                        Edit
                    </button>

                    <button type='button' onClick={user.sent = true ? props.remove : props.resend} className='transition hover:text-slate-400 hover:delay-100 font-semibold tracking-wider'>
                        {user.sent = true ? 'Delete' : 'Resend'}
                    </button>
                </div>
            </div>
        )
    }
}

