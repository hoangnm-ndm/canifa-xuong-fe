import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import Notfound from "./pages/Notfound";
import { Product } from "./interfaces/Product";
import { useEffect, useState } from "react";
import { instance } from "./api";
import ProductForm from "./components/ProductForm";
import AuthForm from "./components/AuthForm";
import Header from "./components/layouts/Header";
import LayoutClient from "./components/LayoutClient";
import LayoutAdmin from "./components/LayoutAdmin";

function App() {
	const [products, setProducts] = useState<Product[]>([]);
	const nav = useNavigate();
	const fetchProducts = async () => {
		const { data } = await instance.get(`/products`);
		console.log(data);
		setProducts(data.data);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleRemove = async (_id: any) => {
		if (confirm("Are you sure?")) {
			await instance.delete(`/products/${_id}`);
			setProducts(products.filter((item) => item._id !== _id));
		}
	};

	const onSubmitProduct = async (data: Product) => {
		if (data._id) {
			// logic edit
			await instance.patch(`/products/${data._id}`, { ...data, _id: undefined });
			fetchProducts();
		} else {
			// logic add
			const res = await instance.post(`/products`, data);
			setProducts([...products, res.data.data]);
		}
		nav("/admin");
	};
	return (
		<>
			<Routes>
				<Route path="/" element={<LayoutClient />}>
					<Route index element={<Home />} />
				</Route>

				<Route path="/login" element={<AuthForm isLogin />} />
				<Route path="/register" element={<AuthForm />} />

				<Route path="/admin" element={<LayoutAdmin />}>
					<Route index element={<Dashboard products={products} onRemove={handleRemove} />} />
					<Route path="/admin/product-add" element={<ProductForm onSubmit={onSubmitProduct} />} />
					<Route path="/admin/product-edit/:id" element={<ProductForm onSubmit={onSubmitProduct} />} />
				</Route>

				<Route path="*" element={<Notfound />} />
			</Routes>
		</>
	);
}

export default App;
