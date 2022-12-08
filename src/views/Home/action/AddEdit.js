import React, { Fragment, useEffect } from 'react'
import { Field, FormikProvider, useFormik } from 'formik'
import { Modal, ModalBody, ModalHeader, Form, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';

import { createUserStart, updateUserStart } from '../../../redux/user/actions';
import CustomInput from '../../common/CustomInput';

const AddEdit = ({ addEditModal, handleAddEditModal, selectedData }) => {
    const dispatch = useDispatch()

    const handleSubmit = (values, { resetForm }) => {
        if (selectedData) {
            console.log("values", values)
            const id = selectedData.id
            dispatch(updateUserStart({ id, values }))
            resetForm()
            handleAddEditModal()
        } else {
            dispatch(createUserStart(values))
            resetForm()
            handleAddEditModal()
        }
    }

    const formik = useFormik({
        onSubmit: (values, formikHelpers) => handleSubmit(values, formikHelpers),
        initialValues: {
            id: "",
            name: "",
            email: "",
            phone: "",
            address: ""
        }
    })

    const { isSubmitting, setValues } = formik

    useEffect(() => {
        if (selectedData) {
            setValues(selectedData)
        }
    }, [selectedData])

    return (
        <Fragment>
            <Modal isOpen={addEditModal} toggle={handleAddEditModal} centered={true} backdrop={'static'} keyboard={false}>
                <ModalHeader toggle={handleAddEditModal}>Add</ModalHeader>
                <ModalBody>
                    <FormikProvider value={formik}>
                        <Form onSubmit={formik.handleSubmit}>
                            <Field label="Member ID" name="id" placeholder="Member Id" component={CustomInput} />
                            <Field label="Member Name" name="name" placeholder="Member Name" component={CustomInput} />
                            <Field label="Member Email" name="email" placeholder="Member Email" component={CustomInput} />
                            <Field label="Member Phone" name="phone" placeholder="Member Phone" component={CustomInput} />
                            <Field label="Member Address" name="address" placeholder="Member Address" component={CustomInput} />
                            <Button color="danger"
                                onClick={() => {
                                    formik.resetForm()
                                    handleAddEditModal()
                                }}
                            >
                                Cancel
                            </Button>
                            <Button color='success' type="submit" disabled={isSubmitting}>Save</Button>
                        </Form>
                    </FormikProvider>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default AddEdit