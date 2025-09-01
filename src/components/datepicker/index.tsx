import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // ✅ fix here

  return (
    <div className="datePickerField">
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="DD/MM/YYYY"
        className="border border-gray-300 px-3 py-2 rounded-md"
      />

      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      
    </div>
  );
};

export default DatePickerComponent;
