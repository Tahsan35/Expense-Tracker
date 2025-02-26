import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update the image state
      setImage(file);

      // Generate preview URL from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <div
        className="mt-2 flex flex-col items-center justify-center w-[70%] h-auto border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
        onClick={onChooseFile}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {previewUrl ? (
          <div className="relative w-32 h-32">
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-full h-full object-cover rounded-full"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 pl-2">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotSelector;
