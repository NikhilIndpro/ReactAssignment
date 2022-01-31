/* eslint-disable prettier/prettier */
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableElement from './draggableElement';
import { useDragAndDrop } from './hooks';
import { DragDropContextContainer, ListGrid } from './styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const onDragTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DragList(props) {
  const {
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
  } = useDragAndDrop(props);

  return (
    <DragDropContextContainer>
       <Dialog
        open={even}
        TransitionComponent={onDragTransition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Draggable element is not even, Would you like to move it?"}</DialogTitle>
        <DialogActions>
          <Button onClick={changeColumnDisagree}>Disagree</Button>
          <Button onClick={changeColumnAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeCapture={onBeforeCapture}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onBeforeDragStart={onBeforeDragStart}
      >
        <ListGrid>
          {lists.map(listKey => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}

export default DragList;
