import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";

function LoansCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://loan-link-server-rose.vercel.app/loans")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div>
      <ul className="bg-base-100 shadow-md rounded-xl p-3 space-y-3">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/loan-detail/${category._id}`}
            className="block"
          >
            <li className="flex items-center justify-between gap-4 bg-base-200 hover:bg-base-300 transition p-4 rounded-lg cursor-pointer">
              
              {/* Title */}
              <p className="text-base md:text-lg font-medium">
                {category.title}
              </p>

              {/* Icon */}
              <span className="flex items-center justify-center text-xl">
                <IoIosArrowForward />
              </span>

            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default LoansCategory;
