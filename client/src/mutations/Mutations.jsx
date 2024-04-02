import { gql } from "@apollo/client";

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      success
      message
      error
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      success
      message
      error
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $author: String!) {
    updateBook(id: $id, title: $title, author: $author) {
      success
      message
      error
    }
  }
`;

export { DELETE_BOOK, ADD_BOOK, UPDATE_BOOK };
