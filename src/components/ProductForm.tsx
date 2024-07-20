import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { productSchema } from "../utils/validation";
import { Product } from "../interfaces/Product";
import { useContext, useEffect, useState } from "react";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";
import instance from "../api";
import { Category } from "../interfaces/Category";

const ProductForm = () => {
	const { handleProduct } = useContext(ProductContext) as ProductContextType;
	const [categories, setCategories] = useState<Category[]>([]);
	const { id } = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<Product>({
		resolver: zodResolver(productSchema),
	});

	if (id) {
		useEffect(() => {
			(async () => {
				const { data } = await instance.get(`/products/${id}`);
				reset(data.data);
			})();
		}, [id]);
	}

	useEffect(() => {
		(async () => {
			const { data } = await instance.get(`/categories`);
			console.log(data);
			setCategories(data.data);
		})();
	}, []);

	return (
		<>
			<form onSubmit={handleSubmit((data) => handleProduct({ ...data, _id: id }))}>
				<h1>{id ? "Edit product" : "Add product"}</h1>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						title
					</label>
					<input className="form-control" type="text" {...register("title", { required: true })} />
					{errors.title && <span className="text-danger">{errors.title.message}</span>}
				</div>

				<div className="mb-3">
					<label htmlFor="price" className="form-label">
						price
					</label>
					<input
						className="form-control"
						type="number"
						{...register("price", { required: true, valueAsNumber: true })}
					/>
					{errors.price && <span className="text-danger">{errors?.price.message}</span>}
				</div>

				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						description
					</label>
					<textarea className="form-control" rows={4} {...register("description")} />
				</div>

				<div className="mb-3">
					<label htmlFor="" className="form-label">
						Category
					</label>
					<select {...register("category")} className="form-control">
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.title}
							</option>
						))}
					</select>
				</div>

				<div className="mb-3">
					<button className="btn btn-primary w-100">{id ? "Edit product" : "Add product"}</button>
				</div>
			</form>
		</>
	);
};

export default ProductForm;
