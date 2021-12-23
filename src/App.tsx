import React from "react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import ProductForm from "./components/product/form";
import ProductTable from "./components/product/table";
import ApplicationBar from "./components/app-bar";

function App() {
  return (
    <React.Fragment>
      <CssBaseline>
        <ApplicationBar />
        <br />
        <ProductForm />
        <br />
        <ProductTable />
      </CssBaseline>
    </React.Fragment>
  );
}

export default App;
