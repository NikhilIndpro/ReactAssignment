import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLIst } from './actions';

export const useData = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState(0);

  useEffect(() => {
    dispatch(fetchLIst());
    console.log('data');
  }, []);

  return {
    list,
  };
};
