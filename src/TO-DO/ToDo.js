import React, { useState, useEffect } from "react";
import "./style.css";

const getlocaldata = () => {
  const data = localStorage.getItem("todo");

  if (data) {
    return JSON.parse(data);
  } else return [];
};

const ToDo = () => {
  const [inputData, setinputData] = useState("");
  const [items, setitems] = useState(getlocaldata());
  const [editItempos, seteditItempos] = useState(null);
  const [toggleButton, settoggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
    } else if (inputData && toggleButton) {
      const ITEMS = items.map((currElem) => {
        if (currElem.id === editItempos) {
          return { ...currElem, name: inputData };
        }
        return currElem;
      });
      setitems(ITEMS);
      seteditItempos(null);
      setinputData("");
      settoggleButton(false);
      return;
    } else {
      const newinputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setitems([...items, newinputData]);
      setinputData("");
      return;
    }
  };

  const editdata = (index) => {
    setinputData(items[index].name);
    settoggleButton(true);
    seteditItempos(items[index].id);
  };

  const deleteItems = (index_id) => {
    const updatedItems = items.filter((currElem) => {
      return currElem.id !== index_id;
    });
    setitems(updatedItems);
  };

  const deleteAll = () => {
    setitems([]);
    settoggleButton(true);
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.svg" alt="" />
            <figcaption>To Do List</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              name=""
              id=""
              className="form-control"
              placeholder="✍️"
              value={inputData}
              onChange={(e) => {
                setinputData(e.target.value);
              }}
            />

            {toggleButton ? (
              <i className="fa fa-edit add-btn" onClick={() => addItem()}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={() => addItem()}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((curElem, index) => {
              const { name, id } = curElem;
              return (
                <div className="eachItem" key={id}>
                  <h3>{name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editdata(index)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItems(id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => deleteAll()}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
