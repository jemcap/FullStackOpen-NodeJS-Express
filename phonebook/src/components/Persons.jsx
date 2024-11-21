import React from "react";

const Persons = ({ result, onDelete }) => {
  if (result.length === 0) {
    return <main>No results found</main>;
  }
  return (
    <>
      {result.map((person) => {
        const { id, name, number } = person;
        return (
          <p key={name}>
            {name} {number}
            <button onClick={() => onDelete(id)}>delete</button>
          </p>
        );
      })}
    </>
  );
};

export default Persons;
