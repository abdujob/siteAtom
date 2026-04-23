const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "Request failed");
  }

  if (res.status === 204) return null;
  return res.json();
}

export const adminApi = {
  getCategories: () => fetchApi("/categories"),
  createCategory: (data: any) => fetchApi("/categories", { method: "POST", body: JSON.stringify(data) }),
  updateCategory: (id: number, data: any) => fetchApi(`/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCategory: (id: number) => fetchApi(`/categories/${id}`, { method: "DELETE" }),

  getProducts: () => fetchApi("/products"),
  createProduct: (formData: FormData) => fetch(`${API_BASE_URL}/products`, { 
    method: "POST", 
    body: formData,
    headers: { "Accept": "application/json" } // Don't set Content-Type for FormData
  }).then(res => res.json()),
  updateProduct: (id: number, formData: FormData) => fetch(`${API_BASE_URL}/products/${id}?_method=PUT`, { 
    method: "POST", 
    body: formData,
    headers: { "Accept": "application/json" }
  }).then(res => res.json()),
  deleteProduct: (id: number) => fetchApi(`/products/${id}`, { method: "DELETE" }),
};
