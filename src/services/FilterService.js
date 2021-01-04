import React from "react";
const filters = [
  {
    _id: "specialty",
    title: "Specialty",
    options: [
      {
        name: "fibromyalgia",
        _id: "fibromyalgia",
      },
      {
        name: "arthritis",
        _id: "arthritis",
      },
      {
        name: "Pain Psychology",
        _id: "pain_phychology",
      },
      {
        name: "Occupational Therapy",
        _id: "occupational_therapy",
      },
      {
        name: "Physical Therapy",
        _id: "physical_therapy",
      },
    ],
  },
  {
    _id: "city",
    title: "City",
    options: [
      {
        name: "Mountain View",
        _id: "mountain_view",
      },
      {
        name: "Fremont",
        _id: "fremont",
      },
    ],
  },
];
const getFilters = () => {
  return filters;
};

export default getFilters;
