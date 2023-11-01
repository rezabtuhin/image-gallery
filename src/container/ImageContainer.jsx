import React from "react";

const ImageContainer = (props) => {
    // eslint-disable-next-line react/prop-types
  const { imageId, onCheckboxChange, isChecked } = props;

  const handleCheckboxChange = () => {
    onCheckboxChange(imageId);
  };
  return (
      // eslint-disable-next-line react/prop-types
    <div className={`image-container ${props.index === 0 ? "col-span-2 row-span-2" : ""}`}>
      <input
        type="checkbox"
        className="overlay-checkbox"
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
      <label htmlFor="myCheckbox" className="overlay-div"></label>
      <img
          /* eslint-disable-next-line react/prop-types */
        src={props.img}
        alt="image"
      />
    </div>
  );
};

export default ImageContainer;
