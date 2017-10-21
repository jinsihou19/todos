import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import utils from './utils';

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = { editText: this.props.todo.title, editing: false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleEdit() {
        this.setState({ editText: this.props.todo.title, editing: true });
    }

    handleChange(event) {
        if (this.state.editing) {
            this.setState({ editText: event.target.value });
        }
    }

    handleKeyDown(event) {
        if (event.which === utils.ESCAPE_KEY) {
            this.setState({ editText: this.props.todo.title });
            this.props.onCancel(event);
        } else if (event.which === utils.ENTER_KEY) {
            this.handleSubmit(event);
        }
    }

    handleSubmit(event) {
        const { onSave, onDestroy, todo } = this.props;
        var val = this.state.editText.trim();
        if (val) {
            onSave(Object.assign(todo, {
                title: val
            }));
            this.setState({ editText: val, editing: false });
        } else {
            onDestroy(todo.id);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.editing && this.state.editing) {
            const node = this.editField;
            const length = node.value.length;
            node.focus();
            node.setSelectionRange(length, length);
        }
    }

    render() {
        const { todo, onToggle, onDestroy } = this.props;
        const { editText, editing } = this.state;
        return (
            <li className={classNames({
                completed: todo.completed,
                editing,
            })}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                    />
                    <label onDoubleClick={this.handleEdit}>
                        {todo.title}
                    </label>
                    <button className="destroy" onClick={() => onDestroy(todo.id)} />
                </div>
                <input
                    ref={(editField) => this.editField = editField}
                    className="edit"
                    value={editText}
                    onBlur={this.handleSubmit}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        );
    }
}

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }),
    onToggle: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default TodoItem;
