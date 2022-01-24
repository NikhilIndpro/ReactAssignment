import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Avatar, DragItem, CardHeader, CardFooter, Author } from './styles';

const ListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardHeader>Content</CardHeader>
            <CardFooter>
              <span>{item.title}</span>
              <Author>
                {item.id}
                <Avatar src={item.url} />
              </Author>
            </CardFooter>
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
