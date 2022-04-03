import React from 'react'
import { UserList } from '../../components';
import { useAppSelector } from '../../redux/hook';
import { RootState } from '../../redux/store';
import "./listSample.css"

const ListSample: React.FC = () => {
    const dataGues = useAppSelector((state:RootState) => state.main.formData)
    return (
        <UserList datas={dataGues} />
    )
}

export default ListSample