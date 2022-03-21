import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  let [data, setData] = useState([]);

  const [constData, setConstData] = useState([]);

  let [searchName, setSearchName] = useState("");
  let [searchGroup, setSearchGroup] = useState("");
  let [searchCourse, setSearchCourse] = useState("");
  let [searchPayment, setSearchPayment] = useState("");
  console.log(data);
  // FILLTER START
  useEffect(() => {
    async function fetchPost() {
      const response = await axios.get(
        "https://api.npoint.io/e276240b9773d7e6eeb1"
      );
      setConstData(response.data);
      setData(response.data);
    }
    fetchPost();
  }, []);

  useEffect(() => {
    setData(
      constData.filter(
        (user) =>
          user.name.toLowerCase().includes(searchName.toLowerCase()) &&
          (searchGroup !== "" ? user.group === searchGroup : true) &&
          (searchCourse !== "" ? user.course === searchCourse : true) &&
          (searchPayment !== "" ? user.status_payment === searchPayment : true)
      )
    );
  }, [searchName, searchGroup, searchCourse, searchPayment]);
  // FILLTER END

  return (
    <div className="w-md-75 mx-auto">
      <form className="w-75 mx-auto d-flex">
        {/* SEARCH NAME START */}
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name..."
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
        />
        {/* SEARCH NAME END */}
        {/* ################################################################### */}
        {/* SEARCH GROUP START */}
        <select
          className="form-select"
          value={searchGroup}
          onChange={(e) => {
            setSearchGroup(e.target.value);
          }}
        >
          <option selected value="">
            -
          </option>
          <option value="soff_001">Soff 001</option>
          <option value="soff_002">Soff 002</option>
          <option value="soff_003">Soff 003</option>
        </select>
        {/* SEARCH GROUP END */}
        {/* ################################################################### */}
        {/* SEARCH COURSE START */}

        <select
          className="form-select"
          value={searchCourse}
          onChange={(e) => {
            setSearchCourse(e.target.value);
          }}
        >
          <option selected value="">
            -
          </option>
          <option value="front-end">FrontEnd</option>
          <option value="back-end">BackEnd</option>
        </select>
        {/* SEARCH COURSE END */}
        {/* ################################################################### */}
        {/* SEARCH STATUS-PAYMENT START */}

        <select
          className="form-select"
          value={searchPayment}
          onChange={(e) => {
            setSearchPayment(e.target.value);
          }}
        >
          <option selected value="">
            -
          </option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="delay">Delay</option>
        </select>
        {/* SEARCH STATUS-PAYMENT END */}
      </form>
      {/* TABLE START */}
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Group</th>
            <th>Course</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user, i) => {
              return (
                <tr key={i + 10}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.group}</td>
                  <td>{user.course}</td>
                  <td>{user.status_payment}</td>
                </tr>
              );
            })
          ) : (
            <h1>LOADING...</h1>
          )}
        </tbody>
      </table>
      {/* TABLE END */}
    </div>
  );
}
