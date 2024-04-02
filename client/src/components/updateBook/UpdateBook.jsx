import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_BOOKS } from "../../queries/Queries";
import { useNavigate } from "react-router-dom";
import { UPDATE_BOOK } from "../../mutations/Mutations";
import { useLocation } from "react-router-dom";
import { GET_BOOK } from "../../queries/Queries";

export default function UpdateBook() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.state;

  // console.log(`From Update page: ${bookId}`);
  // const [updateBook, { loading, error, data }] = useMutation(UPDATE_BOOK, {
  //   refetchQueries: [GET_BOOKS],
  // });

  // const {loading, error, data} = useQuery(GET_BOOK);

  const [
    updateBook,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(UPDATE_BOOK, {
    refetchQueries: [GET_BOOK],
  });

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>{`Error: ${queryError.message}`}</p>;

  // console.log(queryData);

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <Formik
        initialValues={{
          title: queryData.book.title,
          author: queryData.book.author,
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          author: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { title, author } = values;

          setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            // console.log(title, author, bookId);
            // addBook({ variables: { title, author } });
            updateBook({ variables: { id: bookId, title, author } });
            setSubmitting(false);
            resetForm();
            navigate("/");
          }, 400);
        }}
      >
        <Form>
          <label htmlFor="title">Title</label>
          <Field name="title" type="text" />
          <ErrorMessage name="title" />

          <label htmlFor="author">Author</label>
          <Field name="author" type="text" />
          <ErrorMessage name="author" />

          <button type="submit">Update</button>
        </Form>
      </Formik>
    </div>
  );
}
