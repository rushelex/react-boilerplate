import React, { FC, lazy, Suspense, useState } from 'react';

import classnames from 'classnames/bind';

import styles from '~components/styles/App.scss';

const cx = classnames.bind(styles);

const LazyComponent = lazy(
  () => import(/* webpackChunkName: "LazyComponent" */ '~components/LazyComponent/LazyComponent'),
);

export const App: FC = () => {
  const [show, setShow] = useState(false);
  const handleToggleComponent = (s: boolean) => {
    setShow(s);
  };
  return (
    <section className={cx('react-boilerplate')}>
      <h1 className="test-h">Hello, Webpack!</h1>

      <button type="button" onClick={() => handleToggleComponent(true)}>
        Toggle
      </button>

      {show && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent style={{ color: 'red' }}>Lazy Test Component</LazyComponent>
        </Suspense>
      )}
    </section>
  );
};
