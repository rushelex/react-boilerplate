import React, { FC } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { ConfigService } from '~services/common/config-service';

import { App } from './App';

interface IProps {
  store?: never;
}

export const Root: FC<IProps> = () => (
  <BrowserRouter basename={ConfigService.getPublicBasename()}>
    <App />
  </BrowserRouter>
);
