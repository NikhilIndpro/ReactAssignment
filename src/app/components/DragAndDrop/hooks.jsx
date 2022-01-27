/* eslint-disable prettier/prettier */
import { useState, useEffect, useMemo } from 'react';
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

  const [even, setEven] = useState(false);
  const [source, setSource] = useState({});
  const [destination, setDestination] = useState({});
  const [removedElement, setRemovedElement] = useState();
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
    setDestination(result.destination);
    setEven(true);
    const sourceId = result.source.droppableId;
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];

    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index,
    );
    setRemovedElement(removedElement);

    sourceUpdate(sourceId, dispatch, newSourceList);
  };

  const changeColumnAgree = () => {
    const listCopy = { ...elements };

    const destinationId = destination.droppableId;

    const destinationList = listCopy[destination.droppableId];

    listCopy[destination.droppableId] = addToList(
      destinationList,
      destination.index,
      removedElement,
    );
    destinationUpdate(destinationId, dispatch, listCopy);
    setEven(false);
  };

  const changeColumnDisagree = () => {
    const listCopy = { ...elements };

    const sourceId = source.droppableId;

    const sourceList = listCopy[source.droppableId];

    listCopy[source.droppableId] = addToList(
      sourceList,
      destination.index,
      removedElement,
    );
    destinationUpdate(sourceId, dispatch, listCopy);
    setEven(false);
  };

  const onBeforeCapture = result => {};

  const onBeforeDragStart = result => {
    setSource(result.source);
  };

  const onDragStart = result => {};

  const onDragUpdate = result => {};

  return {
    onDragEnd,
    lists,
    elements,
    onBeforeCapture,
    onBeforeDragStart,
    onDragStart,
    onDragUpdate,
    even,
    setEven,

    changeColumnAgree,
    changeColumnDisagree,
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
