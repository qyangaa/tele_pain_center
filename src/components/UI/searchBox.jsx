import React from "react";
import { Button, FormControl } from "react-bootstrap";

const SearchBox = ({ value, onChange, onSubmit }) => {
  return (
    <form className="input-bar">
      <FormControl
        type="text"
        name="query"
        placeholder="Search For Provider"
        className="input-box"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <Button onClick={() => onSubmit()}>Search</Button>
    </form>
  );
};

export default SearchBox;
