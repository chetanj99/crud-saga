export const columns = [
    {
        name: 'Id',
        sortable: true,
        selector: ({ id }) => id
    },
    {
        name: 'Name',
        sortable: true,
        selector: ({ name }) => name
    },
    {
        name: 'Email',
        sortable: true,
        selector: ({ email }) => email
    },
    {
        name: 'Phone',
        sortable: true,
        selector: ({ phone }) => phone
    },
    {
        name: 'Address',
        sortable: true,
        selector: ({ address }) => address
    },
    {
        name: 'Action',
        sortable: true,
        selector: ({ action }) => action
    }
]
