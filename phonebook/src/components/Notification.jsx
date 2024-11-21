import React from "react";

const Notification = ({ message, isSuccessful }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className={isSuccessful ? "success" : "error"}>
      <b>{message}</b>
    </div>
  );
};

export default Notification;
