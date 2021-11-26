import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";

const category = ({ conditions }) => {
  const [treatment, setTreatment] = useState({});
  console.log(conditions);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-4">
      {!treatment.name ? (
        conditions.map((condition) => (
          <div
            key={condition.id}
            className="shadow-md p-2 m-2"
            onClick={() => setTreatment(condition.treatment)}
          >
            <p className="">{condition.name}</p>
            <img src={condition.image} className="" />
          </div>
        ))
      ) : (
        <div className="shadow-md p-2 m-2">
          <p className="p-2">{treatment.name}</p>
          <img src={treatment.image} className="rounded-md" />
          <p className="p-2">{treatment.description}</p>
        </div>
      )}
    </div>
  );
};

export default category;

export const getStaticPaths = async () => {
  const categoriesList = await axios.get("http://127.0.0.1:3000/categories", {
    // headers: {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    // },
  });

  const paths = categoriesList.data?.map((category) => {
    return {
      params: { category },
    };
  });
  return { paths, fallback: false };
};

export async function getStaticProps(context) {
  const { category } = context.params;

  const res = await axios.get(
    `http://127.0.0.1:3000/categories/${category?.toUpperCase()}`,
    {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      // },
    }
  );
  console.log(res.data);
  if (!res.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { conditions: res.data }, // will be passed to the page component as props
  };
}
