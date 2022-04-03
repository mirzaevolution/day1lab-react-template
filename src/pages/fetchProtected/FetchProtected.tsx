import { DefaultButton, PrimaryButton} from '@fluentui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getPing, postPing } from '../../services'

const FetchProtected: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [nameOther, setNameOther] = useState<string>("")
    const {t} = useTranslation()

    const onGetData = async () => {
        await getPing().then((res) => {
            setName(res.data?.name)
        }).catch((err) => {
            console.log(err)
        })
    }

    const onPostData = async () => {
        await postPing().then((res) => {
            setNameOther(res.data?.name)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-around"
        }}>
            <div style={{ flex: 1, textAlign: "center" }}>
                <PrimaryButton onClick={onGetData} text={t("Fetch Data")}/>
                {name !== "" &&
                    <div>
                        <span>{t("Name")} : </span>
                        <span>{name}</span>
                    </div>

                }
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
                <DefaultButton onClick={onPostData} text={t("Post Data")} />
                {nameOther !== "" &&
                    <div>
                        <span>{t("Name")} : </span>
                        <span>{nameOther}</span>
                    </div>

                }
            </div>
        </div>
    )
}

export default FetchProtected