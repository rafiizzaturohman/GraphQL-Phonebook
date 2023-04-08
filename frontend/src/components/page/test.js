import React, { useState } from "react"
import UserItem from "./UserItem"
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS, DELETE_USER, UPDATE_USER } from "../graphql/gql";
import { Loading, Alert } from "./Util";
export default function UserList(props) {
    const [user, setUser] = useState({
        value: []
    })

    const [params, setParams] = useState({
        page: 1,
        totalPage: 0
    })

    const { loading, error, data } = useQuery(GET_ALL_USERS, {
        variables: {
            name: props.searchData.name,
            phone: props.searchData.phone,
            page: params.page,
            totalPage: params.totalPage
        },
        onCompleted: (data) => {
            setUser({ value: [...(params.page === 1 ? [] : user.value), ...data.getAllUsers.data.user] })
            setParams({ page: data.getAllUsers.data.page, totalPage: data.getAllUsers.data.totalPage })
        }
    });

    const [deleteUser, { dataDelete, loadingDelete, errorDelete }] = useMutation(DELETE_USER, {
        refetchQueries: [
            { query: GET_ALL_USERS }
        ]
    });

    const [updateUser, { dataUpdate, loadingUpdate, errorUpdate }] = useMutation(UPDATE_USER, {
        refetchQueries: [
            { query: GET_ALL_USERS }
        ]
    });

    console.log(data);
    console.log(dataDelete);
    console.log(dataUpdate);

    if (loading || loadingDelete || loadingUpdate) return (
        <Loading />
    )

    if (error) return (
        <Alert message={error.stack} />
    )

    if (errorDelete) return (
        <Alert message={errorDelete.stack} />
    )

    if (errorUpdate) return (
        <Alert message={errorUpdate.stack} />
    )

    const loadMore = () => {
        if (params.page < params.totalPage) {
            setParams({ ...params, page: params.page + 1 })
        }
    }

    const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop - element.clientHeight <= 1) {
            loadMore()
        }
    }
    return (
        <div onScroll={scrolling} style={{ overflowY: "scroll", height: '200px' }}>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.value.map((item, index) => (
                            <UserItem
                                key={item.id}
                                no={index + 1}
                                name={item.name}
                                phone={item.phone}
                                remove={() => deleteUser({ variables: { id: item.id } })}
                                update={(name, phone) => updateUser({ variables: { id: item.id, name: name, phone: phone } })}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}