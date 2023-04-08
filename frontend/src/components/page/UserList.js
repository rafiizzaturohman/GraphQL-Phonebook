import React, { useState } from "react";
import UserItem from "./UserItem";
import { useQuery } from "@apollo/client";
import { GET_ALL_CONTACTS } from "../../graphql/gql";

export default function UserList(props) {

    const [user, setUser] = useState({
        value: []
    })

    const [params, setParams] = useState({
        page: 1,
        totalPage: 0
    })

    const { data } = useQuery(GET_ALL_CONTACTS, {
        variables: {
            name: props.data.name,
            phone: props.data.phone,
            page: params.page,
            totalPage: params.totalPage
        },
        onCompleted: (data) => {
            setUser({ value: [...(params.page === 1 ? [] : user.value), ...data.getAllContacts.data.contact] })
            setParams({ page: data.getAllContacts.data.page, totalPage: data.getAllContacts.data.totalPage })
        }
    })

    const loadMore = () => {
        if (params.page < params.totalPage) {
            setParams({ ...params, page: params.page + 1 })
        }
    }

    const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            loadMore()
        }
    }

    return (
        <div onScroll={scrolling} className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 px-2 max-h-screen overflow-y-auto h-107">
            {
                user.value.map((user) => (
                    <UserItem
                        key={user.id}
                        users={user}
                    // update={(name, phone) => props.updateContact(user.id, name, phone)}
                    // remove={() => props.removeContact(user.id)}
                    // resend={() => props.resendContact(user.id, user.name, user.phone)}
                    />
                ))
            }
        </div>
    )
}