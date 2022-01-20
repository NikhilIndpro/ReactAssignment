/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableElement from './DraggableElement';
import {useTodo} from './hooks';

const DragDropContextContainer = styled.div`
  padding: 20px;
  border: 4px solid indianred;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;




function DragList(props) {
 
  const {onDragEnd ,lists, elements, onBeforeCapture, onBeforeDragStart, onDragStart, onDragUpdate} = useTodo(props);

  
  return (  
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}  onDragStart={onDragStart} >
        <ListGrid>
          {lists.map((listKey) => (
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
