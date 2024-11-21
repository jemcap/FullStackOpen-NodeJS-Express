import React from "react";

const Form = ({ ...props }) => {
  const { submitFn, name, setNewName, number, setNumber } = props;
  return (
    <>
      <form onSubmit={submitFn}>
        <div>
          <div>
            name:
            <input value={name} onChange={(e) => setNewName(e.target.value)} />
          </div>
          <div>
            number:
            <input
              type="tel"
              required
              pattern="^(\+44\s?7\d{3}|\(?07\d{3}\)?|\(?\+44\s?1\d{2}\)?|\(?01\d{3}\)?|\(?01\d{2}\)?|\(?\+44\s?2\d{2}\)?|\(?02\d{3}\)?|\(?03\d{2}\)?|\(?08\d{2}\)?|\(?09\d{2}\)?)\s?\d{3,4}\s?\d{3,4}$"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Form;
