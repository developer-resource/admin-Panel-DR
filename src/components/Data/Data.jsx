import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./data.css";
const Data = () => {
  const [data, setData] = useState([]);

  // Get Data
  const getData = async () => {
    let result = await fetch(
      "https://dev-resources-backend.onrender.com/api/jobs"
    );

    result = await result.json();

    setData(result);
  };
  useEffect(() => {
    getData();
  }, []);

  // Delete Data

  const delData = async (id) => {
    try {

      //Re-render with updated data
      setData(data.filter((obj) => obj._id !== id));

     await fetch( 
        `https://dev-resources-backend.onrender.comapi/jobs/${id}`,
        {
          method: "delete",
        }
      );

      toast.success("Data Deleted...", {
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
      console.log(error);
      toast.error("Something went wrong :(", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      getData();
    }
  };

  return (
    <>
      <div className="dataContainer container-fluid p-0 ">
        <table class="table table-responsive table-hover">
          <thead>
            <tr className="bg-dark text-white">
              <th scope="col">S No.</th>
              <th scope="col">Company Name</th>
              <th scope="col">Job Title</th>
              <th scope="col">Tags</th>
              <th scope="col">Location</th>
              <th scope="col">Duration</th>
              <th scope="col">Start Date</th>
              <th scope="col">Salary</th>
              <th scope="col">Experience</th>
              <th scope="col">Portal Link</th>
              <th scope="col">Job Desc</th>
              <th scope="col">Logo</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              console.log();
              return (
                <>
                  <tr className="tableData">
                    <th>{index + 1}</th>
                    <th className="fw-light">{val.companyName}</th>
                    <td>{val.jobTitle}</td>
                    <td>
                      {val.tags.map((val, index) => {
                        return <>{val + " "}</>;
                      })}
                    </td>
                    <td>{val.location}</td>
                    <td>{val.duration}</td>
                    <td>{val.startDate}</td>
                    <td>{val.expectedSalary}</td>
                    <td>{val.experience}</td>
                    <td>{val.portalLink}</td>
                    <td>{val.jobDescription}</td>
                    <td>
                      <img
                        src={val.profileImg}
                        alt="Logo"
                        className="companyLogo"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          delData(val._id);
                        }}
                        type="button"
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
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

export default Data;
