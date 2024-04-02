import { Link } from "react-router-dom";
import Books from "../../components/books/Books";

export default function Home() {
  return (
    <div>
      <div>
        <Link to="/add">Add Book</Link>
        <Link to="/update">Update Book</Link>
      </div>
      <h2>My First Apollo Book Library 🚀</h2>
      <Books />
    </div>
  );
}
