import React from "react";

const ListPolls = ({ data, showPoll, updatePoll, destroyPoll }) => {
  return (
    <>
      <h1>List of Polls Available</h1>
      {data.map(poll => (
        <li key={poll.id}>
          <span className="cursor-pointer" onClick={() => showPoll(poll.id)}>
            {poll.title}
          </span>
          <span
            className="px-6 cursor-pointer"
            onClick={() => updatePoll(poll.id)}
          >
            Edit
          </span>
          <span
            className="text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => destroyPoll(poll.id)}
          >
            Delete
          </span>
        </li>
      ))}
    </>
  );
};

export default ListPolls;
