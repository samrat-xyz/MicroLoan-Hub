import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Loader2 } from "lucide-react";

function MyAppliedLoan() {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchAppliedLoans = async () => {
      try {
        const res = await axios.get("https://loan-link-server-rose.vercel.app/applied-loans", {
          params: { email: user.email },
        });
        setLoans(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedLoans();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-primary">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );
  }

  if (loans.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        You have not applied for any loans yet.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen">
      <h2 className="text-3xl font-bold text-primary mb-6">
        My Applied Loans
      </h2>

      <div className="overflow-x-auto bg-base-200 p-4 rounded-xl shadow-md">
        <table className="table w-full">
          <thead className="text-primary">
            <tr>
              <th>#</th>
              <th>Loan Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Applied On</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <td>{index + 1}</td>
                <td>{loan.loanTitle}</td>
                <td>৳ {loan.loanAmount}</td>
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
                <td>{new Date(loan.appliedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAppliedLoan;
