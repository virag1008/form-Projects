import { useEffect, useState } from "react";

const initialData = {
  fname: "",
  lname: "",
  mobNo: "",
};

export default function FormComponent() {
  const [data, setData] = useState(initialData);
  const [user, setUser] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [idStore, setIdStore] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let getData = async () => {
      let response = await fetch("http://localhost:3000/userData");
      let result = await response.json();
      setUser(result);
    };
    getData();
  }, [count]);

  const changeEvent = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const validation = () => {
    if (!/^\d*$/.test(data.mobNo)) {
      setData({ ...data, mobNo: data.mobNo.slice(0, -1) });
    }
    if (!/^[a-zA-Z]+$/.test(data.fname)) {
      setData({ ...data, fname: data.fname.slice(0, -1) });
    }
  };

  const editEvent = (id) => {
    let edited = user.find((item) => {
      return item.id === id;
    });
    setData(edited);
    setToggle(false);
    setIdStore(id);
  };

  const updateEvent = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/userData/${idStore}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setToggle(true);
    setCount(count + 1);
  };

  const deleteEvent = (id) => {
    fetch(`http://localhost:3000/userData/${id}`, {
      method: "DELETE",
    });
    setCount(count + 1);
  };

  const clickEvent = (e) => {
    e.preventDefault();

    fetch(" http://localhost:3000/userData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setData(initialData);
    setCount(count + 1);
  };

  return (
    <div className="App">
      <h3 className="mt-5">Form data saved on json server </h3>
      <form onSubmit={toggle ? clickEvent : updateEvent}>
        <label> FirstName :: </label>
        <input
          type="text"
          className="mt-3 m-2"
          value={data.fname}
          name="fname"
          onChange={changeEvent}
          placeholder="fname"
          required
          onKeyUp={validation}
        />
        <br />
        <label> FirstName :: </label>
        <input
          type="text"
          className="mt-3 m-2"
          value={data.lname}
          name="lname"
          onChange={changeEvent}
          placeholder="lname"
          required
          onKeyUp={validation}
        />
        <br />
        <label> Mob -No :: </label>
        <input
          type="text"
          maxLength="10"
          minLength="10"
          className="mt-3 m-2 "
          value={data.mobNo}
          name="mobNo"
          onChange={changeEvent}
          placeholder="mobNo"
          required
          onKeyUp={validation}
        />
        <br />
        <input
          type="submit"
          className="mt-3 btn btn-success"
          value={toggle ? "submit" : "update"}
        />
      </form>
      <br />

      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr>
            <th>Sr.no.</th>
            <th> First Name </th>
            <th> last Name </th>
            <th> Mob. No. </th>
            <th> Edit </th>
            <th> Delete </th>
          </tr>
        </thead>

        <tbody>
          {user.map((person, id) => {
            return (
              <tr key={id}>
                <td>{person.id}</td>
                <td>{person.fname}</td>
                <td>{person.lname}</td>
                <td>{person.mobNo}</td>
                <th>
                  <button
                    onClick={() => editEvent(person.id)}
                    className="btn btn-warning"
                  >
                    {" "}
                    Edit{" "}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => deleteEvent(person.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
