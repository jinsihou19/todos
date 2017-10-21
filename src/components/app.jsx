import React, { Component } from 'react';
import TodoList from './todolist';
import utils from './utils';

class App extends Component {

    constructor(props) {
        super(props);
        const todoList = utils.store('todo');
        this.state = {
            todoList,
            newTodo: '',
            filter: utils.ALL_TODOS,
        }
        this.newTodoChange = this.newTodoChange.bind(this);
        this.newTodoKeyDown = this.newTodoKeyDown.bind(this);
        this.handleItemDestroy = this.handleItemDestroy.bind(this);
        this.handleItemSave = this.handleItemSave.bind(this);
        this.handleItemToggle = this.handleItemToggle.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
    }

    /******** 新增操作 *********/

    newTodoChange(event) {
        this.setState({ newTodo: event.target.value });
    }

    newTodoKeyDown(event) {
        if (event.which === utils.ENTER_KEY) {
            const val = event.target.value.trim();
            if (val) {
                this.saveNewTodo(val);
            }
        }
    }

    saveNewTodo(content) {
        const { todoList } = this.state;
        todoList.push({
            id: +new Date(),
            title: content,
            completed: false,
        })
        this.setState({ todoList: todoList, newTodo: '' });
        utils.store('todo', todoList);
    }

    /******** item 操作 *********/

    handleItemDestroy(id) {
        const { todoList } = this.state;
        const res = todoList.filter((item => item.id !== id));
        this.setState({ todoList: res });
        utils.store('todo', res);
    }

    handleItemSave(todo) {
        const res = this.state.todoList.map((item => item.id === todo.id ? Object.assign(item, todo) : item));
        this.setState({ todoList: res });
        utils.store('todo', res);
    }

    handleItemToggle(id) {
        const res = this.state.todoList.map((item => item.id === id ? Object.assign({}, item, { completed: !item.completed }) : item));
        this.setState({ todoList: res });
        utils.store('todo', res);
    }

    changeFilter(type) {
        this.setState({ filter: type })
    }

    render() {
        const { todoList, filter, newTodo } = this.state;
        let showTodoList = todoList;
        if (filter !== utils.ALL_TODOS) {
            showTodoList = todoList.filter(todo => filter === utils.ACTIVE_TODOS ? todo.completed !== true : todo.completed === true);
        }

        return (
            <div className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        placeholder="接下来我要做些什么事？"
                        value={newTodo}
                        onKeyDown={this.newTodoKeyDown}
                        onChange={this.newTodoChange}
                        autoFocus={true}
                    />
                </header>
                <TodoList
                    todoList={showTodoList}
                    onDestroy={this.handleItemDestroy}
                    onToggle={this.handleItemToggle}
                    onSave={this.handleItemSave}
                    filter={filter}
                    changeFilter={this.changeFilter}
                />
            </div>
        );
    }
}

export default App;
