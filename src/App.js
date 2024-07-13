import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import DetailPage from "./pages/Detail";
import ViewOrders from "./pages/ViewOrders";
import ViewOrderDetails from "./pages/ViewOrderDetails";



function App() {



  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/list" element={<ListingPage/>} />
        <Route path="/book/view/:bookId" element={<DetailPage/>} />
        <Route path="/book/orders" element={<ViewOrders/>} />
        <Route path="/book/orders/:bookId" element={<ViewOrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
