import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import instance from "../api";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../interfaces/User";
import { loginSchema, registerSchema } from "../utils/validation";
import { Link } from "react-router-dom";

type Props = {
	isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
	const { login: contextLogin } = useAuth();
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<User>({
		resolver: zodResolver(isLogin ? loginSchema : registerSchema),
	});

	const onSubmit = async (data: User) => {
		try {
			if (isLogin) {
				const res = await instance.post(`/auth/login`, data);
				contextLogin(res.data.accessToken, res.data.user);
			} else {
				const res = await instance.post(`/auth/register`, { email: data.email, password: data.password });
				alert(res.data.message);
			}
		} catch (error: any) {
			console.log(error);
			alert(error.response?.data?.message || "Error!");
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1>{isLogin ? "Login" : "Register"}</h1>
			<div className="mb-3">
				<label htmlFor="email" className="form-label">
					email
				</label>
				<input type="email" className="form-control" {...register("email", { required: true })} />
				{errors.email && <span className="text-danger">{errors.email.message}</span>}
			</div>

			<div className="mb-3">
				<label htmlFor="password" className="form-label">
					password
				</label>
				<input type="password" className="form-control" {...register("password", { required: true })} />
				{errors.password && <span className="text-danger">{errors.password.message}</span>}
			</div>

			{!isLogin && (
				<div className="mb-3">
					<label htmlFor="confirmPass" className="form-label">
						Confirm Password
					</label>
					<input type="password" className="form-control" {...register("confirmPass", { required: true })} />
					{errors.confirmPass && <span className="text-danger">{errors.confirmPass.message}</span>}
				</div>
			)}
			<button className="btn btn-success">{isLogin ? "Login" : "Register"}</button>
			{isLogin ? <Link to="/register">Register</Link> : <Link to="/login">Login</Link>}
		</form>
	);
};

export default AuthForm;
