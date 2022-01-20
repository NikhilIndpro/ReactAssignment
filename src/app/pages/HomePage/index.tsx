import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useData } from './hooks';

import reducer from './reducer';
import saga from './saga';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import DragAndDrop from 'app/components/DragAndDrop';

export function HomePage() {
  const injectorkey = 'homepage';

  useInjectReducer({ key: injectorkey, reducer });
  useInjectSaga({ key: injectorkey, saga });

  const { list } = useData();
  return (
    <>
      <Helmet>
        <title>Home Page</title>

        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <DragAndDrop list={list} />
    </>
  );
}
