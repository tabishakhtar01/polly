import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "components/Button";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
// import optionsApi from "apis/options";
import { logger } from "common/logger";

const ShowPoll = ({ type = "submit", loading }) => {
  const { id, poll_id } = useParams();
  const [pollDetails, setPollDetails] = useState([]);
  const [optionDetails, setOptionDetails] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setPollDetails(response.data.poll);
      setOptionDetails(response.data.responses);
    } catch (error) {
      //   logger.error(error);
    } finally {
      setPageLoading(false);
    }
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
          <h1 onClick={() => votePoll()}>{optionDetails[0]?.option}</h1>
        </div>

        <h1
          onClick={() => votePoll()}
          className="cursor-pointer pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray"
        >
          {optionDetails[1]?.option}
        </h1>

        <h1
          onClick={() => votePoll()}
          className="cursor-pointer pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray"
        >
          {optionDetails[2]?.option}
        </h1>

        <h1
          onClick={() => votePoll()}
          className="cursor-pointer pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray"
        >
          {optionDetails[3]?.option}
        </h1>

        <Button type={type} buttonText="Vote" loading={loading} />
      </div>
    </Container>
  );
};

export default ShowPoll;
