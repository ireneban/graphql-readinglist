import React, { useMemo, useCallback, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

const getOptions = (loading, error, data) => {
  if (loading) {
    return <option disable>Loading Author...</option>;
  } else if (error) {
    return <option disable>Error loading Authors</option>;
  } else {
    return data.authors.map(({ name, id }) => {
      return (
        <option key={id} value={id}>
          {name}
        </option>
      );
    });
  }
};

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");

  const options = useMemo(() => getOptions(loading, error, data), [
    loading,
    error,
    data
  ]);

  const nameCB = useCallback(e => setName(e.target.value), []);
  const genreCB = useCallback(e => setGenre(e.target.value), []);
  const authorCB = useCallback(e => setAuthor(e.target.value), []);
  const addCB = useCallback(
    e => {
      e.preventDefault();
      addBook({
        variables: {
          name,
          genre,
          authorId
        },
        refetchQueries: [{ query: getBooksQuery }]
      });
    },
    [name, genre, author, addBook]
  );

  return (
    <form id="add-book" onSubmit={addCB}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={nameCB} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={genreCB} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={authorCB}>
          <option>Select Author</option>
          {options}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
