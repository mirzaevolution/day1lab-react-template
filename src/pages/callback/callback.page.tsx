import React, { useEffect } from 'react'
import { signinRedirectCallback, signoutRedirectCallback, userManager } from '../../utils';

interface Props {
    isCallbackLogout: boolean
}

const Callback: React.FC<Props> = ({ isCallbackLogout }) => {
    useEffect(() => {
        if (isCallbackLogout) {
            signoutRedirectCallback().then(user => {
                userManager.signinRedirect()
            }).catch(error => console.log(error))
        } else {
            signinRedirectCallback().then(user => {
                window.location.href = "/"
            }).catch(error => console.log(error))
        }
    }, [isCallbackLogout]);

    return (
        <div>callback processing...</div>
    )
}

export default Callback