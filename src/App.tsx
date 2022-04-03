import React from 'react';
import { MainRouter } from './router';
import { UseTranslationHook } from './utils';

export const App: React.FunctionComponent = () => {
  UseTranslationHook()
  return (
    <MainRouter/>
  );
};
