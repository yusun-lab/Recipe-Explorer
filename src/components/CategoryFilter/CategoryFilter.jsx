import React, { useEffect, useState } from "react";
import "./CategoryFilter.css";

const CategoryFilter = ({ onFilter }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    // const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    // const data = await response.json();
    // setCategories(data.categories);

    // Add a try-catch block to handle errors
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      } 
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error); 
    }
  };

  return (
    <section className="category-filter">
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option 
            key={category.idCategory} 
            value={category.strCategory}
          >
            {category.strCategory}
          </option>
        ))}
      </select>
    </section>
  );
};

export default CategoryFilter;
