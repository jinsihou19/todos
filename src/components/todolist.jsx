import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoitem';
import ToolBar from './toolbar';
import utils from './utils';

class TodoList extends Component {

    render() {
        const { todoList, onDestroy, onToggle, onSave, filter, changeFilter } = this.props;
        const list = todoList.map(item =>
            <TodoItem
                todo={item}
                editing={false}
                onDestroy={onDestroy}
                onToggle={onToggle}
                onSave={onSave}
                key={item.id}
            />
        );

        return (
            <div>
                <ul className="todo-list">
                    {list}
                </ul>
                <ToolBar
                    count={todoList.length}
                    filter={filter}
                    changeFilter={changeFilter}
                />
            </div>
        );
    }
}

TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    onDestroy: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    filter: PropTypes.oneOf([
        utils.ALL_TODOS,
        utils.ACTIVE_TODOS,
        utils.COMPLETED_TODOS,
    ]).isRequired,
    changeFilter: PropTypes.func.isRequired,
};

export default TodoList;
