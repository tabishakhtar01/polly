import axios from "axios";

const list = () => axios.get("/polls");
const show = id => axios.get(`/polls/${id}`);
const create = payload => axios.post("/polls/", payload);
const update = ({ id, payload }) => axios.put(`/polls/${id}`, payload);
const destroy = id => axios.delete(`/polls/${id}`);

const pollsApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default pollsApi;
