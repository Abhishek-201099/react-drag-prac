import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const listItems = ["one", "two", "three", "four", "five", "six"];

export default function AppV1() {
  const [draggableItems, setDraggableItems] = useState(listItems);

  function handleDragEnd(results) {
    const { source, destination, type } = results;

    if (type === "FIRST") {
      if (source.droppableId === destination.droppableId) {
        const updatedListItems = [...draggableItems];
        const draggedItem = updatedListItems[source.index];
        updatedListItems.splice(source.index, 1);
        updatedListItems.splice(destination.index, 0, draggedItem);
        setDraggableItems(updatedListItems);
      }
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="first-droppable"
        className="container"
        type="FIRST"
      >
        {(provided) => (
          <div
            className="container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {draggableItems.map((item, index) => {
              return (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      className="list-item"
                      key={item}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
