import React from "react";

const ListPolls = ({ data, showPoll, updatePoll, destroyPoll }) => {
  return (
    <>
      {/* <div className="w-full p-2"> */}
      <h1 className="text-center mb-10 text-5xl">List of Available Poll</h1>
      <table className="w-full divide-y">
        <tbody>
          {data.map(poll => (
            <tr
              className="text-center border-b text-xl text-gray-800"
              key={poll.id}
            >
              <td
                className="cursor-pointer pt-5 pb-5 border-r"
                onClick={() => showPoll(poll.id)}
              >
                {poll.title}
              </td>
              <td>
                {" "}
                {/* <span
                    className="text-blue-500 p-2  text-lg cursor-pointer hover:text-blue-700"
                    onClick={() => updatePoll(poll.id)}
                  >
                    Edit
                  </span> */}
              </td>
              <td>
                {" "}
                <span
                  className="text-red-500 p-2 text-lg cursor-pointer hover:text-red-700"
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
      {/* </div> */}
    </>
  );
};

export default ListPolls;
