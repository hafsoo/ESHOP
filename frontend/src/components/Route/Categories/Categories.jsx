import React from "react";
import styles from "../../../styles/styles";
import { brandingData } from "../../../static/brandingData";
import { categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  // Fix: define handleSubmit outside of map
  const handleSubmit = (title) => {
    navigate(`/products?category=${title}`);
  };

  return (
    <>
      {/* BRANDING Section */}
      <div className={`${styles.section} hidden sm:block`}>
        <div className="branding my-12 flex flex-wrap justify-between gap-4 w-full shadow-sm bg-white p-5 rounded-md">
          {brandingData.map((item) => (
            <div
              className="flex items-start w-full sm:w-[48%] md:w-[32%] lg:w-[18%]"
              key={item.id}
            >
              {item.icon}
              <div className="px-3">
                <h3 className="font-bold text-sm md:text-base">{item.title}</h3>
                <p className="text-xs md:text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES Section */}
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => (
              <div
                className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                key={i.id}
                onClick={() => handleSubmit(i.title)} // FIXED: use arrow function
              >
                <h5 className="text-[18px] leading-1.3">{i.title}</h5>
                <img
                  src={i.image_Url}
                  className="w-[120px] object-cover"
                  alt={i.title}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
