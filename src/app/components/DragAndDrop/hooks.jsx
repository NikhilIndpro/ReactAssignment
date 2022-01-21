/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, setInprogress, setDone } from './actions';
import { removeFromList, addToList } from './dragdropUtils';

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


    const listCopy = { ...elements };
    
    // removeFromList will provide the removed elements and updated list

    const sourceList = listCopy[result.source.droppableId];

    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index,
    );

    // Adding updated list to column with removed element
    const sourceId = result.source.droppableId;

    sourceUpdate(sourceId, dispatch, newSourceList);

     //Adding removed element to destination column with index 
    const destinationList  = listCopy[result.destination.droppableId];

    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement,
    );

    //Update destinationa list with removed element 
    const destinationId = result.destination.droppableId;

    destinationUpdate(destinationId, dispatch, listCopy);

  };

  return {
    onDragEnd,
    lists,
    elements,
  };
};

function destinationUpdate(id, dispatch, listCopy) {
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
