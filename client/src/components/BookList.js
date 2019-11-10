import React, { useState, useCallback, useMemo } from "react";
import { getBooksQuery } from "../queries/queries";
import { useQuery } from "@apollo/react-hooks";
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  /**
   * data: An object containing the result of GraphQL query. Defaults to undefined.
   * loading: A boolean that indicates whether that the request is in flight.
   * error: ApolloError. A runtime error with graphQLErrors and networkError properties.
   */
  const [selected, setSelected] = useState(
    null
  ); /* selected status using React Hook */

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
