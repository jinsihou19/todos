import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import utils from './utils';

const ToolBar = ({ count, filter, changeFilter }) => {

    const actions = [
        {
            type: utils.ALL_TODOS,
            text: '全部',
        },
        {
            type: utils.ACTIVE_TODOS,
            text: '未完成',
        },
        {
            type: utils.COMPLETED_TODOS,
            text: '已完成',
        },
    ].map(action => <li key={action.type}>
        <a
            className={classNames({ selected: filter === action.type })}
            onClick={() => changeFilter(action.type)}
        >
            {action.text}
        </a>
    </li>);

    return (
        <footer className="footer">
            <span className="todo-count">
                剩余 <strong>{count}</strong> 项
					</span>
            <ul className="filters">
                {actions}
            </ul>
        </footer>
    );
};

ToolBar.propTypes = {
    count: PropTypes.number.isRequired,
    filter: PropTypes.oneOf([
        utils.ALL_TODOS,
        utils.ACTIVE_TODOS,
        utils.COMPLETED_TODOS,
    ]).isRequired,
    changeFilter: PropTypes.func.isRequired,
};

export default ToolBar;
