import axios from 'axios';

const baseURL = "http://localhost:5000";

const getAllToDo = (setToDo) => {
  axios
    .get(baseURL)
    .then(({ data }) => {
      setToDo(data);
      console.log('data----->', data);
    })
    .catch((err) => console.log(err));
};


const addToDo = (text, settext, setToDo) => {
  axios
    .post(`${baseURL}/save`, { text })
    .then((data) => {
      console.log(data);
      settext("");
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const updateTodo = (todoId, text, setToDo, settext, setisupdating) => {

  axios
    .put(`${baseURL}/update`, { _id: todoId, text }) 
    .then((data) => {
      console.log(data);
      settext("");
      setisupdating(false);
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const deleteTodo = async (todoId) => {
  try {
    const response = await axios.delete(`${baseURL}/delete/${todoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};




  
export { getAllToDo, addToDo, updateTodo,deleteTodo };
