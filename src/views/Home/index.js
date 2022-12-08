import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit, Eye, Trash } from "react-feather"
import { Button, ButtonGroup, Container } from 'reactstrap';

import { columns } from './columns';
import { loadUsersStart } from '../../redux/user/actions'
import AddEdit from './action/AddEdit';
import Delete from './action/Delete';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(loadUsersStart())
    }, [dispatch])

    const [selectedData, setSelectedData] = useState('')

    const [addEditModal, setAddEditModal] = useState(false)
    const handleAddEditModal = () => setAddEditModal(!addEditModal)

    const [deleteModal, setDeleteModal] = useState(false)
    const handleDeleteModal = () => setDeleteModal(!deleteModal)

    const data = users && users.map(data => {
        return {
            ...data,
            action: <ButtonGroup>
                <Link to={`/user/${data.id}`}>
                    <Button
                        color='primary'
                        outline
                        size="sm"
                        onClick={() => setSelectedData(data)}
                    >
                        <Eye size={18} />
                    </Button>
                </Link>
                <Button
                    color='warning'
                    outline
                    size="sm"
                    onClick={() => {
                        setSelectedData(data)
                        handleAddEditModal()
                    }}
                >
                    <Edit size={18} />
                </Button>
                <Button
                    color='danger'
                    outline
                    size="sm"
                    onClick={() => {
                        setSelectedData(data)
                        handleDeleteModal()
                    }}
                >
                    <Trash size={18} />
                </Button >
            </ButtonGroup>
        }
    })

    return (
        <Fragment>
            <AddEdit
                addEditModal={addEditModal}
                handleAddEditModal={handleAddEditModal}
                selectedData={selectedData}
            />
            <Delete
                deleteModal={deleteModal}
                handleDeleteModal={handleDeleteModal}
                selectedData={selectedData}
            />
            <Container>
                <div className='mt-2'>
                    <Button onClick={handleAddEditModal}>Add</Button>
                </div>
                <DataTable
                    dense
                    noHeader
                    sortServer
                    responsive
                    pagination
                    paginationServer
                    pointerOnHover
                    paginationServerOptions={{
                        persistSelectedOnPageChange: true,
                        persistSelectedOnSort: true
                    }}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30, 40, 50, 100]}
                    sortIcon={<ChevronDown />}
                    columns={columns}
                    data={data}
                />
            </Container>
        </Fragment>
    )
}

export default Home