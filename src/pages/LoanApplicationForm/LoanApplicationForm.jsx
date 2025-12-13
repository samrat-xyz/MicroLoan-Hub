import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const LoanApplicationForm = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const loan = location.state?.loan; // ✅ Loan receive correctly

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!loan) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-error">No Loan Selected!</h2>
      </div>
    );
  }

  //  Form Submit
  const onSubmit = async (data) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login before applying.",
      });
      return navigate("/login");
    }

    setLoading(true);

    const payload = {
      userEmail: user.email,
      loanTitle: loan.title,
      interestRate: loan.interestRate,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      nidPassport: data.nidPassport,
      incomeSource: data.incomeSource,
      monthlyIncome: Number(data.monthlyIncome),
      loanAmount: Number(data.loanAmount),
      loanReason: data.loanReason,
      address: data.address,
      extraNotes: data.extraNotes || "",
      status: "Pending",
      applicationFeeStatus: "Unpaid",
      appliedAt: new Date().toISOString(),
    };

    try {
      await axios.post("https://loan-link-server-five.vercel.app/applied-loan", payload);

      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Your loan application is under review.",
      });

      reset();
      
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "You Can't Apply Again For That Loan",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <p className="text-primary font-medium">Loan Summary</p>

            <div className="bg-base-200 rounded-xl shadow p-6">
              <div className="h-84 w-full mb-4 overflow-hidden rounded-lg">
                <img
                  src={loan.image}
                  alt={loan.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold mb-2">{loan.title}</h3>
              <p className="text-base-content/70 mb-4">{loan.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs">Interest Rate</p>
                  <p className="font-semibold">{loan.interestRate}%</p>
                </div>
                <div>
                  <p className="text-xs">Max Loan</p>
                  <p className="font-semibold">{loan.maxLoanLimit}</p>
                </div>
                <div>
                  <p className="text-xs">Category</p>
                  <p className="font-semibold">{loan.category}</p>
                </div>
                <div>
                  <p className="text-xs">EMI Plans</p>
                  <p className="font-semibold">
                    {loan.emiPlans?.slice(0, 3).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-primary font-medium mb-3">Apply Now</p>

            <div className="bg-base-100 rounded-xl shadow p-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  readOnly
                  value={user?.email || ""}
                  className="input input-bordered md:col-span-2"
                />
                <input
                  readOnly
                  value={loan.title}
                  className="input input-bordered"
                />
                <input
                  readOnly
                  value={`${loan.interestRate}%`}
                  className="input input-bordered"
                />

                <input
                  {...register("firstName", { required: true })}
                  placeholder="First Name"
                  className="input input-bordered"
                />
                <input
                  {...register("lastName", { required: true })}
                  placeholder="Last Name"
                  className="input input-bordered"
                />
                <input
                  {...register("contactNumber", { required: true })}
                  placeholder="Contact Number"
                  className="input input-bordered"
                />
                <input
                  {...register("nidPassport", { required: true })}
                  placeholder="NID / Passport"
                  className="input input-bordered"
                />
                <input
                  {...register("incomeSource", { required: true })}
                  placeholder="Income Source"
                  className="input input-bordered"
                />
                <input
                  type="number"
                  {...register("monthlyIncome", { required: true })}
                  placeholder="Monthly Income"
                  className="input input-bordered"
                />
                <input
                  type="number"
                  {...register("loanAmount", { required: true })}
                  placeholder="Loan Amount"
                  className="input input-bordered"
                />

                <input
                  {...register("loanReason", { required: true })}
                  placeholder="Reason for Loan"
                  className="input input-bordered md:col-span-2"
                />
                <input
                  {...register("address", { required: true })}
                  placeholder="Address"
                  className="input input-bordered md:col-span-2"
                />

                <textarea
                  {...register("extraNotes")}
                  className="textarea textarea-bordered md:col-span-2"
                  rows={4}
                  placeholder="Extra notes (optional)"
                />

                <div className="md:col-span-2 text-right">
                  <button
                    type="submit"
                    className={`btn btn-primary ${loading ? "loading" : ""}`}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanApplicationForm;
