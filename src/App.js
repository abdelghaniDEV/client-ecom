import "./App.css";
import Header from "./componnent/Header";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductDetail from "./componnent/ProductDetail";
import { useEffect } from "react";
import { fetchProducts } from "./rtlk/slices/products-slice";
import { useDispatch, useSelector } from "react-redux";
import Shop from "./pages/Shop";
import Products from "./pages/Products";
import { fetchCatrgpries } from "./rtlk/slices/categories-slice";
import Footer from "./componnent/Footer";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import SucessPayent from "./componnent/SucessPayent";
import { Helmet } from 'react-helmet';
import { fetchSettings } from "./rtlk/slices/settings-slice";
import { fetchTemplate } from "./rtlk/slices/template.slice";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCatrgpries());
    dispatch(fetchSettings())
    dispatch(fetchTemplate())
  }, []);
  const settings = useSelector((state) => state.settings)
  console.log(settings)
  useEffect(() => {
    // Scroll to top on pathname change
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="overflow-hidden">
      <Header />
      <Helmet>
        <title>{settings.storeName}</title>
        <meta name="description" content={settings.storeDescription} />
        <link rel="icon" type="image/png" href={settings.storeIcon}  />
      </Helmet>
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
