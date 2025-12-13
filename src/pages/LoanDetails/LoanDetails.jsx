import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import LoansCategory from "../../components/LoansCategory/LoansCategory";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";

function LoanDetails() {
  const { id } = useParams();
  const [loan, setLoan] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetch(`https://loan-link-server-five.vercel.app/loans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoan(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full px-4 py-10 bg-base-100 ">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <LoansCategory />
        </aside>

        {/* Main Content */}
        <section className="lg:col-span-9 bg-base-200 rounded-2xl p-5 shadow-md">
          {/* Title & Description */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {loan.title}
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              {loan.description}
            </p>
          </div>

          {/* Image */}
          <div className="w-full h-[260px] md:h-[400px] lg:h-[500px] mb-6 rounded-xl overflow-hidden">
            <img
              src={loan.image}
              alt={loan.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Loan Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Info */}
            <div className="space-y-3">
              <p className="text-lg">
                <span className="font-semibold">Category:</span> {loan.category}
              </p>

              <p className="text-lg">
                <span className="font-semibold">Interest Rate:</span>{" "}
                {loan.interestRate}%
              </p>

              <p className="text-lg">
                <span className="font-semibold">Maximum Loan:</span> $
                {loan.maxLoanLimit}
              </p>

              <p className="text-lg">
                <span className="font-semibold">Created By:</span>{" "}
                {loan.createdBy}
              </p>

             
                <Link
                  to="/apply-loan"
                  state={{ loan }}
                  className="w-full mt-5 btn btn-primary text-lg flex items-center justify-center"
                >
                  Apply Now
                </Link>
           
            </div>

            {/* Right Info */}
            <div>
              {/* Required Documents */}
              <h3 className="text-xl font-bold mb-2">Required Documents</h3>
              <ul className="list-disc ml-5 space-y-1 text-base">
                {loan.requiredDocuments?.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>

              {/* EMI Plans */}
              <h3 className="text-xl font-bold mt-5 mb-2">EMI Plans</h3>
              <div className="flex flex-wrap gap-2">
                {loan.emiPlans?.map((plan, index) => (
                  <span
                    key={index}
                    className="badge badge-primary badge-outline"
                  >
                    {plan}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LoanDetails;
