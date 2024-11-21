import React from "react";

const Filter = ({ filteredName, filterFn }) => {
  return (
    <div>
      <p>
        filter shown with a{" "}
        <input
          type="text"
          value={filteredName}
          onChange={(e) => filterFn(e.target.value)}
        />
      </p>
    </div>
  );
};

export default Filter;
