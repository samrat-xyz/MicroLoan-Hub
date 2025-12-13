import React, { useState } from "react";
import { FaUser, FaLock, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../utils";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { googleLogin, updateUserProfile, createUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const { fullName, photo, email, role, password } = data;
    const imageFile = photo[0];

    try {
      const imageURL = await imageUpload(imageFile);
      await createUser(email, password);
      await updateUserProfile({ displayName: fullName, photoURL: imageURL });

      const userInfo = {
        name: fullName,
        email,
        role, // user selected role
        image: imageURL,
        createdAt: new Date(),
      };

      await axios.post("https://loan-link-server-rose.vercel.app/users", userInfo);

      Swal.fire({
        theme: "dark",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      // Backend error (manager registration denied)
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: "borrower",
        createdAt: new Date(),
      };

      await axios.post("https://loan-link-server-rose.vercel.app/users", userInfo);

      Swal.fire({
        theme: "dark",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Full Name</label>
            <div className="flex items-center border-b border-gray-300 mt-1">
              <FaUser className="text-gray-400 mr-2" />
              <input
                {...register("fullName", { required: "Full name required" })}
                type="text"
                placeholder="Enter your full name"
                className="w-full py-2 outline-none text-sm text-black"
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
          </div>

          {/* Photo */}
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Upload Photo</label>
            <input
              {...register("photo", { required: "Photo is required" })}
              type="file"
              accept="image/*"
              className="w-full mt-2 cursor-pointer text-sm text-black"
            />
            {errors.photo && <p className="text-red-500 text-xs">{errors.photo.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Email</label>
            <div className="flex items-center border-b border-gray-300 mt-1">
              <FaUser className="text-gray-400 mr-2" />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter your email"
                className="w-full py-2 outline-none text-black text-sm"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full border-b border-gray-300 py-2 outline-none text-sm mt-1 bg-white"
            >
              <option value="">Select Role</option>
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-gray-600 text-sm">Password</label>
            <div className="flex items-center border-b border-gray-300 mt-1">
              <FaLock className="text-gray-400 mr-2" />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).+$/, message: "Password must contain 1 uppercase & 1 lowercase letter" },
                })}
                type="password"
                placeholder="Create a password"
                className="w-full py-2 outline-none text-sm"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="cursor-pointer w-full py-2 rounded-full bg-primary text-white font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Registering..." : "REGISTER"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-500 text-sm">Or Register Using</div>
        <div className="flex justify-center mt-4">
          <button onClick={handleGoogleRegister} disabled={loading} className="btn bg-white text-black border-[#e5e5e5] flex items-center gap-2 disabled:opacity-50">
            <FaGoogle /> Google Register
          </button>
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">Already have an account?</div>
        <button className="w-full mt-1 text-secondary font-semibold">
          <Link to="/login">LOGIN</Link>
        </button>
      </div>
    </div>
  );
};

export default Register;
