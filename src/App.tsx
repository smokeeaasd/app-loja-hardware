import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateProduct from "./pages/CreateProduct";
import List from "./pages/ListProducts";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/products" Component={List}/>
          <Route path="/products/new" Component={CreateProduct}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App