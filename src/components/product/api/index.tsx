import { Product } from "../types";

const BASE_URL = "http://localhost:8080/product";

async function findAll(): Promise<Product[]> {
  const response = await fetch(BASE_URL, {
    method: "GET",
  });

  return await response.json();
}

async function getById(productId: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: "GET",
  });

  return await response.json();
}

async function getByCategory(productCategory: string): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/category/${productCategory}`, {
    method: "GET",
  });

  return await response.json();
}

type CreateProductRequest = {
  productName: string;
  productQuantity: number;
  productCategory: string;
  productDescription: string;
};
type CreateProductResponse = {
  product: Product;
};
async function createProduct(
  request: CreateProductRequest
): Promise<CreateProductResponse> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(JSON.stringify(request));
  return await response.json();
}

const client = {
  findAll,
  getById,
  getByCategory,
  createProduct,
  //updateProduct,
  //deleteProduct,
};

export default client;
