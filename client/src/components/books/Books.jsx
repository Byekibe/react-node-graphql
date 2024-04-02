import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../queries/Queries";
import Spinner from "../spinner/Spinner";
import { useMutation } from "@apollo/client";
import { DELETE_BOOK } from "../../mutations/Mutations";
import AddBook from "../../pages/addBook/AddBook";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [GET_BOOKS],
  });

  const handleDelete = async (bookId) => {
    console.log(bookId);
    try {
      await deleteBook({ variables: { id: bookId } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (bookId) => {
    navigate("/update", { state: bookId });
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <AddBook />
      <h2>Books</h2>
      {data?.books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <small>{book.author}</small>
          <button onClick={() => handleUpdate(book.id)}>Edit</button>
          <button onClick={() => handleDelete(book.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
