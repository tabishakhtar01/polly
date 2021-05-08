import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import { useHistory } from "react-router-dom";
import Container from "components/Container";
import ListPolls from "components/Polls/ListPolls";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import { logger } from "common/logger";

const Dashboard = () => {
  const history = useHistory();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPolls = async () => {
    try {
      const response = await pollsApi.list();
      setPolls(response.data.polls);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const showPoll = id => {
    history.push(`/polls/${id}/show`);
  };

  const updatePoll = id => {
    history.push(`/polls/${id}/edit`);
  };

  const destroyPoll = async id => {
    try {
      await pollsApi.destroy(id);
      await fetchPolls();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(polls)) {
    return (
      <Container>
        <ListPolls
          data={polls}
          showPoll={showPoll}
          // updatePoll={updatePoll}
          destroyPoll={destroyPoll}
        />
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-xl leading-5 text-center">
        You have no polls assigned 😔
      </h1>
    </Container>
  );
};

export default Dashboard;
