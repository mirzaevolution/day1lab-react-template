import React from 'react';
import { AuthProvider } from 'react-oidc-context';
import { MainRouter } from './routers';
import {  AuthManagerInit, UseTranslationHook } from './utils';

export const App: React.FunctionComponent = () => {
  UseTranslationHook()
  return (
    <AuthProvider {...AuthManagerInit.userManagerConfig}>
      <MainRouter />
    </AuthProvider>
  );
};
