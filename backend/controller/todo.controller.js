import Todo from "../models/todo.model.js";
export const createTodo = async(req,res) => {
    const todo = new Todo({
        text : req.body.text,
        completed : req.body.completed
    })

    try {
        const newTodo = await todo.save();
        res.status(200).json({message:"Todo created successfully",newTodo})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Error occur while adding the todo" })
    }
};

export const getTodos = async (req,res)=>{
    try {
        const todos = await Todo.find();
         res.status(200).json({message:"Todo fetched successfully",todos})
    } catch (error) {
         console.log(error);
        res.status(400).json({message:"Error occur while fetching the todo" })
    }
};

export const updateTodo = async(req,res) =>{
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id , req.body, {
            new : true,
        });
         res.status(200).json({message:"Todo updated successfully",todo});
    } catch (error) {
         console.log(error);
        res.status(400).json({message:"Error occur while fetching the todo" })
    }
};

export const deleteTodo = async(req,res) => {
    try {
      const todo =  await Todo.findByIdAndDelete(req.params.id)
      if(!todo) {
        return res.status(404).json({message:"Todo not found "})
      }
         res.status(200).json({message:"Todo deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Error occur while deleting the todo" })
    }
}