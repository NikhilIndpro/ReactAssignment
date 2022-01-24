import { Droppable } from 'react-beautiful-dnd';
import ListItem from './ListIteam';
import React from 'react';
import { ColumnHeader, DroppableStyles } from './styles';

const DraggableElement = ({ prefix, elements }) => {
  return (
    <DroppableStyles>
      <ColumnHeader>{prefix}</ColumnHeader>
      <Droppable droppableId={`${prefix}`}>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements &&
              elements.map((item, index) => (
                <ListItem key={item.id} item={item} index={index} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DroppableStyles>
  );
};

export default DraggableElement;
