// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const ImageContainer = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    // eslint-disable-next-line react/prop-types
  } = useSortable({ id: props.imageId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundImage: `url(${props.img})`
  };
  // eslint-disable-next-line react/prop-types
  const { imageId, onCheckboxChange, isChecked } = props;

  const handleCheckboxChange = () => {
    onCheckboxChange(imageId);
  };
  return (
    <div
      className={`image-container ${
        props.index === 0 ? "col-span-2 row-span-2" : ""
      }`}
    >
      <input
        type="checkbox"
        className={`${isDragging ? "hidden-checkbox" : "overlay-checkbox"}`}
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <label htmlFor="myCheckbox" className="overlay-div"></label>
        <img
          /* eslint-disable-next-line react/prop-types */
          src={props.img}
          alt="image"
        />
      </div>
    </div>
  );
};

export default ImageContainer;
