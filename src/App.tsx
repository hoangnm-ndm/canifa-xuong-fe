import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/AuthForm";
import LayoutAdmin from "./components/LayoutAdmin";
import LayoutClient from "./components/LayoutClient";
import ProductForm from "./components/ProductForm";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<LayoutClient />}>
					<Route index element={<Home />} />
				</Route>

				<Route path="/login" element={<AuthForm isLogin />} />
				<Route path="/register" element={<AuthForm />} />

				<Route path="/admin" element={<LayoutAdmin />}>
					<Route index element={<Dashboard />} />
					<Route path="/admin/product-add" element={<ProductForm />} />
					<Route path="/admin/product-edit/:id" element={<ProductForm />} />
				</Route>

				<Route path="*" element={<Notfound />} />
			</Routes>
		</>
	);
}

export default App;
