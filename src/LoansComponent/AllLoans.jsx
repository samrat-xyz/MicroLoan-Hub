import { useEffect, useState } from "react";
import axios from "axios";
import LoansCard from "../components/LoansCard/LoansCard";
import Loading from "../components/Loading/Loading";

function AllLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);

    axios
      .get("https://loan-link-server-five.vercel.app/loans")
      .then((res) => {
        setLoans(res.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); 
      });
  }, []);

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        
       
        <p className="text-primary font-medium text-center flex items-center justify-center gap-2">
          What We're Offering
          <span className="w-10 h-[2px] bg-primary inline-block"></span>
        </p>

      
        <h2 className="text-4xl md:text-5xl font-bold text-base-content text-center mt-3">
        All  Loan Services
        </h2>

       
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {loans.map((loan) => (
              <LoansCard loan={loan} key={loan._id} ></LoansCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AllLoans;
