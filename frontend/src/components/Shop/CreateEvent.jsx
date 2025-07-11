import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success, navigate]);

  const handleStartDateChange = (e) => {
    const start = new Date(e.target.value);
    const minEnd = new Date(start.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(start);
    setEndDate(null);
    document.getElementById("end-date").min = minEnd.toISOString().slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const end = new Date(e.target.value);
    setEndDate(end);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images, // base64 strings
      shopId: seller._id,
      start_Date: startDate?.toISOString(),
      Finish_Date: endDate?.toISOString(),
    };

    dispatch(createevent(data));
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your event product name..."
            className="mt-2 w-full px-3 h-[35px] border rounded-[3px]"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your event product description..."
            className="mt-2 w-full px-3 pt-2 border rounded-[3px]"
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-2 border h-[35px] rounded-[5px]"
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData.map((i) => (
              <option value={i.title} key={i.title}>
                {i.title}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your event product tags..."
            className="mt-2 w-full px-3 h-[35px] border rounded-[3px]"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your event product price..."
            className="mt-2 w-full px-3 h-[35px] border rounded-[3px]"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter discounted price..."
            className="mt-2 w-full px-3 h-[35px] border rounded-[3px]"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter product stock..."
            className="mt-2 w-full px-3 h-[35px] border rounded-[3px]"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            onChange={handleStartDateChange}
            min={today}
            className="mt-2 w-full px-3 h-[35px] border rounded-[3px]"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            onChange={handleEndDateChange}
            min={minEndDate}
            className="mt-2 w-full px-3 h-[35px] border rounded-[3px]"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images.map((i, index) => (
              <img
                src={i}
                key={index}
                alt="event"
                className="h-[120px] w-[120px] object-cover m-2"
              />
            ))}
          </div>
          <br />
          <input
            type="submit"
            value="Create"
            className="mt-2 cursor-pointer w-full px-3 h-[35px] border bg-blue-500 text-white rounded-[3px]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
