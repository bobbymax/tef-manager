/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable function-paren-newline */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Header } from "../../components";
import SelectContainer from "../../components/Forms/Select/SelectContainer";
import SelectOptions from "../../components/Forms/Select/SelectOptions";
import TextInput from "../../components/Forms/TextInput";
import { alter, batch, collection, store } from "../../services/controllers";
import {
  allowedFileTypes,
  formatSelectOptions,
  getFileExt,
} from "../../resources/helpers";
import { useStateContext } from "../../contexts/ContextProvider";
import "./imageBox.css";
import Alert from "../../services/classes/Alert";

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const animated = makeAnimated();
  const maxSize = 4194304;
  const { currentColor } = useStateContext();

  const initialState = {
    id: 0,
    brand_id: 0,
    classification_id: 0,
    title: "",
    price: 0,
    vip: 0,
    description: "",
    image: undefined,
    categories: [],
    tags: [],
  };

  const dependency = {
    brands: [],
    categories: [],
    classifications: [],
    tags: [],
  };
  const [state, setState] = useState(initialState);
  const [dependencies, setDependencies] = useState(dependency);
  const [isUpdating, setIsUpdating] = useState(false);
  const [cats, setCats] = useState([]);
  const [tags, setTags] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    const allowed = allowedFileTypes.includes(getFileExt(file.name));

    if (allowed && file.size < maxSize) {
      setUploadedFile(file);
      setErrors("");
      setImgSrc(URL.createObjectURL(file));
    } else {
      setUploadedFile(null);
      setErrors("File too big or not supported");
      setImgSrc(null);
    }
  };

  const goBack = () => {
    clearStateData();
    navigate("/products", {
      state: {
        product: undefined,
        message: "",
        isUpdating: false,
      },
    });
  };

  const clearStateData = () => {
    setState(initialState);
    setCats([]);
    setTags([]);
    setImgSrc(null);
    setUploadedFile(null);
    setIsUpdating(false);
    setErrors("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", uploadedFile);
    formData.append("brand_id", state.brand_id);
    formData.append("classification_id", state.classification_id);
    formData.append("title", state.title);
    formData.append("price", state.price);
    formData.append("vip", state.vip);
    formData.append("description", state.description);
    formData.append("categories", JSON.stringify(cats));
    formData.append("tags", JSON.stringify(tags));

    try {
      if (!isUpdating) {
        store("products", formData)
          .then((res) => {
            const result = res.data;
            clearStateData();
            navigate("/products", {
              state: {
                product: result.data,
                message: result.message,
                isUpdating: false,
              },
            });
          })
          .catch((err) => {
            Alert.error("Oops!!", err.response.data.message);
            console.log(err.message);
          });
      } else {
        alter("products", state.id, formData)
          .then((res) => {
            const result = res.data;
            clearStateData();
            navigate("/products", {
              state: {
                product: result.data,
                message: result.message,
                isUpdating: true,
              },
            });
          })
          .catch((err) => {
            Alert.error("Oops!!", err.response.data.message);
            console.log(err.message);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const brandsData = collection("brands");
      const categoriesData = collection("categories");
      const classesData = collection("classifications");
      const tagsData = collection("tags");

      batch([brandsData, categoriesData, classesData, tagsData])
        .then(
          axios.spread((...res) => {
            setDependencies({
              ...dependencies,
              brands: res[0].data.data,
              categories: res[1].data.data,
              classifications: res[2].data.data,
              tags: res[3].data.data,
            });
          })
        )
        .catch((err) => console.log(err.message));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (location?.state?.product !== null) {
      const { product } = location.state;
      setState({
        ...state,
        id: product.id,
        brand_id: product.brand_id,
        classification_id: product.classification_id,
        title: product.title,
        price: parseFloat(product.price),
        vip: parseFloat(product.vip),
        description: product.description,
        images: product.images,
        categories: product.categories,
        tags: product.tags,
      });
      setIsUpdating(true);
    }
  }, [location?.state]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Add Product" />
      <form
        className="space-y-6"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-9 gap-4">
          {errors !== "" && (
            <div className="col-span-9 sm:col-span-9">
              <p className="text-sm text-red-700 font-medium mb-2">{errors}</p>
            </div>
          )}
          <div className="col-span-6 sm:col-span-5">
            <TextInput
              label="Title"
              placeholder="Enter Product Title"
              value={state.title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
            />
          </div>
          <div className="col-span-3 sm:col-span-4">
            <SelectContainer
              label="Brand"
              value={state.brand_id}
              onChange={(e) => setState({ ...state, brand_id: e.target.value })}
            >
              <SelectOptions value={0} label="Select Product Brand" disabled />

              {dependencies?.brands?.map((brand) => (
                <SelectOptions
                  key={brand.id}
                  value={brand.id}
                  label={brand.name}
                />
              ))}
            </SelectContainer>
          </div>
          <div className="col-span-3 sm:col-span-3">
            <SelectContainer
              label="Classification"
              value={state.classification_id}
              onChange={(e) =>
                setState({ ...state, classification_id: e.target.value })
              }
            >
              <SelectOptions value={0} label="Select Product Class" disabled />

              {dependencies?.classifications?.map((classification) => (
                <SelectOptions
                  key={classification.id}
                  value={classification.id}
                  label={classification.name}
                />
              ))}
            </SelectContainer>
          </div>
          <div className="col-span-3 sm:col-span-3">
            <TextInput
              label="Price"
              value={state.price}
              onChange={(e) =>
                setState({ ...state, price: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className="col-span-3 sm:col-span-3">
            <TextInput
              label="VIP Price"
              value={state.vip}
              onChange={(e) =>
                setState({ ...state, vip: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className="col-span-5 sm:col-span-5">
            <p className="block mb-2 text-sm font-medium text-gray-700">
              Categories
            </p>
            <Select
              closeMenuOnSelect={false}
              components={animated}
              options={formatSelectOptions(
                dependencies?.categories,
                "id",
                "name"
              )}
              value={cats}
              onChange={setCats}
              isMulti
            />
          </div>
          <div className="col-span-4 sm:col-span-4">
            <p className="block mb-2 text-sm font-medium text-gray-700">Tags</p>
            <Select
              closeMenuOnSelect={false}
              components={animated}
              options={formatSelectOptions(dependencies?.tags, "id", "name")}
              value={tags}
              onChange={setTags}
              isMulti
            />
          </div>
          <div className="col-span-9 sm:col-span-9">
            <TextInput
              label="Description"
              placeholder="Enter Product Description"
              value={state.description}
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
              multiline={5}
            />
          </div>
          <div className="col-span-9 sm:col-span-9">
            <TextInput
              label="Upload Product Image"
              type="file"
              value={state.image}
              onChange={handleChange}
            />
          </div>
          {imgSrc !== null && (
            <div className="col-span-4 sm:col-span-5">
              <img src={imgSrc} alt="Uploaded File" style={{ width: "100%" }} />
            </div>
          )}
          <div className="col-span-9 sm:col-span-9">
            <div className="btn-group mt-4">
              <button
                type="submit"
                className="uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                style={{ backgroundColor: currentColor }}
              >
                Submit
              </button>
              <button
                type="button"
                className="uppercase ml-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => goBack()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Product;
