import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../components/DropDown";

const TextInput = ({ title, type, setInput, value }) => {
  return (
    <div className="w-full mb-3">
      <h3>{title}</h3>
      <input
        type={type ? type : "text"}
        className="w-full bg-teal-100 text-green-800 p-2 outline-none rounded"
        onChange={(e) => setInput(e.target.value)}
        value={value}
      />
    </div>
  );
};

const AddProd = () => {
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [uploading, setUploading] = useState(false);
  const [prodName, setProdName] = useState();
  const [authorName, setAuthorName] = useState();
  const [aboutAuthor, setAboutAuthor] = useState();
  const [description, setDescription] = useState();
  const [prodMrp, setprodMrp] = useState();
  const [prodSp, setprodSp] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [length, setLength] = useState();
  const [width, setWidth] = useState();
  const [publisher, setPublisher] = useState();
  const [numOfPages, setNumOfPages] = useState();
  const [language, setLanguage] = useState();
  const [category, setCategory] = useState();
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [bookType, setBookType] = useState();
  const [bookTypeArray, setBookTypeArray] = useState([
    "Hardcover",
    "Paperback",
  ]);

  const getCategories = async () => {
    const res = await axios.get(
      "https://qualido-server-16td.onrender.com/api/categories"
    );

    const catArray = res.data.categories.map((cat) => cat.name);

    setCategoriesArray(catArray);

    return res;
  };

  const clearFields = () => {
    setImage();
    setAboutAuthor("");
    setAuthorName("");
    setCategory("");
    setDescription("");
    setHeight("");
    setLength("");
    setWeight("");
    setWidth("");
    setProdName("");
    setprodMrp("");
    setprodSp("");
    setImageUrl("");
    setBookType("");
    setNumOfPages("");
    setPublisher("");
    setLanguage("");
  };

  useEffect(() => {
    getCategories();
  }, []);

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "rik1sh9y");

    if (
      !image ||
      !prodName ||
      !prodMrp ||
      !prodSp ||
      !authorName ||
      !aboutAuthor ||
      !description ||
      !category ||
      !length ||
      !height ||
      !width ||
      !publisher ||
      !numOfPages ||
      !bookType ||
      !language
    )
      return alert("Please fill all details.");

    setUploading(true);

    const imgRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dkpwfe15i/image/upload",
      formData
    );

    const url = imgRes.data.url;
    console.log(url);
    const body = {
      prodName,
      authorName,
      aboutAuthor,
      url,
      description,
      prodMrp,
      prodSp,
      category,
      length,
      height,
      width,
      publisher,
      numOfPages,
      bookType,
      language,
    };
    const res = await axios.post(
      "https://qualido-server-16td.onrender.com/api/products/add",
      body
    );

    setUploading(false);

    if (res.statusText === "OK") {
      clearFields();
      clearFileInput();
      return alert("Product added successfully.");
    } else return alert(res.data.error);
    // setImgRes(imgRes);
  };

  const fileInput = useRef(null);

  const clearFileInput = () => {
    fileInput.current.value = "";
    setImageUrl();
  };

  return (
    <div className="flex flex-col justify-center items-center border border-cyan-700 text-white bg-[#175b6e] font-body p-5 rounded  ">
      <h2 className="text-3xl font-medium self-start mb-5">ADD BOOK</h2>
      <div className=" m-0 p-0 w-full ">
        <div className="sm:flex justify-between space-x-8">
          <TextInput
            title="Book Name"
            setInput={setProdName}
            value={prodName}
          />
          <TextInput
            title="Author Name"
            setInput={setAuthorName}
            value={authorName}
          />
        </div>

        <h3>About Author</h3>
        <textarea
          type="text"
          rows={6}
          className={
            "w-full bg-teal-100 rounded outline-none p-2 text-green-800 mb-3"
          }
          onChange={(e) => setAboutAuthor(e.target.value)}
          value={aboutAuthor}
        />
        <h3>Book Description</h3>
        <textarea
          type="text"
          rows={6}
          className="w-full bg-teal-100 rounded outline-none p-2 text-green-800 mb-3"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <div className="flex justify-between space-x-8">
          <TextInput
            title="Product MRP"
            type={"number"}
            setInput={setprodMrp}
            value={prodMrp}
          />
          <TextInput
            title="Product SP"
            type={"number"}
            setInput={setprodSp}
            value={prodSp}
          />
          <TextInput //paperback or hardcover
            title="Weight(in kg)"
            type={"number"}
            setInput={setWeight}
            value={weight}
          />
        </div>

        <div className="flex justify-between space-x-8">
          <TextInput
            title="Height(in cm)"
            type={"number"}
            setInput={setHeight}
            value={height}
          />
          <TextInput
            title="Width(in cm)"
            type={"number"}
            setInput={setWidth}
            value={width}
          />
          <TextInput
            title="Length(in cm)"
            type={"number"}
            setInput={setLength}
            value={length}
          />
        </div>
        <div className="sm:flex sm:space-x-8">
          <TextInput
            title="Publisher"
            setInput={setPublisher}
            value={publisher}
          />
          <div className="flex sm:flex-none sm:w-1/2">
            <div className="w-full">
              <h3>Select Book Type</h3>
              <Dropdown setOption={setBookType} array={bookTypeArray} />
            </div>
            <TextInput
              title="No. of Pages"
              type={"number"}
              setInput={setNumOfPages}
              value={numOfPages}
            />
          </div>
        </div>

        <div className="flex justify-between w-full space-x-8">
          <div>
            <h3>Select Category</h3>
            <Dropdown setOption={setCategory} array={categoriesArray} />
          </div>
          <TextInput
            title="Enter Language(first letter capital)"
            setInput={setLanguage}
            value={language}
          />
          <div className="w-[15rem]">
            <h3>Add Images</h3>
            <input
              type="file"
              ref={fileInput}
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <button type="button" onClick={clearFileInput}>
              Clear
            </button>
          </div>
        </div>
        <img src={imageUrl} alt="" />
      </div>
      <button
        className={`  w-full my-5 rounded py-3 font-body text-lg ${
          uploading
            ? "bg-gray-500"
            : "bg-cyan-900 border border-cyan-500 hover:bg-cyan-400 active:scale-[.98]"
        }  duration-200 shadow-xl`}
        onClick={submitHandler}
        disabled={uploading}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default AddProd;
