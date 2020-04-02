import React, { useReducer } from 'react';

export default  (reducer, actions, defaultValue) => {
    const Context = React.createContext(); // context is been used to move data around 

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch); //for more info visit: https://www.udemy.com/course/the-complete-react-native-and-redux-course/learn/lecture/15707494#overview
        }
        return (
            <Context.Provider value = {{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };
    return { Context, Provider };
};