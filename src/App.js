import "./App.css";
import Header from "./componnent/Header";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductDetail from "./componnent/ProductDetail";
import { useEffect } from "react";
import { fetchProducts } from "./rtlk/slices/products-slice";
import { useDispatch } from "react-redux";
import Shop from "./pages/Shop";
import Products from "./pages/Products";
import { fetchCatrgpries } from "./rtlk/slices/categories-slice";
import Footer from "./componnent/Footer";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import SucessPayent from "./componnent/SucessPayent";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCatrgpries());
  }, []);
  useEffect(() => {
    // Scroll to top on pathname change
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="overflow-hidden">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="products/:category" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<SucessPayent />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
