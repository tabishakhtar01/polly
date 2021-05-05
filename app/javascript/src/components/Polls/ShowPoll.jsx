import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import optionsApi from "apis/options";
import { logger } from "common/logger";

const ShowPoll = () => {
  const { id, poll_id } = useParams();
  const [pollDetails, setPollDetails] = useState([]);
  const [optionDetails, setOptionDetails] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setPollDetails(response.data.poll);
    } catch (error) {
      //   logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const fetchPollOptions = async () => {
    try {
      const response = await optionsApi.voteOption(id);
      setOptionDetails(response.data.response);
      // console.log(response.data.response);
    } catch (error) {
      //   logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPollDetails();
    fetchPollOptions();
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

        <div className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
          <h1>{optionDetails[0]?.option}</h1>
        </div>

        <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
          {optionDetails[1]?.option}
        </h1>

        <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
          {optionDetails[2]?.option}
        </h1>

        <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
          {optionDetails[3]?.option}
        </h1>
      </div>
    </Container>
  );
};

export default ShowPoll;
