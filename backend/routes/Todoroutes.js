const {Router} = require("express")
const { getToDo,saveTodo, updateTodo, deleteTodo } = require("../controllers/Todocontroller");
const router = Router()

router.get('/',getToDo)
router.post('/save', saveTodo)
router.put('/update',updateTodo)
router.delete('/delete/:todoId', deleteTodo)

module.exports=router;