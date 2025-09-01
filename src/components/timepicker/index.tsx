import React, { useState } from "react";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

interface MyTimePickerProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyTimePicker: React.FC<MyTimePickerProps> = ({
  name,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleTimeChange = (newTime: any) => {
    if (moment.isMoment(newTime)) {
      const formattedTime = newTime.format("HH:mm");
      setInputValue(formattedTime);
      onChange({
        target: { name, value: formattedTime },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let typedValue = event.target.value.replace(/[^0-9]/g, "");
    if (typedValue.length > 4) {
      typedValue = typedValue.slice(0, 4);
    }

    if (typedValue.length === 4) {
      let hours = parseInt(typedValue.slice(0, 2), 10);
      let minutes = parseInt(typedValue.slice(2), 10);

      if (minutes > 59) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
      }

      if (hours >= 24) {
        hours = 23;
        minutes = 59;
      }

      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      setInputValue(formattedTime);
      onChange({
        target: { name, value: formattedTime },
      } as React.ChangeEvent<HTMLInputElement>);
    } else {
      setInputValue(typedValue);
    }
  };

  return (
    <div className="iconFields">
      <Datetime
        value={inputValue}
        onChange={handleTimeChange}
        dateFormat={false}
        timeFormat="HH:mm"
        inputProps={{
          placeholder: "HH:MM",
          onChange: handleInputChange,
          maxLength: 5,
        }}
      />
      <i className="icon icon-clock fw-400"></i>
    </div>
  );
};

export default MyTimePicker;
