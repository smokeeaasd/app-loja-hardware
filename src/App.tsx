import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./pages/List";
import CreateProduct from "./pages/CreateProduct";
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