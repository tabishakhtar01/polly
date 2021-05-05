import axios from "axios";

const voteOption = id => axios.get(`/responses/${id}`);

const optionsApi = {
  voteOption,
};

export default optionsApi;
