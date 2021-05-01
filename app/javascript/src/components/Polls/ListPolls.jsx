import React from "react";

const ListPolls = ({ data, showPoll, updatePoll }) => {
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
        </li>
      ))}
    </>
  );
};

export default ListPolls;
