import { useRef, useState } from "react";

// SWAPPING VALUES
export function DragIt(listItems) {
  const [draggableItems, setDraggableItems] = useState(listItems);

  const draggedItem = useRef(0);
  const draggedOverItem = useRef(0);

  function handleDragStart(index) {
    draggedItem.current = index;
  }
  function handleDragEnter(index) {
    draggedOverItem.current = index;
  }

  function handleDragEnd() {
    const draggableClones = [...draggableItems];
    [
      draggableClones[draggedItem.current],
      draggableClones[draggedOverItem.current],
    ] = [
      draggableClones[draggedOverItem.current],
      draggableClones[draggedItem.current],
    ];
    console.log("changed after drag : ", draggableClones);
    setDraggableItems(draggableClones);
  }

  return { draggableItems, handleDragStart, handleDragEnter, handleDragEnd };
}

// RE-OREDERING VALUES
export function DragItOne(listItems) {
  const [draggableItems, setDraggableItems] = useState(listItems);
  const [draggedItem, setDraggedItem] = useState(null);

  function handleDragStart(index) {
    setDraggedItem(index);
  }

  function handleDragOver(index) {
    if (draggedItem === null || draggedItem === index) {
      return;
    }
    const updatedItems = [...draggableItems];
    const draggedElement = updatedItems[draggedItem];
    updatedItems.splice(draggedItem, 1);
    updatedItems.splice(index, 0, draggedElement);

    setDraggedItem(index);
    setDraggableItems(updatedItems);
  }

  function handleDragEnd() {
    setDraggedItem(null);
  }

  return { draggableItems, handleDragStart, handleDragOver, handleDragEnd };
}
