import { Button, TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import productClient from "../api";

const validationSchema = yup.object({
  productName: yup
    .string()
    .required("Product name is required.")
    .matches(/^[a-zA-Z\s:]{3,64}$/, "Product name invalid."),
  productQuantity: yup
    .number()
    .required("Product quantity is required.")
    .min(0, "Product quantity can not be negative"),
  productCategory: yup
    .string()
    .required("Product category is required.")
    .matches(/^[a-zA-Z\s:]{3,64}$/, "Product category invalid."),
  productDescription: yup.string().required("Product description is required."),
});

type FormValues = {
  productName: string;
  productQuantity: number;
  productCategory: string;
  productDescription: string;
};

const initialValues: FormValues = {
  productName: "",
  productQuantity: 0,
  productCategory: "",
  productDescription: "",
};

function ProductForm() {
  const handleSubmit = async (
    formValues: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    await productClient.createProduct(formValues);

    helpers.resetForm({
      values: initialValues,
    });
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => {
        return (
          <form onSubmit={formikProps.handleSubmit}>
            <TextField
              name="productName"
              label="Nombre"
              variant="outlined"
              value={formikProps.values.productName}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.errors.productName !== undefined &&
                formikProps.touched.productName
              }
              helperText={formikProps.errors.productName || ""}
            />
            <TextField
              name="productQuantity"
              label="Cantidad"
              variant="outlined"
              value={formikProps.values.productQuantity}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.errors.productQuantity !== undefined &&
                formikProps.touched.productQuantity
              }
              helperText={formikProps.errors.productQuantity || ""}
            />
            <TextField
              name="productCategory"
              label="Categoria"
              variant="outlined"
              value={formikProps.values.productCategory}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.errors.productCategory !== undefined &&
                formikProps.touched.productCategory
              }
              helperText={formikProps.errors.productCategory || ""}
            />
            <TextField
              name="productDescription"
              label="Descripción"
              variant="outlined"
              value={formikProps.values.productDescription}
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
              error={
                formikProps.errors.productDescription !== undefined &&
                formikProps.touched.productDescription
              }
              helperText={formikProps.errors.productDescription || ""}
            />

            <Button
              variant="text"
              type="submit"
              disabled={!formikProps.isValid || !formikProps.dirty}
            >
              Agregar
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}

export default ProductForm;
