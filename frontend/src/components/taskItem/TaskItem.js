import React, { useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import Card from "../UIElements/Card";

import "./TaskItem.css";
import { Link } from "react-router-dom";

const TaskItem = (props) => {
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      <li className="task-item">
        <Card className="task-item__content">
          <div className="task-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="task-item__info">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
          </div>
          {auth.isLoggedIn ? (
            <div className="task-item__actions">
              <Link to={`/tasks/${props.id}`}>
                <button>EDIT</button>
              </Link>
              <button>DELETE</button>
            </div>
          ) : null}
        </Card>
      </li>
    </React.Fragment>
  );
};

export default TaskItem;
