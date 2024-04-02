import { gql } from "apollo-server-express";
import { DeleteBookResultScalar } from "../scalars/DeleteBookScalar.js";
import { executeQuery } from "../config/query.js";

const typeDefs = gql`
  type Book {
    id: ID! # Add an ID field (optional, recommended for uniqueness)
    title: String!
    author: String!
  }

  type DeleteBookResult {
    success: Boolean! # Whether the deletion was successful
    message: String! # Optional message (e.g., "Book deleted" or "Book not found")
    # Additional fields if needed (e.g., affectedRows)
    error: String
  }

  type AddBookResult {
    success: Boolean!
    message: String!
    error: String
  }

  type UpdateBookResult {
    success: Boolean!
    message: String!
    error: String
  }

  type Query {
    hello: String!
    books: [Book!]! # Non-null list of Book objects
    book(id: ID!): Book # Optional: Get a book by its ID
  }

  type Mutation {
    deleteBook(id: ID!): DeleteBookResult! # Return true/false for success
    addBook(title: String!, author: String!): AddBookResult!
    updateBook(id: ID!, title: String!, author: String!): UpdateBookResult!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!!",
    books: async () => {
      const sql = "SELECT * FROM books";
      // const [rows] = await pool.execute(sql);
      const data = await executeQuery(sql);
      return data.map((row) => ({ id: row.id.toString(), ...row }));
      // return rows;
    },

    book: async (parent, args) => {
      const sql = "SELECT * FROM books WHERE id = ?";
      // const [rows] = await pool.execute(sql, [args.id]);
      const data = await executeQuery(sql, [args.id]);
      return data.length ? data[0] : null; // Return book object or null
    },
  },

  Mutation: {
    deleteBook: async (parent, args) => {
      const sql = "DELETE FROM books WHERE id = ?";
      try {
        const data = await executeQuery(sql, [args.id]);
        if (data.affectedRows === 1) {
          return {
            success: true,
            message: "Book Deleted successfully",
          };
        } else {
          return {
            success: false,
            message: "Failed to Delete book",
          };
        }
      } catch (error) {
        console.log(error);
      }
    },

    addBook: async (parent, args) => {
      const { title, author } = args;
      const sql = "INSERT INTO books (title, author) VALUES (?, ?)";
      try {
        const data = await executeQuery(sql, [title, author]);
        if (data.affectedRows === 1) {
          return {
            success: true,
            message: "Book added successfully",
          };
        } else {
          return {
            success: false,
            message: "Failed to add book",
          };
        }
      } catch (error) {
        console.log(`Error:${error}`);
        return {
          success: false,
          message: "An error occurred while adding the book",
          error: error.message,
        };
      }
    },

    updateBook: async (parent, args) => {
      const { id, title, author } = args;
      const sql = "UPDATE books SET title=?, author = ? WHERE id = ?";
      try {
        const data = await executeQuery(sql, [title, author, id]);
        if (data.affectedRows === 1) {
          // Book updated successfully
          return {
            success: true,
            message: "Book updated successfully",
          };
        } else {
          // Book with the given ID not found
          return {
            success: false,
            message: "Book not found or failed to update",
          };
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export { typeDefs, resolvers };
