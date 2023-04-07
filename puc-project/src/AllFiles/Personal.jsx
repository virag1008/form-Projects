import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const initialData = {
  salutation: "",
  fname: "",
  lname: "",
  dob: "",
  currentAge: { years: "", months: "", days: "" },
  username: "",
  city: "",
  state: "",
  mobileNo: "",
};

const Personal = () => {
  const [inputData, setInput] = useState(initialData);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [submitToggle, setSubmitToggle] = useState(true);
  const [user, setUser] = useState([]);
  const [searching, setSearching] = useState("");
  const [error, setError] = useState({});
  const [documentId, setDocumentId] = useState("");

  const changeEvent = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...inputData, [name]: value });
    if (inputData.mobileNo.length > 10) {
      setInput({ ...inputData, mobileNo: inputData.mobileNo.slice(0, -1) });
    }
  };

  const editEvent = (id) => {
    setDocumentId(id);
    console.log(documentId);
    let editableData = user.find((item) => {
      return id === item._id;
    });
    setInput(editableData);
  };

  const handelUpdate = (e) => {
    const {
      salutation,
      fname,
      lname,
      dob,
      currentAge,
      username,
      city,
      state,
      mobileNo,
    } = inputData;
    e.preventDefault();

    axios
      .put(`http://localhost:5200/ragister/:users/${documentId}`, {
        salutation,
        fname,
        lname,
        dob,
        currentAge,
        username,
        city,
        state,
        mobileNo,
      })
      .then((response) => {
        console.log("Document updated successfully:", response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const bluringEvent = () => {
    if (inputData.salutation !== "") {
      setToggle(false);
    }
  };

  function calculateAge() {
    const birthDateObj = new Date(inputData.dob);
    const now = new Date();
    const diff = now - birthDateObj;

    const ageDate = new Date(diff);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    setInput({ ...inputData, currentAge: { years, months, days } });
  }

  const clickEvent = async (e) => {
    e.preventDefault();

    console.log(documentId);

    if (
      inputData.fname == "" ||
      inputData.salutation == "" ||
      inputData.lname == "" ||
      inputData.dob == "" ||
      inputData.city == "" ||
      inputData.state == "" ||
      inputData.mobileNo == ""
    ) {
      alert("please fill complete form before submit");
    } else {
      setData((pre) => [...pre, inputData]);

      setInput(initialData);
      setToggle(true);
      setSubmitToggle(true);
      console.log(data);

      //----------Back-End Connection started---------//

      const {
        salutation,
        fname,
        lname,
        dob,
        currentAge,
        username,
        mobileNo,
        city,
        state,
      } = inputData;

      const res = await fetch("http://localhost:5200/ragister/:users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          salutation,
          fname,
          lname,
          dob,
          currentAge,
          username,
          mobileNo,
          city,
          state,
        }),
      });
      const result = await res.json();
      const message = await result.message;
      if (message === "number already exits!!!") {
        alert("User Already Exist");
      } else {
        alert("Form Has Been SuccessFully submitted");
      }
    }
  };

  // for getting user data .....

  const getUser = async () => {
    const res = await fetch("http://localhost:5200/ragister/:users", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
    });

    let result = await res.json();
    setUser(result);
  };

  useEffect(() => {
    getUser();
  });

  //----------Back-End Connection ended---------//

  //---------- UI part started ---------//

  return (
    <div className="personalPage">
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <button className="btn btn-warning m-2">Go To Home Page </button>
        </Link>
        <br />
        <br />
        <input
          className="form-control"
          style={{ textAlign: "center" }}
          type="text"
          placeholder="search by First Name"
          onChange={(e) => setSearching(e.target.value)}
          value={searching}
        />
        <br />
        <br />
        <div>
          <table className="table table-striped table-hover table-dark">
            <thead>
              <tr>
                <th>First Name </th>
                <th>Last Name </th>
                <th> BirthDate </th>
                <th> UserName </th>
                <th> Mobile No. </th>
                <th> City </th>
                <th> State </th>
                <th> Edit </th>
              </tr>
            </thead>

            <tbody>
              {user
                .filter((item) => {
                  if (searching == "") {
                    return null;
                  } else {
                    return item.fname
                      .toLowerCase()
                      .includes(searching.toLowerCase());
                  }
                })
                .map((item, id) => {
                  return (
                    <tr key={id}>
                      <td> {item.fname} </td>
                      <td> {item.lname}</td>
                      <td> {item.dob}</td>
                      <td> {item.username}</td>
                      <td> {item.mobileNo}</td>
                      <td> {item.city}</td>
                      <td> {item.state}</td>
                      <td>
                        <button onClick={() => editEvent(item._id)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <hr />

      <form className="needs-validation" action="#" onSubmit={clickEvent}>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <br />

            <div className="col-md-4 mb-3">
              <label htmlFor="validationCustom04"> salutation:: </label>

              <select
                name="salutation"
                className="form-control"
                id="salutation"
                placeholder="Select salutation"
                onChange={changeEvent}
                autoFocus
                onClick={bluringEvent}
                required
              >
                <option value="Mr."> Mr. </option>
                <option value="Mrs."> Mrs. </option>
                <option value="Miss."> Miss </option>
              </select>
            </div>

            <label htmlFor="validationCustom01">First name</label>
            <input
              type="text"
              className="form-control Capitalised "
              id="validationCustom01"
              placeholder="First name"
              name="fname"
              onChange={changeEvent}
              disabled={toggle}
              value={inputData.fname}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="validationCustom02">Last name</label>
            <input
              type="text"
              className="form-control Capitalised"
              id="validationCustom02"
              placeholder="Last name"
              name="lname"
              onChange={changeEvent}
              value={inputData.lname}
              disabled={toggle}
              required
            />
          </div>

          {
            <h5 className="Capitalised">
              <span> Full-Name ::: </span>
              {inputData.salutation} {inputData.fname} {inputData.lname}
            </h5>
          }

          <div className="col-md-4 mb-3">
            <label htmlFor="dob">Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              placeholder="enter your BirthDate"
              onChange={changeEvent}
              onBlur={calculateAge}
              name="dob"
              value={inputData.dob}
              disabled={toggle}
              required
            />
          </div>

          <p>
            Age := {inputData.currentAge.years} Year -
            {inputData.currentAge.months} Month - {inputData.currentAge.days}
            days
          </p>

          <div className="col-md-4 mb-3">
            <label htmlFor="validationCustomUsername">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend">
                  @
                </span>
              </div>
              <input
                type="text"
                className="form-control Capitalised"
                id="validationCustomUsername"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                name="username"
                onChange={changeEvent}
                value={inputData.username}
                disabled={toggle}
                required
              />
              <div className="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustomUsername">Mobile No</label>
          <div className="input-group">
            <input
              type="Number"
              className="form-control"
              id="validationCustomUsername"
              placeholder="Mobile No"
              aria-describedby="inputGroupPrepend"
              name="mobileNo"
              onChange={changeEvent}
              value={inputData.mobileNo}
              disabled={toggle}
              required
            />
          </div>
          <span className="text-danger">{error.state}</span>
        </div>

        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="validationCustom03">City</label>
            <input
              type="text"
              className="form-control Capitalised"
              id="validationCustom03"
              placeholder="City"
              onChange={changeEvent}
              value={inputData.city}
              disabled={toggle}
              name="city"
              required
            />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="validationCustom04">State</label>
            <input
              type="text"
              className="form-control Capitalised"
              id="validationCustom04"
              placeholder="State"
              value={inputData.state}
              disabled={toggle}
              name="state"
              onChange={changeEvent}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit form
        </button>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handelUpdate}
        >
          update Info
        </button>
      </form>
    </div>
  );
};

export default Personal;
