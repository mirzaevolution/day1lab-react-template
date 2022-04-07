import React, { useEffect } from 'react'
import { AuthManagerInit } from '../../utils';

interface Props {
    isCallbackLogout: boolean
}

const Callback: React.FC<Props> = ({ isCallbackLogout }) => {
    useEffect(() => {
        if (isCallbackLogout) {
            AuthManagerInit.signoutRedirectCallback().then(user => {
                AuthManagerInit.signinRedirect()
            }).catch(error => console.log(error))
        } else {
            AuthManagerInit.signinRedirectCallback().then(user => {
                window.location.href = "/"
            }).catch(error => console.log(error))
        }
    }, [isCallbackLogout]);

    return (
        <div>callback processing...</div>
    )
}

export default Callback