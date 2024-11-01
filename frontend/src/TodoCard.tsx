import {Todo} from "./Todo.ts";
import axios from "axios";
import {useState} from "react";
import * as React from "react";

type Props = {
    todo:Todo,
    onTodoItemChange: () => void
}

export default function TodoCard(props: Props) {

    const [description, setDescription] = useState(props.todo.description)

    function deleteThisItem(){
        axios.delete("api/todo/"+props.todo.id)
            .then(props.onTodoItemChange)
    }

    function changeText(event: React.ChangeEvent<HTMLInputElement> ){
        let newDescription = event.target.value
        setDescription(newDescription)
        axios.put("api/todo/"+props.todo.id, {
            id: props.todo.id,
            description: newDescription,
            status: props.todo.status,
        } as Todo)
    }

    return (
        <div className="todo-card">

            <input value={description} onInput={changeText}/>
            <button onClick={deleteThisItem}>delete</button>
        </div>
    );
}

