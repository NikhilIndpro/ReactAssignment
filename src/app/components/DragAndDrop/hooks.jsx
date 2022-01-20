/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setTodos, setInprogress, setDone } from './actions';
import { removeFromList, addToList } from './DragDropUtils';

const TODO = 'todo';
const IN_PROGRESS = 'inProgress';
const DONE = 'done';

export const useTodo = props => {
  const Todos = props.list ? props.list.filter(item => item.id <= 10) : [];

  const dispatch = useDispatch();

  const getTodo = useSelector(state => state.DragAndDropReducer.Todo);
  const getInProgress = useSelector(
    state => state.DragAndDropReducer.In_Progress,
  );
  const getDone = useSelector(state => state.DragAndDropReducer.Done);

  const [elements, setElements] = useState({
    todo: getTodo,
    inProgress: getInProgress,
    done: getDone,
  });

  useEffect(() => {
    if (Todos) {
      dispatch(setTodos(Todos));
      setElements({ todo: getTodo, inProgress: [], done: [] });
    }
  }, [props]);

  useEffect(() => {
    setElements({ todo: getTodo, inProgress: getInProgress, done: getDone });
  }, [getDone, getInProgress, getTodo]);

  const lists = [TODO, IN_PROGRESS, DONE];

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    console.log(result);

    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];

    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index,
    );

    const getSource = listCopy[result.source.droppableId];

    const setUpdatedSource = getSource.filter(e => e.id !== removedElement.id);

    const sourceId = result.source.droppableId;

    sourceUpdate(sourceId, dispatch, setUpdatedSource);

    listCopy[result.source.droppableId] = newSourceList;

    const destinationList  = listCopy[result.destination.droppableId];

    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement,
    );

    const destinationId = result.destination.droppableId;

    updateDestination(destinationId, dispatch, listCopy);

    console.log('listCopy', listCopy);
  };

  return {
    onDragEnd,
    lists,
    elements,
  };
};

function updateDestination(id, dispatch, listCopy) {
  if (id === TODO) {
    dispatch(setTodos(listCopy.todo));
  } else if (id === IN_PROGRESS) {
    dispatch(setInprogress(listCopy.inProgress));
  } else {
    dispatch(setDone(listCopy.done));
  }
}

function sourceUpdate(id, dispatch, setUpdatedSource) {
  if (id === TODO) {
    dispatch(setTodos(setUpdatedSource));
  } else if (id === IN_PROGRESS) {
    dispatch(setInprogress(setUpdatedSource));
  } else {
    dispatch(setDone(setUpdatedSource));
  }
}
