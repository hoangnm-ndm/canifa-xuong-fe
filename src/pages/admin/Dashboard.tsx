import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext, ProductContextType } from "../../contexts/ProductContext";

const Dashboard = () => {
	const { state, removeProduct } = useContext(ProductContext) as ProductContextType;

	return (
		<div>
			<h1>Hello Admin</h1>
			<Link to="/admin/product-add" className="btn btn-primary">
				Them san pham
			</Link>
			<table className="table table-bodered table-striped text-center">
				<thead>
					<tr>
						<th>ID</th>
						<th>Tittle</th>
						<th>Price</th>
						<th>Category</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{state.products.map((item) => (
						<tr key={item._id}>
							<td>{item._id}</td>
							<td>{item.title}</td>
							<td>{item.price}</td>
							<td>{item.category?.title}</td>
							<td>{item.description}</td>
							<td>
								<Link to={`/admin/product-edit/${item._id}`} className="btn btn-warning">
									Edit
								</Link>
								<button className="btn btn-danger" onClick={() => removeProduct(item._id)}>
									Remove
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Dashboard;
