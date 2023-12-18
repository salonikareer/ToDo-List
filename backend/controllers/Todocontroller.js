const Todomodel = require('../models/Todomodel')

module.exports.getToDo = async(req,res)=>{
    const todo=await Todomodel.find()
    res.send(todo)

}

module.exports.saveTodo = async(req,res)=>{
    const {text} = req.body

 Todomodel
 .create({text})
 .then((data)=> {
   console.log("added sucessfully.."); 
   console.log(data);
   res.send(data)
 })
    
}

module.exports.updateTodo =async(req,res)=>{
    const {_id,text}= req.body
    Todomodel
    .findByIdAndUpdate(_id,{text})
    .then(()=>res.send("Update Sucessfully.."))
    .catch((err) =>console.log(err))
}

module.exports.deleteTodo = async (req, res) => {
    const { todoId } = req.params; // Use req.params to get the todoId from the URL parameters
    Todomodel
        .findByIdAndDelete(todoId) // Use findByIdAndDelete to delete based on _id
        .then(() => res.send("Delete Successfully.."))
        .catch((err) => console.log(err))
}