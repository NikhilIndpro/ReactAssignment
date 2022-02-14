/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setTodos, setInprogress, setDone } from './actions';
import { removeFromList, addToList } from './dragdropUtils';

const TODO = 'todo';
const IN_PROGRESS = 'inProgress';
const DONE = 'done';

export const useDragAndDrop = props => {
  const Todos = props.list ? props.list.filter(item => item.id <= 10) : [];

  const dispatch = useDispatch();

  const getTodo = useSelector((state: RootStateOrAny) => state.DragAndDropReducer.Todo);
  const getInProgress = useSelector(
    (state: RootStateOrAny) => state.DragAndDropReducer.In_Progress,
  );
  const getDone = useSelector((state:RootStateOrAny) => state.DragAndDropReducer.Done);

  const [elements, setElements] = useState({
    todo: getTodo,
    inProgress: getInProgress,
    done: getDone,
  });

  interface Source1 {
  droppableId: any,
  index: number,
 }
 interface Destination1  {
  droppableId: any,
  index: number,
 }
 interface RemovedElement1  {
  albumId: number,
  id: number,
  thumbnailUrl: string,
  title: string,
  url:string,

 }
  
  const [even, setEven] = useState<boolean>(false);
  const [source, setSource] = useState<Source1>({} as  Source1);
  const [destination, setDestination] = useState<Destination1>({} as  Destination1);
  const [removedElement, setRemovedElement] = useState<RemovedElement1>({} as RemovedElement1);
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

  const listCopy = { ...elements };

  const sourceId = source.droppableId;

  const destinationId = destination.droppableId;

  const sourceList = listCopy[source.droppableId];

  const destinationList = listCopy[destination.droppableId];
  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    if (parseInt(result.draggableId) % 2 === 0) {
      const [removedElement, newSourceList] = removeFromList(
        sourceList,
        result.source.index,
      );
      setRemovedElement( removedElement as RemovedElement1);

      sourceUpdate(sourceId, dispatch, newSourceList);

      listCopy[destination.droppableId] = addToList(
        destinationList,
        destination.index,
        removedElement,
      );
      destinationUpdate(destinationId, dispatch, listCopy);
    } else {
      setEven(true);

      const [removedElement, newSourceList] = removeFromList(
        sourceList,
        result.source.index,
      );
      setRemovedElement(removedElement as RemovedElement1);

      sourceUpdate(sourceId, dispatch, newSourceList);
    }
  };

  const changeColumnAgree = () => {
    listCopy[destination.droppableId] = addToList(
      destinationList,
      destination.index,
      removedElement,
    );
    destinationUpdate(destinationId, dispatch, listCopy);
    setEven(false);
  };

  const changeColumnDisagree = () => {
    listCopy[source.droppableId] = addToList(
      sourceList,
      source.index,
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

  const onDragUpdate = result => {
    if (!result.destination) {
      return;
    }
    setDestination(result.destination);
  };

  return {
    onDragEnd,
    lists,
    elements,
    onBeforeCapture,
    onBeforeDragStart,
    onDragStart,
    onDragUpdate,
    even,
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

export const useFullScreenDilog = () => {

  interface DilogElement1  {
    albumId: number,
    id: number,
    thumbnailUrl: string,
    title: string,
    url:string,
  
   }
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [dilogData, setDilogData] = useState<DilogElement1>({} as DilogElement1);
  const [value, setValue] = useState(null);

  const handleClickOpen = data => {
    setFullScreen(true);
    setDilogData(data);
  };

  const handleClose = () => {
    setFullScreen(false);
  };

  return {
    fullScreen,
    handleClickOpen,
    handleClose,
    dilogData,
    value,
    setValue,
  };
};
