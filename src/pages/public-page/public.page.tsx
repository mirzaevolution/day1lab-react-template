import React from 'react'
import { useTranslation } from 'react-i18next'

const PublicPage:React.FC = () => {
const {t} = useTranslation()

  return (
    <div style={{
        display:"flex",
        height:"100%",
        alignItems:"center",
        justifyContent:"center"
    }}><div className="ms-fontSize-42">{t("This is a sample public page")}</div></div>
  )
}

export default PublicPage
