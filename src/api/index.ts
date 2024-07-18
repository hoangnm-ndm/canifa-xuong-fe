import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:8000/api",
	headers: {
		"Content-Type": "application/json",
		// Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
	},
	timeout: 5000,
});

instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		console.log(token);
		console.log(`Bearer ${token}`);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default instance;
