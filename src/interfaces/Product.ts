import { Category } from "./Category";

export interface Product {
	_id?: string;
	title: string;
	price: number;
	category?: Category;
	description?: string;
	thumbnail?: string;
	stock: number;
}
