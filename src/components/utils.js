
const utils = {
    ESCAPE_KEY: 27,
    ENTER_KEY: 13,
    
    ALL_TODOS: 0,
    ACTIVE_TODOS: 1,
    COMPLETED_TODOS: 2,

    store: function (namespace, data) {
        if (data) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        }

        var store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
    },

}

export default utils;