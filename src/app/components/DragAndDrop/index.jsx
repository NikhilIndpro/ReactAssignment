/* eslint-disable prettier/prettier */
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableElement from './draggableElement';
import {useTodo} from './hooks';
import { DragDropContextContainer, ListGrid  } from './styles'




function DragList(props) {
 
  const {onDragEnd ,lists, elements } = useTodo(props);

  
  return (  
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}  >
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
