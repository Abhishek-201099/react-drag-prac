import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const listItemsOne = ["one", "two", "three", "four", "five", "six"];
const listItemsTwo = ["red", "yellow", "green", "blue", "brown", "strawberry"];

export default function AppV2() {
  const [draggableItemsOne, setDraggableItemsOne] = useState(listItemsOne);
  const [draggableItemsTwo, setDraggableItemsTwo] = useState(listItemsTwo);

  function getItemsAndSetState(id) {
    const items =
      id.split("-").at(0) === "FIRST"
        ? [...draggableItemsOne]
        : [...draggableItemsTwo];

    return {
      items,
      setState:
        id.split("-").at(0) === "FIRST"
          ? setDraggableItemsOne
          : setDraggableItemsTwo,
    };
  }

  function handleDragEnd(results) {
    const { source, destination, type } = results;

    if (!source || !destination) return;

    // ONLY WANT TO PERFORM DND IF DROPPABLE AREA IS OF TYPE DARKGONE
    if (type !== "darkgone") return;

    // 1. For same droppable area
    if (source.droppableId === destination.droppableId) {
      const { items, setState } = getItemsAndSetState(source.droppableId);
      const draggedItem = items[source.index];
      items.splice(source.index, 1);
      items.splice(destination.index, 0, draggedItem);
      setState(items);
    } else {
      // 2. For different droppable area
      const { items: sourceItems, setState: setSourceState } =
        getItemsAndSetState(source.droppableId);
      const { items: destItems, setState: setDestState } = getItemsAndSetState(
        destination.droppableId
      );
      const draggedItem = sourceItems[source.index];
      sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, draggedItem);
      setSourceState(sourceItems);
      setDestState(destItems);
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
