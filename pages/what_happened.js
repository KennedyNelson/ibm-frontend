import { useRouter } from "next/dist/client/router";
import React from "react";

const what_happened = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-4">
      <p className="text-3xl text-center mb-4">Do you know what Happened?</p>
      <button
        // type="submit"
        onClick={() => router.push("/categories")}
        class="inline-flex justify-center w-32 py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Yes
      </button>
      <button
        // type="submit"
        onClick={() => router.push("/questions")}
        class="inline-flex justify-center w-32 py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        No
      </button>
    </div>
  );
};

export default what_happened;
