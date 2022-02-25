import React from 'react'

export default function SearchBox({ search, handleSearchChange, handleSubmit }) {
  
  
  return (
    <div>
      <form className="form-inline justify-content-center m-2">
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="search"
        />
        <button
          onClick={handleSubmit}
          type="submit"
          style={{ cursor: "pointer" }}
        >
          Go
        </button>
      </form>
    </div>
  );
}
