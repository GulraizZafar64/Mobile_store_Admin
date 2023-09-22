import React, { useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import toast from 'react-hot-toast';
const DeleteModal = ({
    url,
    show,
    close,
    reload,
    title,
    description
}) => {

    const [loading, setloading] = useState(false)
    const authtoken = localStorage.getItem("userToken");

    const deleteThis = () => {
        setloading(true)
        let fetchurl = `${url}`
        console.log(fetchurl)

        fetch(fetchurl, {
            method: 'DELETE',
         
        }).then(res => res.json())
            .then((data) => {
                console.log(data)
                setloading(false)
                close()
                reload()
                toast.success('Deleted Successfully')
            }).catch(err => {
                console.log(err)
                toast.success('SomeThing Went Wronge')
                setloading(false)

            })
    }


    return (
        <Modal
            show={show}
            onHide={close}
            animation={true}
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {description}
            </Modal.Body>
            <Modal.Footer>
                {
                    loading ?
                        <Spinner animation='border' />

                        :
                        <>
                            <button
                                onClick={close}
                                className='btn btn-primary'>
                                Cancel
                            </button>
                            <button
                                onClick={deleteThis}
                                className='btn btn-danger'>
                                Delete
                            </button>
                        </>
                }
            </Modal.Footer>

        </Modal>
    )
}

export default DeleteModal