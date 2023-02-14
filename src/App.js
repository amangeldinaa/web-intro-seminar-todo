import "./App.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";  //npm i uuid

// button-group
const buttons = [
  {
    type: "all",
    label: "All",
  },
  {
    type: "active",
    label: "Active",
  },
  {
    type: "done",
    label: "Done",
  },
];

const itemsData = [
  {
    key: uuid(),
    label: "Have fun",
  },
  {
    key: uuid(),
    label: "Spread Empathy",
  },
  {
    key: uuid(),
    label: "Generate Value",
  },
];

function App() {

  const [value, setValue] = useState("");
  const [items, setItems] = useState(itemsData);
  const [type, setType] = useState("all");

  const handleItemAdd = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    // no methods: push, pop, shift, unshift, concat => they change original array
    // yes methods: spread operator, foreach, map, filter, slice => they copy original array 
    const newItem = {
      key: uuid(),
      label: value
    } 
    setItems([...items, newItem])
  }

  const handleDone = (keyFromButton) => {
    const index = items.findIndex(item => item.key === keyFromButton)
    const oldObject = items[index]
    const newObject = {...oldObject, isDone: !oldObject.isDone}
    const leftPart = items.slice(0, index)
    const rightPart = items.slice(index+1, items.length)
    const newItems = [...leftPart, newObject, ...rightPart]
    setItems(newItems)
    // 1. find index element
    // 2. create new element and change isDone field
    // 3. replace new element in items
  }

  const handleStatus = (typeFromButton) => {
    setType(typeFromButton)
  }

  const handleDelete = (keyFromButton) => {
    const index = items.findIndex(item => item.key === keyFromButton)
    const leftPart = items.slice(0, index)
    const rightPart = items.slice(index+1, items.length)
    const newItems = [...leftPart, ...rightPart]
    setItems(newItems)
  }

  const filteredItems = items.filter(item => 
      type === 'all' ? item 
      : type === 'active' ? !item.isDone 
      : item.isDone)

  return (
    <div className="todo-app">
      {/* App-header */}
      <div className="app-header d-flex">
        <h1>Todo List</h1>
        <h2>5 more to do, 3 done</h2>
      </div>

      <div className="top-panel d-flex">
        {/* Search-panel */}
        <input
          type="text"
          className="form-control search-input"
          placeholder="type to search"
        />
        {/* Item-status-filter */}
        <div className="btn-group">
          {buttons.map((itemB) => (
            <button
              key={itemB.type}
              type="button"
              className={`btn btn${itemB.type===type ? "" : "-outline"}-info`}
              onClick={()=>handleStatus(itemB.type)}
            >
              {itemB.label}
            </button>
          ))}
        </div>
      </div>

      {/* List-group */}
      <ul className="list-group todo-list">
        {filteredItems.map((item) => (
          <li key={item.key} className="list-group-item">
            <span className={`todo-list-item ${item.isDone? "done" : ""}`} 
            // onClick={()=>handleDone(item.key)}
            >
              <span
                className="todo-list-item-label"
                onClick={()=>handleDone(item.key)}
              >
                {item.label}
              </span>

              <button
                type="button"
                className="btn btn-outline-success btn-sm float-right"
              >
                <i className="fa fa-exclamation" />
              </button>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={() => handleDelete(item.key)}
              >
                <i className="fa fa-trash-o" />
              </button>
            </span>
          </li>
        ))}
      </ul>

      <div className="item-add-form d-flex">
        <input
          value={value}
          type="text"
          className="form-control"
          placeholder="What needs to be done"
          onChange={handleItemAdd}
        />
        <button className="btn btn-outline-secondary" onClick={handleSubmit}>
          Add item
        </button>
      </div>
    </div>
  );
}

export default App;

