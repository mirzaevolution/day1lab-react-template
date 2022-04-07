import { UserManagerSettings, UserManager } from 'oidc-client-ts';

class AuthManager {
  public userManager: UserManager;
  public userManagerConfig: UserManagerSettings = {
    client_id: `${process.env.REACT_APP_CLIENT_ID}`,
    client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
    redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}/signin-oidc`,
    post_logout_redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}/signout-oidc`,
    response_type: `${process.env.REACT_APP_RESPONSE_TYPE}`,
    scope: `${process.env.REACT_APP_SCOPE}`,
    authority: `${process.env.REACT_APP_AUTHORITY}`
  }
  constructor() {
    this.userManager = new UserManager(this.userManagerConfig)
  }

  signinRedirect = () => {
    return this.userManager.signinRedirect()
  }

  signinRedirectCallback = () => {
    return this.userManager.signinRedirectCallback()
  }

  signoutRedirect = () => {
    //userManager.clearStaleState()
    //userManager.removeUser()
    return this.userManager.signoutRedirect()
  }

  signoutRedirectCallback = () => {
    this.userManager.clearStaleState()
    this.userManager.removeUser()
    return this.userManager.signoutRedirectCallback()
  }

}

export const AuthManagerInit = new AuthManager()