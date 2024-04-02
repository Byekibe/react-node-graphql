import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ADD_BOOK } from "../../mutations/Mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_BOOKS } from "../../queries/Queries";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const navigate = useNavigate();
  const [addBook, { loading, error, data }] = useMutation(ADD_BOOK, {
    refetchQueries: [GET_BOOKS],
  });
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <Formik
        initialValues={{ title: "", author: "" }}
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
            console.log(values);
            // addBook({ variables: { title, author } });
            addBook({ variables: { title, author } });
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

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
