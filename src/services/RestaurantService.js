import axios from '../http-common';

const getAll = () =>{
    return axios.get("/restaurantitems");
}

const get = id => {
  return axios.get(`/restaurantitems/${id}`);
};

const create = (data) => {
    return axios.post("/restaurantitems", data);
  };
  
  const update = (id, data) => {
    return axios.put(`/restaurantitems/${id}`, data);
  };
  
  const remove = id => {
    return axios.delete(`/restaurantitems/${id}`);
  };
  
  const removeAll = () => {
    return axios.delete(`/restaurantitems`);
  };
  
  const findByTitle = title => {
    return axios.get(`/restaurantitems?title=${title}`);
  };

  const availiableItems = () => {
    return axios.get(`/restaurantitems/availiable`);
  };
  
  export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
    availiableItems
  };