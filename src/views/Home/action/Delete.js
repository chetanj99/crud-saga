import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

import { deleteUserStart } from '../../../redux/user/actions'

const Delete = ({ deleteModal, handleDeleteModal, selectedData }) => {
    const dispatch = useDispatch()

    const submitDelete = () => {
        dispatch(deleteUserStart(selectedData.id))
        handleDeleteModal()
    }

    return (
        <Fragment>
            <Modal isOpen={deleteModal} toggle={handleDeleteModal} centered={true} backdrop={'static'} keyboard={false}>
                <ModalHeader toggle={handleDeleteModal}>Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to Delete this?
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={handleDeleteModal}>Cancel</Button>
                    <Button color='danger' onClick={submitDelete}>Delete</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

export default Delete