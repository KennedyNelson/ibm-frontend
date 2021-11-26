import axios from "axios";
import React, { useEffect, useState } from "react";

const categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(async () => {
    const categoriesList = await axios.get("http://127.0.0.1:3000/categories", {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      // },
    });
    if (categoriesList.data?.length) {
      setCategories(categoriesList.data);
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-4">
      <p className="text-3xl text-center">Select the right Category</p>
      {categories.map((category) => (
        <button
          type="submit"
          className="inline-flex w-36 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default categories;
