import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

function ManagerAllLoans() {
  const { user } = useAuth(); // <-- manager email নেওয়ার জন্য
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Applications
  useEffect(() => {
    if (user?.email) {
      fetchAllLoans();
    }
  }, [user]);

  const fetchAllLoans = async () => {
    try {
      const res = await axios.get(
        `https://loan-link-server-rose.vercel.app/applied-loans?email=${user.email}`
      );
      setLoans(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Update Loan Status
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`https://loan-link-server-rose.vercel.app/applied-loan/${id}`, {
        status,
      });

      Swal.fire({
        icon: "success",
        title: `Status updated to ${status}`,
        timer: 1200,
        showConfirmButton: false,
      });

      fetchAllLoans(); // Refresh Data
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to update!",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-primary">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">
        All Loan Applications
      </h1>

      <div className="overflow-x-auto bg-base-200 p-4 rounded-xl shadow-md">
        <table className="table">
          <thead className="text-primary text-sm">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Loan Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <td>{index + 1}</td>
                <td>{loan.userEmail}</td>
                <td>{loan.loanTitle}</td>
                <td> {loan.loanAmount}</td>

                <td>
                  <span
                    className={`badge ${
                      loan.status === "Approved"
                        ? "badge-success"
                        : loan.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>

                <td>
                  {loan.appliedAt
                    ? new Date(loan.appliedAt).toLocaleDateString()
                    : "N/A"}
                </td>

                {/* Status Update Buttons */}
                <td className="flex gap-2">
                  <button
                    onClick={() => updateStatus(loan._id, "Approved")}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(loan._id, "Rejected")}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => updateStatus(loan._id, "Pending")}
                    className="btn btn-xs btn-warning"
                  >
                    Pending
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Data */}
        {loans.length === 0 && (
          <p className="text-center py-4 opacity-70">
            No loan applications found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ManagerAllLoans;
