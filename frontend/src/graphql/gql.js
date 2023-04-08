import { gql } from '@apollo/client';

export const GET_ALL_CONTACTS = gql`
    query getAllContacts($name: String, $phone: String, $page: Int, $totalPage: Int) {
        getAllContacts(name: $name, phone: $phone, page: $page, totalPage: $totalPage) {
        data {
                contact {
                    id
                    name 
                    phone
                }
                page
                totalPage
            }
        }
    }
`;

export const CREATE_CONTACT = gql`
    mutation createContact($name: String!, $phone: String!) {
        createContact(input: {name: $name, phone: $phone}) {
            id
            name
            phone
        }
    }
`;

export const DELETE_CONTACT = gql`
    mutation deleteContact($id: ID!) {
        deleteContact(id: $id) {
            id
        }
    }
`;

export const UPDATE_CONTACT = gql`
    mutation updateContact($id: ID!, $name: String!, $phone: String!) {
        updateContact(id: $id, input: {name: $name, phone: $phone}) {
            id
            name
            phone
        }
    }
`;