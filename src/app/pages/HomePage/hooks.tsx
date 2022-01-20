import { useState, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { fetchLIst } from './actions';

export const useData = () => {
  const Item = useSelector(
    (state: RootStateOrAny) => state.HomePageReducer.dndListReducer,
  );
  const dispatch = useDispatch();
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(fetchLIst());
  }, []);

  useEffect(() => {
    setList(Item.data);
  }, [Item]);

  return {
    list,
  };
};
