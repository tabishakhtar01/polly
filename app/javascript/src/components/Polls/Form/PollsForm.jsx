import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  type = "create",
  title,
  setTitle,
  option1,
  option2,
  option3,
  option4,
  setOption1,
  setOption2,
  setOption3,
  setOption4,
  loading,
  handleSubmit,
}) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h1 className="pb-6 pt-6 mt-10 mb-4 text-3xl text-bold leading-5 text-bb-gray">
        Your Poll Question Here
      </h1>
      <Input
        label=""
        placeholder="Enter Your Question"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <h1 className="pt-6 mt-10 mb-4 text-xl text-bold leading-5 text-bb-gray">
        Your Options Here{" "}
      </h1>
      <Input
        label=""
        placeholder="Option 1"
        value={option1}
        onChange={e => setOption1(e.target.value)}
      />

      <Input
        label=""
        placeholder="Option 2"
        value={option2}
        onChange={e => setOption2(e.target.value)}
      />

      <Input
        label=""
        placeholder="Option 3"
        value={option3}
        onChange={e => setOption3(e.target.value)}
      />

      <Input
        label=""
        placeholder="Option 4"
        value={option4}
        onChange={e => setOption4(e.target.value)}
      />

      <Button
        type="submit"
        buttonText={type === "create" ? "Create Poll" : "Update Poll"}
        loading={loading}
      />
    </form>
  );
};

export default PollForm;
