import { PrimaryButton } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { signinRedirect } from '../../utils'
import "./welcome.css"

const Welcome: React.FC = () => {
  const { t } = useTranslation()

  const loginRedirect = () => {
    signinRedirect().catch((err) => {
      alert(t("Disconnected from identity server"))
    })
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      height: "100%"
    }}>
      <div style={{ flex: 1, alignSelf: "center", textAlign: "center" }}>
        <h1>{t('Welcome Screen')}</h1>
        <PrimaryButton onClick={loginRedirect} text={t('Login')} />
      </div>
      <div style={{ padding: 20, flex: 1 }}>
        <img alt='-' style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 20,
          boxShadow: "1px 4px 24px 0px rgba(0,0,0,0.75)"
        }} src='https://picsum.photos/500/800' />
      </div>
    </div>
  )
}

export default Welcome