import React, { useEffect, useState } from "react";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  DeleteForm,
} from "react-crud-table";
import SelectSearch from "react-select-search";
import * as emp_json from "../../modal/grl_emp.json";
import "react-select-search/style.css";
import axios from "axios";

// Component's Base CSS
// import './index.css';

let tasks = [];
let shortDate = "";
let gate_pass_id = "";
const path = window.location;

// let empData = Object.keys(emp_json.default).map(emp => {
//     return { key: emp, name: emp_json.default[emp] }
// });

// console.log(empData)
let count = tasks.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(tasks);
    return Promise.resolve(result);
  },
  create: (task) => {
    count += 1;
    tasks.push({
      ...task,
      id: count,
    });
    return Promise.resolve(task);
  },
  update: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    task.title = data.title;
    task.description = data.description;
    return Promise.resolve(task);
  },
  delete: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    tasks = tasks.filter((t) => t.id !== task.id);
    return Promise.resolve(task);
  },
};

const styles = {
  container: { margin: "auto", width: "fit-content", minWidth: "630px" },
};
const getData = () => {
  axios
    .get(path + "data.php")
    .then((res) => res.data)
    .then((data) => {
      gate_pass_id = "GRL-IN-" + (data.length ? ++data[data.length - 1].id : 1);
      console.log(data);
    });
};

const Example = (props) => {
  const [isPrintClicked, setPrint] = useState(false);
  const [empId, setValue] = useState("");
  const empData = Object.keys(emp_json.default).map((emp) => {
    return { value: emp, name: emp_json.default[emp] };
  });
  const printPage = () => {
    if (empId && tasks.length) {
      let date = new Date();
      let month = date.getUTCMonth() + 1;
      shortDate = date.getDate() + "-" + month + "-" + date.getFullYear();
      // gate_pass_id = 'GRL-IN-'+ ;
      let formData = new FormData();
      formData.append("emp_id", empId);
      formData.append("emp_name", emp_json[empId]);
      formData.append("gate_pass_id", gate_pass_id);
      // formData.append('date', shortDate);
      formData.append("device_data", JSON.stringify(tasks));
      console.log(shortDate);
      axios({
        method: "post",
        url: path + "data.php",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((res) => {
          console.log("res", res);
          setPrint(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("please Fill all the fields");
    }
  };
  getData();
  useEffect(() => {
    // console.log(empData)
    if (isPrintClicked) {
      document.getElementsByClassName(
        "crud-button--positive crud-button--modal-trigger",
      )[0].style.display = "none";
      var childEle = document.getElementsByClassName("crud-table__row");
      Object.keys(childEle).forEach((e) => {
        childEle[e].childNodes[
          childEle[e].childElementCount - 1
        ].style.display = "none";
      });
      window.print();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }, [isPrintClicked]);

  const dataChange = (d) => {
    console.log(d, emp_json[d]);
    setValue(d);
  };
  return (
    <>
      <div className="grl-address">
        <img src="Granite-River-Labs-Logo.png" width={"105px"} alt="grl"></img>
        <h1>Granite River Labs Technology Pvt. Ltd.</h1>
        <p>Unit #7 & 8, 1st Floor, RBD icon(Ferns icon)</p>
        <p>
          Outer ring Road, Doddanakundi, Bangalore - 560037, Karnataka,india
        </p>
        <p>+91 8105152848</p>
      </div>
      {!isPrintClicked ? (
        <>
          {" "}
          <div className="search-employee">
            <span>Select Employee: </span>
            <SelectSearch
              options={empData}
              value={empId}
              placeholder="Select Employee"
              search
              onChange={dataChange}
            />
          </div>
        </>
      ) : null}
      {isPrintClicked ? (
        <>
          <div className="employe_details">
            <div>
              <p>Employee Name : {emp_json[empId]}</p>
              <p>DATE: {shortDate}</p>
            </div>
            <p className="gate_pass">Gate Pass NO: {gate_pass_id}</p>
          </div>{" "}
        </>
      ) : null}
      <div style={styles.container}>
        {!isPrintClicked ? (
          <button className="crud-button print-button" onClick={printPage}>
            Print
          </button>
        ) : null}

        <CRUDTable
          caption="Employee Gate Pass"
          fetchItems={(payload) => service.fetchItems(payload)}
        >
          <Fields>
            <Field
              name="id"
              label="Id"
              hideInCreateForm
              readOnly
              sortable={false}
            />
            <Field
              name="description"
              label="Product Description"
              sortable={false}
              placeholder="Product Description"
            />
            <Field
              name="quantity"
              label="quantity"
              sortable={false}
              placeholder="quantity"
            />
            <Field
              name="purpose"
              label="purpose"
              sortable={false}
              placeholder="purpose"
            />
            <Field
              name="returnable"
              label="returnable"
              sortable={false}
              placeholder="returnable"
            />
          </Fields>
          <CreateForm
            title="Add items"
            message="Add new items"
            trigger="Add Items"
            onSubmit={(task) => service.create(task)}
            submitText="Create"
            className={"needto"}
            validate={(values) => {
              const errors = {};
              if (!values.description) {
                errors.description = "Please, provide task's description";
              }
              if (!values.quantity) {
                errors.quantity = "Please, provide task's quantity";
              }
              if (!values.purpose) {
                errors.purpose = "Please, provide task's purpose";
              }
              if (!values.returnable) {
                errors.returnable = "Please, provide task's returnable";
              }

              return errors;
            }}
          />

          {/* <UpdateForm
                        title="Task Update Process"
                        message="Update task"
                        trigger="Update"
                        onSubmit={task => service.update(task)}
                        submitText="Update"
                        className='use-condition'


                        validate={(values) => {
                            const errors = {};

                            if (!values.id) {
                                errors.id = 'Please, provide id';
                            }

                            if (!values.title) {
                                errors.title = 'Please, provide task\'s title';
                            }

                            if (!values.description) {
                                errors.description = 'Please, provide task\'s description';
                            }

                            return errors;
                        }}
                    /> */}

          <DeleteForm
            title="Task Delete Process"
            message="Are you sure you want to delete the task?"
            trigger="Delete"
            onSubmit={(task) => service.delete(task)}
            submitText="Delete"
            validate={(values) => {
              const errors = {};
              if (!values.id) {
                errors.id = "Please, provide id";
              }
              return errors;
            }}
          />
        </CRUDTable>
      </div>
      {isPrintClicked ? (
        <>
          <div className="grl_footer">
            <div>
              <p>SIGNATURE</p>
              <p>AUTHORISED SIGNATURE</p>
            </div>
            <p className="footer_dept">(DEPARTMENTAL HEAD/STORES)</p>
          </div>
        </>
      ) : null}
    </>
  );
};

Example.propTypes = {};
export default Example;
