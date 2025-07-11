import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between items-center w-full flex-wrap gap-4">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
          alt="Sony"
          style={{ width: "200px", objectFit: "contain" }}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
          alt="Samsung"
          style={{ width: "200px", objectFit: "contain" }}
        />
        <img
          src="https://1000logos.net/wp-content/uploads/2017/03/LG-Logo.png"
          alt="LG"
          style={{ width: "180px", objectFit: "contain" }}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          alt="Apple"
          style={{ width: "150px", objectFit: "contain" }}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
          alt="Microsoft"
          style={{ width: "150px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default Sponsored;
