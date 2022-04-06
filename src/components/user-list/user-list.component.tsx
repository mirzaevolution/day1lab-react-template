import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, TooltipHost } from '@fluentui/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { GuestModel } from '../../models';

interface Props{
    datas:GuestModel[]
}

const UserList: React.FC<Props> = ({datas}) => {
    const { t } = useTranslation();
    const columns: IColumn[] = [
        {
            key: 'column2',
            name: t("First Name"),
            fieldName: 'firstName',
            minWidth: 210,
            maxWidth: 350,
            data: 'string',
            isPadded: true,
            onRender: (item: GuestModel) => (
                <TooltipHost content={`${item.firstName}`}>
                    <span>{item.firstName}</span>
                </TooltipHost>
            ),
        },
        {
            key: 'column3',
            name: t("Last Name"),
            fieldName: 'lastName',
            minWidth: 210,
        },
        {
            key: 'column4',
            name: t("Address"),
            fieldName: 'address',
            minWidth: 210,
        },
    ];

    return (
        <DetailsList
            items={datas}
            columns={columns}
            selectionMode={SelectionMode.none}
            setKey="none"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
        />
    )
}

export default UserList
