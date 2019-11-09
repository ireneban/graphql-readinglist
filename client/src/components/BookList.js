import React, { useState, useCallback, useMemo } from "react";
import { getBooksQuery } from "../queries/queries";
import { useQuery } from "@apollo/react-hooks";
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState("");

  // const selectedCB = useCallback(e => setSelected(book.id))

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { books } = data;

  const bookListItems = books.map(({ id, name }) => {
    const selectedCB = useCallback(e => setSelected(id), []);
    return (
      <li key={id} onClick={selectedCB}>
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

// function BookList() {

//   const [selected, setSelected] = useState(null);

//   const displayBooks = () => {
//     var data = this.props.data;
//     if (data.loading) {
//       return <div>Loading books...</div>;
//     } else {
//       return data.books.map(book => {
//         return (
//           <li
//             key={book.id}
//             onClick={e => {
//               this.setState({ selected: book.id });
//             }}
//           >
//             {book.name}
//           </li>
//         );
//       });
//     }
//   }
//   render() {
//     return (
//       <div>
//         <ul id="book-list">{this.displayBooks()}</ul>
//         <BookDetails bookId={this.state.selected} />
//       </div>
//     );
//   }
// }

// export default graphql(getBooksQuery)(BookList);
