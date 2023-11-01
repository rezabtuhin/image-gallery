import { useState } from "react";
import { data } from "./data";
import ImageContainer from "./container/ImageContainer";
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

    return (
        <div className="m-5 bg-white">
            <div className="header p-5 flex items-center justify-between border-b-[1px] border-gray-600">
                <h1 className="font-bold">{textToShow}</h1>
                <h1 className={`text-red-600 ${show} delete-btn`} onClick={deleteImage}>Delete files</h1>
            </div>
            <div className="img-body p-4">
                {image.map((img) => (
                    <ImageContainer
                        key={img.id}
                        img={img.name}
                        imageId={img.id}
                        onCheckboxChange={handleCheckboxChange}
                        isChecked={deleteItem.includes(img.id)}
                    />
                ))}
            </div>
        </div>
    );
}
