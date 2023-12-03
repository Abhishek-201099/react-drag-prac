import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const listItemsOne = ["one", "two", "three", "four", "five", "six"];
const listItemsTwo = ["red", "yellow", "green", "blue", "brown", "strawberry"];

export default function AppV2() {
  const [draggableItemsOne, setDraggableItemsOne] = useState(listItemsOne);
  const [draggableItemsTwo, setDraggableItemsTwo] = useState(listItemsTwo);

  function handleDragEnd(results) {
    const { source, destination, type } = results;

    if (type === "darkgone") {
      // FOR THE SAME DROPPABLE CONTAINER
      if (source.droppableId === destination.droppableId) {
        const updatedItems =
          source.droppableId.split("-").at(0) === "FIRST"
            ? [...draggableItemsOne]
            : [...draggableItemsTwo];
        const draggedItem = updatedItems[source.index];
        updatedItems.splice(source.index, 1);
        updatedItems.splice(destination.index, 0, draggedItem);
        if (source.droppableId.split("-").at(0) === "FIRST") {
          setDraggableItemsOne([...updatedItems]);
        } else if (source.droppableId.split("-").at(0) === "SECOND") {
          setDraggableItemsTwo([...updatedItems]);
        }
      }

      // FOR DIFFERENT DROPPABLE CONTAINERS
      if (source.droppableId !== destination.droppableId) {
        // 1. REMOVE THE ELEMENT FROM THE SOURCE INDEX
        const sourceItems =
          source.droppableId.split("-").at(0) === "FIRST"
            ? [...draggableItemsOne]
            : [...draggableItemsTwo];
        const destinationItems =
          destination.droppableId.split("-").at(0) === "FIRST"
            ? [...draggableItemsOne]
            : [...draggableItemsTwo];

        const draggedItem = sourceItems[source.index];
        sourceItems.splice(source.index, 1);

        // 2. ADD THE ELEMENT IN THE DESTINATION INDEX
        destinationItems.splice(destination.index, 0, draggedItem);

        // 3. UPDATE THE STATE
        if (source.droppableId.split("-").at(0) === "FIRST") {
          setDraggableItemsOne([...sourceItems]);
          setDraggableItemsTwo([...destinationItems]);
        }

        if (source.droppableId.split("-").at(0) === "SECOND") {
          setDraggableItemsOne([...destinationItems]);
          setDraggableItemsTwo([...sourceItems]);
        }
      }
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="parent-container">
        <Droppable droppableId="FIRST-DROPPPABLE" type="darkgone">
          {(provided) => (
            <div className="container">
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {draggableItemsOne.map((item, index) => {
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
            </div>
          )}
        </Droppable>
        <Droppable droppableId="SECOND-DROPPPABLE" type="darkgone">
          {(provided) => (
            <div className="container">
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {draggableItemsTwo.map((item, index) => {
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
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
