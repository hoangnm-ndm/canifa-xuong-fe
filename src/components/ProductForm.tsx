import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { productSchema } from "../utils/validation";
import { Product } from "../interfaces/Product";
import { useEffect } from "react";
import { instance } from "../api";

type Props = {
	onSubmit: (data: Product) => void;
};

const ProductForm = ({ onSubmit }: Props) => {
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

	return (
		<>
			<form onSubmit={handleSubmit((data) => onSubmit({ ...data, _id: id }))}>
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
					<button className="btn btn-primary w-100">{id ? "Edit product" : "Add product"}</button>
				</div>
			</form>
		</>
	);
};

export default ProductForm;
