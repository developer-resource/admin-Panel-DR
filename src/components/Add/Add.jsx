import React from "react";
import "./add.css";
import Nav from "../Nav/Nav";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import addFormSchema from "../../formSchema/data";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addData = async (data) => {
  console.log("Add data called");
  try {
    const res = await Axios.post(
      "https://dev-resources-backend.onrender.com/api/jobs",
      data
    );
    console.log("Successfully added data", res);

    toast.success('Data Submitted successfully !', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  } catch (error) {
    console.log("Some error occurred in adding data", error);
    toast.error('Something went wrong :( ', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

const Add = () => {
  useEffect(() => {
    document.title = "Add";
  }, []);

  const [tags, setTags] = useState([]);

  const [imgLogo, setImgLogo] = useState(null);



  // Formik
  const [initialValues, setInitialValues] = useState({   //eslint-disable-line
    companyName: "",
    jobTitle: "",
    type: "Full Time",
    location: "",
    duration: "",
    startDate: "",
    expectedSalary: "",
    portalLink: "",
    jobDescription: "",
    experience: "",
    batch: ''
  });

  // Formik

  const { values, handleSubmit, handleChange, errors, touched, resetForm } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: addFormSchema,
    onSubmit: () => {
      let finalData = { ...values, ...imgLogo, ...{ tags } };
      sendData(finalData);


      resetForm();

      setImgLogo(null);
      setTags([])
      

    },
  });

  const handleTags = (e) => {
    if (e.target.value !== "") {
      if (e.keyCode === 13) {
        setTags([...tags, e.target.value]);
        e.target.value = "";
      }
    }
  };

  // Logo Handler
  const logoHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (e.target.files[0].size / 1000 < 50) {
          setImgLogo({ profileImg: reader.result });
        } else {
          alert("Image size should be less than 150KB");
        }
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const sendData = (finalValues) => {
    console.log("Final Values ", finalValues);
    addData(finalValues);
  };

  // Form List
  const formList = [
    {
      key: 1,
      label: "Company Name",
      Error: "Error",
      name: "companyName",
      value : values.companyName
    },

    {
      key: 2,
      label: "Job Title",
      Error: "Error",
      name: "jobTitle",
      value : values.jobTitle
    },

    {
      key: 3,
      label: "Location",
      Error: "Error",
      name: "location",
      value : values.location
    },

    {
      key: 4,
      label: "Duration",
      Error: "Error",
      name: "duration",
      value : values.duration
    },

    {
      key: 5,
      label: "Start Date",
      Error: "Error",
      name: "startDate",
      value : values.startDate
    },

    {
      key: 6,
      label: `${values.type === "Internship" ? "Stipend" : "Salary"}`,
      Error: "Error",
      name: "expectedSalary",
      value : values.expectedSalary
    },

    {
      key: 7,
      label: "Portal Link",
      Error: "Error",
      name: "portalLink",
      value : values.portalLink
    },

    {
      key: 8,
      label: "Experience",
      Error: "Error",
      name: "experience",
      value : values.experience
    },

    {
      key: 9,
      label: "Batch",
      Error: "Error",
      name: "batch",
      value : values.batch
    }
  ];

  // experience, batch eligible, show more, delete btn

  return (
    <>
      <div className="add-container p-2 container-fluid">
        <div className="container">
          {/* Header */}
          <Nav position="Home" />

          {/* Form */}
          <div className="row mt-5">
            <div className="col-12 companyLogo text-center w-100 mb-5 d-flex flex-column col-md-4">
              <label
                htmlFor="companyLogo"
                className="d-flex justify-content-center align-item-center"
              >
                <i className="mt-1 me-1 fa-solid fa-link"></i>Choose Company Logo
              </label>
              <input
                type="file"
                onChange={logoHandler}
                id="companyLogo"
                hidden
                accept="image/*"
              />
              {imgLogo ? (
                <img className="logo mt-3" src={imgLogo.profileImg} alt="Logo" />
              ) : null}
            </div>

            <div className="col-12  mb-5 d-flex flex-column col-md-4">
              <label htmlFor="jobType">Type</label>
              <select
                id="jobType"
                name="type"
                onChange={handleChange}
                className="mt-1 jobType"
              >
                <option value="Full Time">Full Time</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.type && touched.type ? (
                <span className="error mt-1">{errors.type}</span>
              ) : null}
            </div>

            <div className="col-12  mb-5 d-flex flex-column col-md-4">
              <label htmlFor="techTags">Tech Tags</label>
              <input type="text" onKeyUp={handleTags} className="input-field" />
              <div className="row">
                <div className="col-12">
                  {tags ? (
                    <small style={{ textTransform: "uppercase" }}>
                      {tags + " "}
                    </small>
                  ) : null}
                </div>
              </div>
            </div>

            {formList.map(({ key, name, label, value }) => {
              return (
                <div
                  key={key}
                  className="col-12 mb-5 d-flex flex-column col-md-4"
                >
                  <small className="companyLabel">{label}</small>
                  <input
                    name={name}
                    onChange={handleChange}
                    className="input-field"
                    type="text"
                    value={value}
                  />
                  <span className="error mt-1">
                    {name === "companyName" && touched.companyName
                      ? errors.companyName
                      : name === "jobTitle" && touched.jobTitle
                        ? errors.jobTitle
                        : name === "location" && touched.location
                          ? errors.location
                          : name === "duration" && touched.duration
                            ? errors.duration
                            : name === "startDate" && touched.startDate
                              ? errors.startDate
                              : name === "expectedSalary" && touched.expectedSalary
                                ? errors.expectedSalary
                                : name === "portalLink" && touched.portalLink
                                  ? errors.portalLink
                                  : null}
                  </span>
                </div>
              );
            })}

            <div className="col-12  text-center">
              <textarea
                cols="30"
                name="jobDescription"
                onChange={handleChange}
                placeholder="Job Description"
                className="w-50 mb-3 jobDescription"
                rows="10"
              ></textarea>
            </div>
            <div className="col-12 text-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-25 submit-btn mx-auto"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Add;
