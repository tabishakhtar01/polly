import React, { useState } from "react";
import Container from "components/Container";
import PollForm from "components/Polls/Form/PollsForm";
import pollsApi from "apis/polls";
import { logger } from "common/logger";

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.create({
        poll: {
          title,
          responses_attributes: [
            { option: option1 },
            { option: option2 },
            { option: option3 },
            { option: option4 },
          ],
        },
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      //   logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <PollForm
        setTitle={setTitle}
        option1={option1}
        option2={option2}
        option3={option3}
        option4={option4}
        setOption1={setOption1}
        setOption2={setOption2}
        setOption3={setOption3}
        setOption4={setOption4}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreatePoll;
