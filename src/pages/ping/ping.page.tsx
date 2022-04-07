import { DefaultButton, PrimaryButton } from '@fluentui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MainServiceInit } from '../../services'
import "./ping.page.css"

const Ping: React.FC = () => {
    const { t } = useTranslation()
    const message = "No request being made....";
    const [postResponse, setPostResponse] = useState(message)
    const [getResponse, setGetResponse] = useState(message)

    const onPostData = () => {
        const message = `Hello from React JS ${new Date().toISOString()}`;
        MainServiceInit.postEncryptedPing(message).then((res: any) => {
            const data = res.Result;
            setPostResponse(data)
        })
    }

    const onGetData = () => {
        MainServiceInit.getEncryptedPing().then((res: any) => {
            const data = res.Result;
            setGetResponse(data)
        })
    }

    return (
        <div className='ping-container'>
            <div className='ping-content'>
                <PrimaryButton onClick={onGetData} text={t("Fetch Data")} />
                <div className='ping-response'>
                    {getResponse}
                </div>
            </div>
            <div className='ping-content'>
                <DefaultButton onClick={onPostData} text={t("Post Data")} />
                <div className='ping-response'>
                    {postResponse}
                </div>
            </div>
        </div>
    )
}

export default Ping