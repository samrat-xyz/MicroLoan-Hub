import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, FileCheck, Clock, XCircle, Users } from "lucide-react";

function ManagerHome() {
  const [stats, setStats] = useState(null);
  const [recentLoans, setRecentLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchManagerDashboard();
  }, []);

  const fetchManagerDashboard = async () => {
    try {
      // Manager should see ALL applied loans
      const res = await axios.get("https://loan-link-server-rose.vercel.app/applied-loans");

      const allApplications = res.data;

      // Count loan status
      const pending = allApplications.filter((l) => l.status === "Pending");
      const approved = allApplications.filter((l) => l.status === "Approved");
      const rejected = allApplications.filter((l) => l.status === "Rejected");

      // Recent 5 applications
      const sorted = [...allApplications]
        .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
        .slice(0, 5);

      setStats({
        total: allApplications.length,
        pending: pending.length,
        approved: approved.length,
        rejected: rejected.length,
      });

      setRecentLoans(sorted);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-primary">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-primary mb-6 ">
        Manager Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="p-5 bg-base-200 rounded-xl shadow flex items-center gap-4">
          <Users size={36} className="text-primary" />
          <div>
            <h2 className="text-xl font-bold">{stats.total}</h2>
            <p className="text-sm opacity-70">Total Applications</p>
          </div>
        </div>

        <div className="p-5 bg-yellow-200 rounded-xl shadow flex items-center gap-4">
          <Clock size={36} className="text-yellow-800" />
          <div>
            <h2 className="text-xl font-bold">{stats.pending}</h2>
            <p className="text-sm opacity-70">Pending</p>
          </div>
        </div>

        <div className="p-5 bg-green-200 rounded-xl shadow flex items-center gap-4">
          <FileCheck size={36} className="text-green-800" />
          <div>
            <h2 className="text-xl font-bold">{stats.approved}</h2>
            <p className="text-sm opacity-70">Approved</p>
          </div>
        </div>

        <div className="p-5 bg-red-200 rounded-xl shadow flex items-center gap-4">
          <XCircle size={36} className="text-red-800" />
          <div>
            <h2 className="text-xl font-bold">{stats.rejected}</h2>
            <p className="text-sm opacity-70">Rejected</p>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Recent Loan Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="table bg-base-200 rounded-xl">
          <thead className="text-primary text-sm">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Loan Title</th>
              <th>Status</th>
              <th>Applied At</th>
            </tr>
          </thead>
          <tbody>
            {recentLoans.map((loan, index) => (
              <tr key={loan._id}>
                <td>{index + 1}</td>
                <td>{loan.userEmail}</td>
                <td>{loan.loanTitle}</td>
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

export default ManagerHome;
