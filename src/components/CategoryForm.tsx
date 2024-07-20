import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { categorySchema, productSchema } from "../utils/validation";
import { Product } from "../interfaces/Product";
import { useEffect } from "react";
import instance from "../api";
import { Category } from "../interfaces/Category";

const CategoryForm = () => {
	const { id } = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<Category>({
		resolver: zodResolver(categorySchema),
	});

	const handleCategory = async (data: Category) => {
		console.log(data);
		try {
			if (data._id) {
				const res = await instance.patch(`/categories/${data._id}`, data);
			} else {
				const res = await instance.post(`/categories`, data);
				console.log(res);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (id) {
		useEffect(() => {
			(async () => {
				const { data } = await instance.get(`/categories/${id}`);
				reset(data.data);
			})();
		}, [id]);
	}

	return (
		<>
			<form onSubmit={handleSubmit((data) => handleCategory({ ...data, _id: id }))}>
				<h1>{id ? "Edit category" : "Add category"}</h1>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						title
					</label>
					<input className="form-control" type="text" {...register("title", { required: true })} />
					{errors.title && <span className="text-danger">{errors.title.message}</span>}
				</div>

				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						description
					</label>
					<textarea className="form-control" rows={4} {...register("description")} />
				</div>

				<div className="mb-3">
					<button className="btn btn-primary w-100">{id ? "Edit category" : "Add category"}</button>
				</div>
			</form>
		</>
	);
};

export default CategoryForm;
