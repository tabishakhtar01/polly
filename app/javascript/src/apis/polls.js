import axios from "axios";

const list = () => axios.get("/polls");
const show = id => axios.get(`/polls/${id}`);
const create = payload => axios.post("/polls/", payload);
const update = ({ id, payload }) => axios.put(`/polls/${id}`, payload);

const pollsApi = {
  list,
  show,
  create,
  update,
};

export default pollsApi;
