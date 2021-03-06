import axios from 'axios';

const url = 'http://localhost:3001/api/persons';

const unpackData = (request) => request.then(response => response.data);

const getAll = () => {
  const request = axios.get(url);

  return unpackData(request);
};

const addContact = (newContact) => {
  const request = axios.post(url, newContact);

  return unpackData(request);
};

const deleteContact = (id) => {
  const request = axios.delete(`${url}/${id}`);

  return unpackData(request);
};

const updateContact = (id, updatedContact) => {
  const request = axios.put(`${url}/${id}`, updatedContact);

  return unpackData(request);
};

export default {
  addContact,
  getAll,
  deleteContact,
  updateContact,
};
