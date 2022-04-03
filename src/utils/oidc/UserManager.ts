import { UserManagerSettings, UserManager } from 'oidc-client-ts';

export const userManagerConfig: UserManagerSettings = {
  client_id: `${process.env.REACT_APP_CLIENT_ID}`,
  client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
  redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}/signin-oidc`,
  post_logout_redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}/signout-oidc`,
  response_type: `${process.env.REACT_APP_RESPONSE_TYPE}`,
  scope: `${process.env.REACT_APP_SCOPE}`,
  authority: `${process.env.REACT_APP_AUTHORITY}`
};

export const userManager = new UserManager(userManagerConfig);

export const signinRedirect = () => {
  return userManager.signinRedirect()
}

export const signinRedirectCallback = () => {
  return userManager.signinRedirectCallback()
}

export const signoutRedirect = () => {
  //userManager.clearStaleState()
  //userManager.removeUser()
  return userManager.signoutRedirect()
}

export const signoutRedirectCallback = () => {
  userManager.clearStaleState()
  userManager.removeUser()
  return userManager.signoutRedirectCallback()
}

export default userManager