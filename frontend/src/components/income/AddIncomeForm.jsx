import { useState } from "react";
import { Input } from "../inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleInputChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };
  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleInputChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={({ target }) => handleInputChange("source", target.value)}
        label="income source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleInputChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleInputChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddIncome}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
