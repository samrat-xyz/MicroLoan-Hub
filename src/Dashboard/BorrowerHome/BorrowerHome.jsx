import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

function BorrowerHome() {
  const { user } = useAuth();
  const [appliedLoans, setAppliedLoans] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://loan-link-server-five.vercel.app/applied-loans?email=${user.email}`)
        .then((res) => setAppliedLoans(res.data));
    }
  }, [user]);

  const total = appliedLoans.length;
  const approved = appliedLoans.filter(l => l.status === "Approved").length;
  const pending = appliedLoans.filter(l => l.status === "Pending").length;
  const rejected = appliedLoans.filter(l => l.status === "Rejected").length;

  return (
    <div className="space-y-8 ">

      <div className="bg-base-200 p-6 rounded-xl">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.displayName || "Borrower"} 
        </h1>
        <p className="text-sm opacity-80">{user?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-primary text-white p-5 rounded-xl">
          <h3>Total Applications</h3>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="bg-success text-white p-5 rounded-xl">
          <h3>Approved</h3>
          <p className="text-3xl font-bold">{approved}</p>
        </div>

        <div className="bg-warning text-white p-5 rounded-xl">
          <h3>Pending</h3>
          <p className="text-3xl font-bold">{pending}</p>
        </div>

        <div className="bg-error text-white p-5 rounded-xl">
          <h3>Rejected</h3>
          <p className="text-3xl font-bold">{rejected}</p>
        </div>
      </div>

      <div className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Recent Loan Applications</h2>

        {appliedLoans.length === 0 ? (
          <p>No loan applied yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Loan</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  appliedLoans.slice(0, 5).map(loan => (
                    <tr key={loan._id}>
                      <td>{loan.loanTitle}</td>
                      <td>৳ {loan.loanAmount}</td>
                      <td>
                        <span className={`badge ${
                          loan.status === "Approved"
                            ? "badge-success"
                            : loan.status === "Rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}>
                          {loan.status}
                        </span>
                      </td>
                      <td>
                        {new Date(loan.appliedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )}
      </div>

      
    </div>
  );
}

export default BorrowerHome;
