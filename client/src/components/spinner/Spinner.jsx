import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <ClipLoader color={"#000"} size={50} />
    </div>
  );
}
