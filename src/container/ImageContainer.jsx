import React from "react";

const ImageContainer = (props) => {
    // eslint-disable-next-line react/prop-types
  const { imageId, onCheckboxChange, isChecked } = props;

  const handleCheckboxChange = () => {
    onCheckboxChange(imageId);
  };
  return (
    <div className="image-container">
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
