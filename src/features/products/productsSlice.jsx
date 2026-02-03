import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch("https://fakestoreapi.com/products")
    return await res.json();
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    filters: {
      search: "",
      sortBy: "none",
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.filters.search = "";
      state.filters.sortBy = "none";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllProducts = (state) =>
  state.products.items;

export const selectFilteredProducts = (state) => {
  const { items, filters } = state.products;

  let filtered = items.filter(p =>
    p.title.toLowerCase().includes(filters.search.toLowerCase())
  );

  if (filters.sortBy === "price_asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }

  if (filters.sortBy === "price_desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return filtered;
};

export const selectProductById = (state, productId) =>
  state.products.items.find(p => p.id === productId);

export default productsSlice.reducer;
export const { setFilter, setSortBy, resetFilters } = productsSlice.actions;
