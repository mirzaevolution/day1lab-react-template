import { PrimaryButton } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AuthManagerInit } from '../../utils'
import "./welcome.page.css"

const Welcome: React.FC = () => {
  const { t } = useTranslation()

  const loginRedirect = () => {
    AuthManagerInit.signinRedirect().catch((err) => {
      alert(t("Disconnected from identity server"))
    })
  }

  return (
    <div className='welcome-container'>
      <div className='welcome-text'>
        <h1>{t('Welcome Screen')}</h1>
        <PrimaryButton onClick={loginRedirect} text={t('Login')} />
      </div>
      <div style={{ padding: 20, flex: 1 }}>
        <img alt='-' src='https://picsum.photos/500/800' />
      </div>
    </div>
  )
}

export default Welcome