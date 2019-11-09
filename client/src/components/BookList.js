import React, { useState, useCallback, useMemo } from "react";
import { getBooksQuery } from "../queries/queries";
import { useQuery } from "@apollo/react-hooks";
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);

  // const selectedCB = useCallback(e => setSelected(book.id))

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { books } = data;

  const bookListItems = books.map(({ id, name }) => {
    return (
      <li key={id} onClick={() => setSelected(id)}>
        {name}
      </li>
    );
  });

  return (
    <div>
      <ul id="book-list">{bookListItems}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
