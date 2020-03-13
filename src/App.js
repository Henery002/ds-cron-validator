import React from "react";
import isValidCron from './cron'
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h2>Test cron-validator</h2>
      {console.log(isValidCron('1-**-1 * * * *'))}
    </div>
  );
}
