import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, googleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await loginUser(email, password);

      Swal.fire({
        theme: 'dark',
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: error.message || "Something went wrong!",
      });
    }
  };


  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          theme: 'dark',
          icon: "success",
          title: "Google Login Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed!",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Email</label>
            <div className="flex items-center border-b border-gray-300 mt-1">
              <FaUser className="text-gray-400 mr-2" />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter your email"
                className="w-full py-2 outline-none text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-gray-600 text-sm">Password</label>
            <div className="flex items-center border-b border-gray-300 mt-1">
              <FaLock className="text-gray-400 mr-2" />
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Enter your password"
                className="w-full py-2 outline-none text-sm"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button className="w-full py-2 rounded-full bg-primary text-white font-semibold shadow-md hover:opacity-90 transition">
            LOGIN
          </button>
        </form>

        {/* Social Login */}
        <div className="text-center mt-6 text-gray-500 text-sm">Or Login Using</div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5] flex items-center gap-2"
          >
            Google Login
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Don’t have an account?
        </div>

        <button className="w-full mt-1 text-secondary font-semibold">
          <Link to="/register">REGISTER</Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
