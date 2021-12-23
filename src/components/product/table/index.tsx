import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import usePromise from "../../../shared/use-promise";
import productClient from "../api";
import { Product } from "../types";

function productToRow(product: Product) {
  return (
    <TableRow key={product.productId}>
      <TableCell>{product.productId}</TableCell>
      <TableCell>{product.productName}</TableCell>
      <TableCell>{product.productQuantity}</TableCell>
      <TableCell>{product.productCategory}</TableCell>
      <TableCell>{product.productDescription}</TableCell>
    </TableRow>
  );
}

function ProductTable() {
  const { isLoading, error, data } = usePromise(() => productClient.findAll());

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h1>Hubo un error a la hora de consultar los datos.</h1>;
  }

  if (data) {
    const product = data.map((product) => productToRow(product));
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Descripcion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{product}</TableBody>
        </Table>
      </TableContainer>
    );
  }
  return null;
}

export default ProductTable;
