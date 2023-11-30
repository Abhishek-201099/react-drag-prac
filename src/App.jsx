import { DragIt, DragItOne } from "./hooks/drag-version1";

const listItems = ["one", "two", "three", "four", "five", "six"];

export default function App() {
  // const { draggableItems, handleDragStart, handleDragEnter, handleDragEnd } =
  //   DragIt(listItems);

  const { draggableItems, handleDragStart, handleDragOver, handleDragEnd } =
    DragItOne(listItems);

  return (
    <div className="container">
      {draggableItems.map((item, index) => {
        return (
          <div
            className="list-item"
            key={item}
            draggable
            onDragStart={() => handleDragStart(index)}
            // onDragEnter={() => handleDragEnter(index)}
            onDragEnd={() => handleDragEnd()}
            onDragOver={() => handleDragOver(index)}
            // onDragOver={(e) => e.preventDefault()}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
