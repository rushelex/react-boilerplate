import React, { CSSProperties, FC, ReactElement } from 'react';

import classnames from 'classnames/bind';
import JSONPretty from 'react-json-pretty';

import styles from './LazyComponent.module.scss';

interface IProps {
  className?: string;
  style?: CSSProperties;
}

export const Test: FC<IProps> = ({ children, className, style }): ReactElement => {
  const cx = classnames([className, styles]);

  return (
    <div className={cx} style={style}>
      <div>{children}</div>
      <JSONPretty json={process.env.APP_CONFIG} />
      <div>{process.env.DB_HOST?.toString()}</div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Test;
