import React from "react";

const ListPolls = ({ data, showPoll, updatePoll, destroyPoll }) => {
  return (
    <>
      <div className="table w-full p-2">
        <h1 className="text-center mb-5 text-lg font-bold">
          List of Available Poll
        </h1>
        <table className="w-full border">
          {/* <thead className="bg-gray-50 border-b"> */}
          {/* <tr className="bg-gray-50 border-b"> */}
          {/* <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500"> */}
          {/* <div className="flex items-center justify-center"> */}
          {/* List Of Available polls */}
          {/* </div> */}
          {/* </th> */}
          {/* </tr> */}
          {/* </thead> */}
          <tbody>
            {data.map(poll => (
              <tr
                className="bg-gray-100 text-center border-b text-xl text-gray-800"
                key={poll.id}
              >
                {/* <td className="p-2 border-r"> */}
                <td
                  className="cursor-pointer p-2 border-r"
                  onClick={() => showPoll(poll.id)}
                >
                  {poll.title}
                </td>
                <td>
                  {" "}
                  <span
                    className="text-blue-500 p-2  text-lg cursor-pointer hover:text-blue-700"
                    onClick={() => updatePoll(poll.id)}
                  >
                    Edit
                  </span>
                </td>
                <td>
                  {" "}
                  <span
                    className="text-red-500 p-2   text-lg cursor-pointer hover:text-red-700"
                    onClick={() => destroyPoll(poll.id)}
                  >
                    Delete
                  </span>
                </td>
                {/* </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <h1 >List of Polls Available</h1>
      {data.map(poll => (
        <li key={poll.id}>
          <span className="cursor-pointer" onClick={() => showPoll(poll.id)}>{poll.title}</span>
          <span className="px-6 cursor-pointer" onClick={() => updatePoll(poll.id)}>Edit</span>
          <span className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => destroyPoll(poll.id)}>Delete</span>
        </li>
      ))} */}
    </>
  );
};

export default ListPolls;
