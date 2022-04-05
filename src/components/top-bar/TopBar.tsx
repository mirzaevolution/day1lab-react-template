import { Icon } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hook'
import { RootState } from '../../redux/store'
import { signoutRedirect } from '../../utils'
import "./topbar.css"

const TopBar: React.FC = () => {
    const { t } = useTranslation();
    const currentUser = useAppSelector((state: RootState) => state.main.currentUser)

    const onLogout = () => {
        signoutRedirect()
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
                    <Link to={"/fetch"}>{t("Fetch")}</Link>
                </span>
                <span>
                    <Link to={"/fetch-protected"}>{t("Fetch Protected")}</Link>
                </span>
            </div>
            <div className="top-nav-right">
                {currentUser &&
                    <div>{currentUser?.name} &nbsp;<span onClick={onLogout} style={{ cursor: "pointer" }}>( {t("Logout")} )</span></div>
                }
            </div>
        </div>
    )
}

export default TopBar
