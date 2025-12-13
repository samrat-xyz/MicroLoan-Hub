import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { imageUpload } from "../../../utils";

function CreateLoans() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Upload Image
      const imageURL = await imageUpload(data.image[0]);

      const loanData = {
        title: data.title,
        description: data.description,
        amount: parseFloat(data.amount),
        interestRate: parseFloat(data.interestRate),
        image: imageURL,
        createdAt: new Date(),
      };

      await axios.post("https://loan-link-server-rose.vercel.app/loans", loanData);

      Swal.fire({
        icon: "success",
        title: "Loan Created!",
        text: "New loan has been added successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to create loan",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-lg bg-base-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">
          Create Loan
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-gray-600 font-medium">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter loan title"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-600 font-medium">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Enter loan description"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description.message}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="text-gray-600 font-medium">Amount</label>
            <input
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be at least 1" },
              })}
              type="number"
              placeholder="Enter loan amount"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs">{errors.amount.message}</p>
            )}
          </div>

          {/* Interest Rate */}
          <div>
            <label className="text-gray-600 font-medium">Interest Rate (%)</label>
            <input
              {...register("interestRate", {
                required: "Interest rate is required",
                min: { value: 0, message: "Interest rate must be positive" },
              })}
              type="number"
              placeholder="Enter interest rate"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
            {errors.interestRate && (
              <p className="text-red-500 text-xs">{errors.interestRate.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="text-gray-600 font-medium">Loan Image</label>
            <input
              {...register("image", { required: "Image is required" })}
              type="file"
              accept="image/*"
              className="w-full mt-1 cursor-pointer"
            />
            {errors.image && (
              <p className="text-red-500 text-xs">{errors.image.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Loan"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateLoans;
