import { Icon } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../reduxs/hook'
import { RootState } from '../../reduxs/store'
import { AuthManagerInit } from '../../utils'
import "./topbar.component.css"

const TopBar: React.FC = () => {
    const { t } = useTranslation();
    const currentUser = useAppSelector((state: RootState) => state.main.currentUser)

    const onLogout = () => {
        AuthManagerInit.signoutRedirect()
    }

    return (
        <div className='top-nav'>
            <div className="top-nav-left">
                <Icon iconName='Tennis' className='icon-header' />
            </div>
            <div className="top-nav-middle">
                <span>
                    <Link to={"/list"}>{t("List")}</Link>
                </span>
                <span>
                    <Link to={"/form"}>{t("Form")}</Link>
                </span>
                <span>
                    <Link to={"/ping"}>{t("Fetch")}</Link>
                </span>
            </div>
            <div className="top-nav-right">
                {currentUser &&
                    <div>{currentUser?.name} &nbsp;<span onClick={() => onLogout()} style={{ cursor: "pointer" }}>( {t("Logout")} )</span></div>
                }
            </div>
        </div>
    )
}

export default TopBar
