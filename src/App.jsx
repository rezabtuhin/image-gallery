import { useState } from "react";
import { data } from "./data";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import ImageContainer from "./container/ImageContainer";
export default function App() {
  const [selected, setSelected] = useState(0);
  const [image, setImage] = useState(data);
  const [deleteItem, setDeleteItem] = useState([]);
  // const [checked, setChecked] = useState(true);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const selectedText = selected > 1 ? " Files" : " File";

  const textToShow =
    selected !== 0 ? " " + selected + selectedText + " Selected" : "Gallery";
  const show = selected === 0 ? "hidden" : "";
  const layout = "grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4";

  const handleCheckboxChange = (imageId) => {
    if (deleteItem.includes(imageId)) {
      setDeleteItem(deleteItem.filter((id) => id !== imageId));
      setSelected(selected - 1);
    } else {
      setDeleteItem([...deleteItem, imageId]);
      setSelected(selected + 1);
    }
  };

  const deleteImage = () => {
    const updatedImage = image.filter((img) => !deleteItem.includes(img.id));
    setImage(updatedImage);
    setDeleteItem([]);
    setSelected(0);
  };

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setImage((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }

  function toggleAllCheckboxes() {
    // setChecked(!checked);
  }

  return (
    <div className="m-5 bg-white">
      <div className="header p-5 flex items-center justify-between border-b-[1px] border-gray-600">
        <h1 className="font-bold">
          {selected > 0 && (
            <input type="checkbox" checked onChange={toggleAllCheckboxes} />
          )}
          {textToShow}
        </h1>
        <h1 className={`text-red-600 ${show} delete-btn`} onClick={deleteImage}>
          Delete files
        </h1>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className={`img-body p-4 ${layout}`}>
          <SortableContext items={image} strategy={rectSortingStrategy}>
            {image.map((img, index) => (
              <ImageContainer
                key={img.id}
                img={img.name}
                imageId={img.id}
                onCheckboxChange={handleCheckboxChange}
                isChecked={deleteItem.includes(img.id)}
                index={index}
              />
            ))}
          </SortableContext>
          <button className="upload-image flex flex-col items-center justify-center gap-7">
            <img src="./src/assets/icons/image.png" alt="" srcset="" />
            <h1>Add Images</h1>
          </button>
        </div>
      </DndContext>
    </div>
  );
}
