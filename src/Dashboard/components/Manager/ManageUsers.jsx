import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  // Logged-in user
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentEmail = currentUser?.email;

  // Fetch all users except self
  useEffect(() => {
    fetch("https://loan-link-server-five.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((u) => u.email !== currentEmail);
        setUsers(filtered);
      })
      .catch((err) => console.error(err));
  }, [currentEmail]);

  // Delete User
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      fetch(`https://loan-link-server-five.vercel.app/users/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          setUsers((prev) => prev.filter((user) => user._id !== id));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        })
        .catch(() => {
          Swal.fire("Error!", "Failed to delete user.", "error");
        });
    }
  };

  // Update Role
  const handleRoleChange = (id, role) => {
    fetch(`https://loan-link-server-five.vercel.app/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, currentUserEmail: currentEmail }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to update role");
        }
        return res.json();
      })
      .then(() => {
        setUsers((prev) =>
          prev.map((user) => (user._id === id ? { ...user, role } : user))
        );
        Swal.fire("Success!", "User role updated successfully.", "success");
      })
      .catch((err) => {
        Swal.fire("Error!", err.message, "error");
      });
  };

  return (
    <div className=" h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-base-200">
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border">
                <td>{user.name || "Unknown"}</td>
                <td>{user.email}</td>
                <td className="text-blue-600 font-semibold">{user.role}</td>

                <td>
                  <select
                    className="border px-2 py-1 rounded"
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                  >
                    <option value="borrower">Borrower</option>
                    <option value="manager">Manager</option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;
