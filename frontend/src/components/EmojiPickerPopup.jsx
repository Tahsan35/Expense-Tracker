import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";
import { useState } from "react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        className="cursor-pointer flex items-center gap-4"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-2xl text-primary">
          {icon ? (
            <img src={icon} alt="Icon" className="w-10 h-10" />
          ) : (
            <LuImage className="text-gray-500 text-xl" />
          )}
        </div>

        <p className="text-sm text-gray-600">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        <div className="relative">
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 right-2 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => {
              onSelect(emoji?.imageUrl || "");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
