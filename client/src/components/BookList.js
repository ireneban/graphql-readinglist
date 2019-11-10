import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries"; /* import getBooksQuery */
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null /* Selected status for showing book details */
    };
  }
  displayBooks() {
    var data = this.props.data;
    console.log(data);
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      /* If data was loaded */
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={e => {
              this.setState({
                selected: book.id
              }); /* put book Id for selected status */
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        {/* pass selected state into BookDetails component */}
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
