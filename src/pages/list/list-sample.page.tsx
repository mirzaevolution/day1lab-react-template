import React from 'react'
import { UserList } from '../../components';
import { useAppSelector } from '../../reduxs/hook';
import { RootState } from '../../reduxs/store';
import "./list-sample.page.css"

const ListSample: React.FC = () => {
    const dataGues = useAppSelector((state:RootState) => state.main.formData)
    return (
        <UserList datas={dataGues} />
    )
}

export default ListSample