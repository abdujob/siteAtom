export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
export const BACKEND_URL = API_BASE_URL.replace(/\/api$/, "");

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${BACKEND_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

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
  createCategory: (formData: FormData) => fetch(`${API_BASE_URL}/categories`, { method: "POST", body: formData, headers: { "Accept": "application/json" } }).then(res => res.json()),
  updateCategory: (id: number, formData: FormData) => fetch(`${API_BASE_URL}/categories/${id}?_method=PUT`, { method: "POST", body: formData, headers: { "Accept": "application/json" } }).then(res => res.json()),
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

  getOrders: (date?: string) => fetchApi(`/orders${date ? `?date=${date}` : ""}`),
  getOrderStats: () => fetchApi("/orders/stats"),
  login: (password: string) => fetchApi("/admin/login", { method: "POST", body: JSON.stringify({ password }) }),
  verifyToken: (token: string) => fetchApi("/admin/verify", { method: "POST", body: JSON.stringify({ token }) }),
};

