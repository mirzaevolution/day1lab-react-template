import { Icon } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import "./topbar.css"

const TopBar: React.FC = () => {
    const { t } = useTranslation();
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
            </div>
        </div>
    )
}

export default TopBar