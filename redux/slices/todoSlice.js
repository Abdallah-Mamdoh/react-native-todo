import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
    name : "todo",
    initialState : {
        todos : [],
        lists:[],
        filteredLists:[],
        allState : 1,
        activeState : null,
        doneState : null,
        modal : false,
        wantDeleteId: null
    },
    reducers : {
        addTodo : (state,action)=>{
            const current = [...state.lists]
            state.todos = [...current,action.payload];
            state.lists = [...current,action.payload];
        },
        removeTodo : (state) =>{
            const id = state.wantDeleteId;
            state.todos = state.todos.filter((data)=>data.id != id);
            state.lists = state.todos
        },
        doneTodo : (state,action) =>{
            const listId = action.payload;
            const listIndex = state.todos.findIndex((data)=>data.id == listId)
            state.todos[listIndex].state = !state.todos[listIndex].state;
            state.lists=state.todos
        },
        allTodos : (state) =>{
            state.lists = state.todos
            state.allState = 1;
            state.activeState = null;
            state.doneState = null;
        },
        activeTodos : (state) =>{
            state.lists = state.todos.filter((data)=>data.state == false);
            state.allState = null;
            state.activeState = 1;
            state.doneState = null;
        },
        doneTodos : (state) =>{
            state.lists = state.todos.filter((data)=>data.state == true);
            state.allState = null;
            state.activeState = null;
            state.doneState = 1;
        },
        modalVisible : (state)=>{
            state.modal=!state.modal
        },
        getDeleteId : (state,action)=>{
            state.wantDeleteId = action.payload;
        },
        completedLists: (state)=>{
            state.filteredLists = state.todos.filter((e)=>e.state == true);
        }
    }
})
export const {addTodo,removeTodo,doneTodo,allTodos,activeTodos,doneTodos,modalVisible,getDeleteId,completedLists} = TodoSlice.actions;
export default TodoSlice;