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
// import React, { useEffect, useState, useCallback } from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDropzone } from "react-dropzone";
import ReactS3 from "react-s3";
import { Header } from "../../components";
import SelectContainer from "../../components/Forms/Select/SelectContainer";
import SelectOptions from "../../components/Forms/Select/SelectOptions";
import TextInput from "../../components/Forms/TextInput";
import { alter, batch, collection, store } from "../../services/controllers";
import { formatSelectOptions } from "../../resources/helpers";
import { useStateContext } from "../../contexts/ContextProvider";
import "./imageBox.css";
import Alert from "../../services/classes/Alert";
import { config } from "../../services/utils";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const ReUse = () => {
  const location = useLocation();
  const animated = makeAnimated();
  const { currentColor } = useStateContext();

  const initialState = {
    id: 0,
    brand_id: 0,
    classification_id: 0,
    title: "",
    price: 0,
    vip: 0,
    description: "",
    images: [],
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
  const [files, setFiles] = useState([]);
  const [bFiles, setBFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const fileBytes = reader.result;
          setBFiles([file, ...bFiles]);
          ReactS3.uploadFile(file, config)
            .then((data) => {
              console.log(data);
            })
            .catch((err) => console.log(err.message));
          console.log(fileBytes, file);
        };
        // setBFiles([formData, ...bFiles]);
        reader.readAsDataURL(file);
      });
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  // console.log(bFiles);

  const thumbs = files.map((file, i) => (
    <div style={thumb} key={i}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  // const onDrop = useCallback((acceptedFiles) => {
  //   acceptedFiles.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onabort = () => console.log("file reading was aborted");
  //     reader.onerror = () => console.log("file reading has failed");
  //     reader.onload = () => {
  //       const binaryStr = reader.result;
  //       console.log(binaryStr);
  //     };

  //     reader.readAsArrayBuffer(file);
  //   });
  // }, []);

  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      brand_id: state.brand_id,
      classification_id: state.classification_id,
      title: state.title,
      price: state.price,
      vip: state.vip,
      description: state.description,
      images: bFiles,
      categories: cats,
      tags,
    };

    try {
      if (!isUpdating) {
        store("products", body)
          .then((res) => {
            const result = res.data;
            Alert.success("Created!", result.message);
          })
          .catch((err) => console.log(err.message));
      } else {
        alter("products", state.id, body)
          .then((res) => {
            const result = res.data;
            Alert.success("Updated!!", result.message);
          })
          .catch((err) => console.log(err.message));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(files);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

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

  // console.log(bFiles);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Add Product" />
      <form
        className="space-y-6"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-9 gap-4">
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
            <p className="block mb-2 text-sm font-medium text-gray-700">
              Upload Images
            </p>
            <div className="dropbox" {...getRootProps()}>
              {thumbs?.length > 0 && (
                <aside style={thumbsContainer}>{thumbs}</aside>
              )}
              <div className="element">
                <input {...getInputProps()} />
                <p>
                  <span style={{ color: currentColor }}>Drag &amp; drop</span>{" "}
                  some files here, or{" "}
                  <span style={{ color: currentColor }}>click</span> to select
                  files
                </p>
              </div>
            </div>
          </div>
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
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReUse;
