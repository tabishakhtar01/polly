import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PollsForm from "./Form/PollsForm";
import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";
import Toastr from "components/Common/Toastr";
import { logger } from "common/logger";

const EditPoll = ({ history }) => {
  const [title, setTitle] = useState("");
  //   const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.update({ id, payload: { poll: { title } } });
      setLoading(false);
      Toastr.success("Successfully updated poll.");
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setTitle(response.data.poll.title);
      //   setUserId(response.data.task.user_id);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <PollsForm
        type="update"
        title={title}
        setTitle={setTitle}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditPoll;
