import React, { useState } from "react";
import DatePicker from "react-datepicker";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  handleChange = (date) => {
    setDate(date);
  };

  return <DatePicker selected={date} onChange={handleChange} />;
};

export default Calendar;
