import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "components/Button";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import votesApi from "apis/votes";
import { logger } from "common/logger";
import { getFromLocalStorage } from "helpers/storage";

const ShowPoll = () => {
  const { id } = useParams();
  const userId = getFromLocalStorage("authUserId");
  const [pollDetails, setPollDetails] = useState([]);
  const [optionDetails, setOptionDetails] = useState([]);
  const [votedOption, setVotedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  const [votes, setVotes] = useState([]);

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      const userVotes = response.data.votes.find(v => v.user_id == userId);
      setPollDetails(response.data.poll);
      setOptionDetails(response.data.responses);
      setVotes(response.data.votes);
      setVotedOption(userVotes ? userVotes.response_id : userVotes);
      setIsVoted(Boolean(userVotes));
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await votesApi.create({
        vote: { poll_id: id, response_id: votedOption },
      });
      fetchPollDetails();
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const getVotePercentage = optionId => {
    if (!votes.length) {
      return "0";
    }

    const filteredVotes = votes.filter(v => v.response_id == optionId);
    const votePercentage = (filteredVotes.length / votes.length) * 100;
    if (votePercentage % 1) return votePercentage.toFixed(2);
    else return votePercentage;
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="text-center">
        <h1 className="pb-6 pt-6 mt-10 mb-10 text-3xl text-bold leading-5 text-bb-gray">
          {pollDetails?.title}
        </h1>

        <div className="cursor-pointer pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
          <h1>
            <span
              className={`p-2 w-3/4 inline-block rounded cursor-pointer hover:bg-bb-purple hover:text-white ${
                optionDetails[0]?.id === votedOption
                  ? "bg-blue-800 text-white shadow-md animate-bounce"
                  : ""
              } 
                ${isVoted ? "pointer-events-none" : ""}`}
              onClick={() => setVotedOption(optionDetails[0]?.id)}
            >
              {" "}
              {optionDetails[0]?.option}{" "}
            </span>
            {isVoted ? (
              <span className="w-1/4 flex-end pl-4">
                {getVotePercentage(optionDetails[0]?.id)}%
                <div className="w-5/6 inline-block justify-center">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                      <div
                        style={{
                          width: `${getVotePercentage(optionDetails[0]?.id)}%`,
                        }}
                        className=" shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-700"
                      ></div>
                    </div>
                  </div>
                </div>
              </span>
            ) : (
              ""
            )}
          </h1>
        </div>

        <div className="cursor-pointer pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
          <h1>
            <span
              className={`p-2 w-3/4 rounded inline-block cursor-pointer hover:bg-bb-purple hover:text-white ${
                optionDetails[1]?.id === votedOption
                  ? "bg-blue-800 text-white shadow-md animate-bounce"
                  : ""
              } ${isVoted ? "pointer-events-none" : ""}`}
              onClick={() => setVotedOption(optionDetails[1]?.id)}
            >
              {" "}
              {optionDetails[1]?.option}{" "}
            </span>
            {isVoted ? (
              <span className="w-1/4 pl-4">
                {getVotePercentage(optionDetails[1]?.id)}%
                <div className="w-5/6 inline-block justify-center">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                      <div
                        style={{
                          width: `${getVotePercentage(optionDetails[1]?.id)}%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </span>
            ) : (
              ""
            )}
          </h1>
        </div>

        <div className="cursor-pointer pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
          <h1>
            <span
              className={`p-2 w-3/4 inline-block cursor-pointer hover:bg-bb-purple rounded hover:text-white ${
                optionDetails[2]?.id === votedOption
                  ? "bg-blue-800 text-white shadow-md animate-bounce"
                  : ""
              } ${isVoted ? "pointer-events-none" : ""}`}
              onClick={() => setVotedOption(optionDetails[2]?.id)}
            >
              {" "}
              {optionDetails[2]?.option}{" "}
            </span>
            {isVoted ? (
              <span className="w-1/4 pl-4">
                {getVotePercentage(optionDetails[2]?.id)}%
                <div className="w-5/6 inline-block justify-center">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                      <div
                        style={{
                          width: `${getVotePercentage(optionDetails[2]?.id)}%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </span>
            ) : (
              ""
            )}
          </h1>
        </div>

        <div className="cursor-pointer pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
          <h1>
            <span
              className={`p-2 w-3/4 rounded inline-block cursor-pointer hover:bg-bb-purple hover:text-white ${
                optionDetails[3]?.id === votedOption
                  ? "bg-blue-800 text-white shadow-md animate-bounce"
                  : ""
              } ${isVoted ? "pointer-events-none" : ""}`}
              onClick={() => setVotedOption(optionDetails[3]?.id)}
            >
              {" "}
              {optionDetails[3]?.option}{" "}
            </span>
            {isVoted ? (
              <span className="w-1/4 pl-4">
                {getVotePercentage(optionDetails[3]?.id)}%
                <div className="w-5/6 inline-block justify-center">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                      <div
                        style={{
                          width: `${getVotePercentage(optionDetails[3]?.id)}%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </span>
            ) : (
              ""
            )}
          </h1>
        </div>

        <div className=" w-3/4 inline-block justify-center px-6">
          {isVoted ? (
            <p className="py-2 font-medium animate-pulse">Voted, Awesome! 🎉</p>
          ) : (
            <Button
              loading={loading}
              onClick={handleSubmit}
              buttonText="Vote"
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default ShowPoll;
