import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <>
    <div className="text-2xl font-bold text-center my-4 text-gray-800">Todos</div>
    <ul className="space-y-4 mx-auto max-w-lg">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:bg-gray-50"
        >
          <span className="text-gray-700 text-lg">{todo.text}</span>
          <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600"
          >
            X
          </button>
        </li>
      ))}
    </ul>
  </>
  
  );
}

export default Todos;
