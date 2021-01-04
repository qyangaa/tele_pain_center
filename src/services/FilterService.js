import React from "react";
const filters = [
  {
    _id: "specialty",
    title: "Specialty",
    options: [
      "fibromyalgia",
      "arthritis",
      "Pain Psychology",
      "Occupational Therapy",
    ],
  },
];
const getFilters = () => {
  return filters;
};

export default getFilters;
