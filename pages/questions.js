import React, { useState } from "react";
import Questions from "../components/Questions";

const questions = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Questions />
    </div>
  );
};

export default questions;
