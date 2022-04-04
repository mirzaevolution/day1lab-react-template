import React, { useEffect } from 'react'
import { UserList } from '../../components'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { getUsers } from '../../redux/slices/MainSlice'
import { RootState } from '../../redux/store'

const FetchSample: React.FC = () => {
    const dispatch = useAppDispatch()
    const userdatas = useAppSelector((state:RootState) => state.main.userData)
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <UserList datas={userdatas}/>
    )
}

export default FetchSample