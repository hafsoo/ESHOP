import React from 'react';
import { useNavigate } from 'react-router-dom';

const DropDown = ({ categoriesData, setDropDown }) => {  //for category drop don
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();  //👉 Reload the current webpage
  };

  return (
    <div className='pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm'>
      {
        categoriesData && categoriesData.map((i, index) => (
          <div
            key={index}
            className='flex items-center'
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: '25px',
                height: '25px',
                objectFit: 'contain',
                marginLeft: '10px',
                userSelect: 'none'
              }}
              alt=''
            />
            <h3 className='m-3 cursor-pointer select-none'>{i.title}</h3>
          </div>
        ))
      }
    </div>
  );
};

export default DropDown;
