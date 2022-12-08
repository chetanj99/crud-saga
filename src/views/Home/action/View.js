import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadUsersStart } from '../../../redux/user/actions'

const View = () => {
    const dispatch = useDispatch()

    const { id } = useParams()
    const { users } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(loadUsersStart())
    }, [dispatch])

    const data = users.find(data => data.id === id)

    return (
        <div>
            <li><span>id : -  </span>{data?.id}</li>
            <li><span>id : -  </span>{data?.name}</li>
            <li><span>id : -  </span>{data?.phone}</li>
            <li><span>id : -  </span>{data?.email}</li>
            <li><span>id : -  </span>{data?.address}</li>
        </div>
    )
}

export default View