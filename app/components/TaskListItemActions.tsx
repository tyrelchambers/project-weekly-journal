import { Form, Link } from "@remix-run/react";
import { faPencil, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Task } from "@prisma/client";

interface Props {
  task: Task;
  markAsIncomplete: () => void;
  redirectTo?: string;
}

const TaskListItemActions = ({ task, markAsIncomplete, redirectTo }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <FontAwesomeIcon
        icon={faTimes}
        className="text-red-300"
        title="Mark as incomplete"
        style={{ width: "13px" }}
        onClick={markAsIncomplete}
      />
      <span className="h-4 w-[1px] bg-gray-400"></span>
      <Link to={`/task/${task.id}/edit`}>
        <FontAwesomeIcon
          icon={faPencil}
          className="text-gray-500 transition-all hover:text-green-500"
          style={{ width: "13px" }}
        />
      </Link>
      <Form
        method="delete"
        action={`/task/${task.id}/delete?redirectTo=${redirectTo}`}
      >
        <button type="submit" data-testid="delete-task">
          <FontAwesomeIcon
            icon={faTrash}
            className="text-gray-500 transition-all hover:text-red-500"
            style={{ width: "13px" }}
          />
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="redirectTo" value={redirectTo} />
        </button>
      </Form>
    </div>
  );
};

export default TaskListItemActions;
