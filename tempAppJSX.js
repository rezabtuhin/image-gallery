import { useState } from "react";
import { data } from "./data";
import ImageContainer from "./container/ImageContainer";
import {DragDropContext, Draggable} from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./helpers/StrictModeDroppable.jsx";

export default function App() {
    const [selected, setSelected] = useState(0);
    const [image, setImage] = useState(data);
    const [deleteItem, setDeleteItem] = useState([]);

    const selectedText = selected > 1 ? " Files" : " File"

    const textToShow = selected !== 0 ? selected + selectedText + " Selected" : "Gallery";
    const show = selected === 0 ? "hidden" : "";

    const handleCheckboxChange = (imageId) => {
        if (deleteItem.includes(imageId)) {
            setDeleteItem(deleteItem.filter(id => id !== imageId));
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
    }

    const layout = "grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2";

    const onDragEnd = (result) => {
        if (!result.destination) {
            return; // Drop occurred outside the list
        }

        const updatedImage = [...image];
        const [reorderedItem] = updatedImage.splice(result.source.index, 1);
        updatedImage.splice(result.destination.index, 0, reorderedItem);

        setImage(updatedImage);
    };

    return (
        <div className="m-5 bg-white">
            <div className="header p-5 flex items-center justify-between border-b-[1px] border-gray-600">
                <h1 className="font-bold">{textToShow}</h1>
                <h1 className={`text-red-600 ${show} delete-btn`} onClick={deleteImage}>Delete files</h1>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="image-grid">
                    {(provided) => (
                        <div className={`img-body ${layout} p-4 gap-x-2`} ref={provided.innerRef} {...provided.droppableProps}>
                            {image.map((img, index) => (
                                // eslint-disable-next-line react/jsx-key
                                <Draggable key={img.id} draggableId={img.id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className={`${index === 0 ? "col-span-2 row-span-2" : ""}`}
                                        >
                                            <ImageContainer
                                                key={img.id}
                                                img={img.name}
                                                imageId={img.id}
                                                onCheckboxChange={handleCheckboxChange}
                                                isChecked={deleteItem.includes(img.id)}
                                                index={index}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
