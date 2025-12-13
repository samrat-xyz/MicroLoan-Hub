import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://loan-link-server-five.vercel.app/users/role/${user.email}`)
        .then((res) => {
          setRole(res.data.role);
          setRoleLoading(false);
        });
    }
  }, [user]);

  return { role, roleLoading };
};

export default useRole;
