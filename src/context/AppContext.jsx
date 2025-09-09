import React, { createContext, useContext, useReducer, useEffect } from 'react';

function safeParse(item, fallback) {
  try {
    const value = localStorage.getItem(item);
    return value ? JSON.parse(value) : fallback;
  } catch (err) {
    return fallback;
  }
}

const init = {
  auth: {
    isAuthenticated: !!localStorage.getItem('auth'),
    user: safeParse('user', null),
  },
  tasks: safeParse('tasks', []),
  theme: localStorage.getItem('theme') || 'light',
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('auth', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return { ...state, auth: { isAuthenticated: true, user: action.payload.user } };

    case 'LOGOUT':
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
      return { ...state, auth: { isAuthenticated: false, user: null } };

    case 'SET_TASKS':
      return { ...state, tasks: action.payload };

    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case 'UPDATE_TASK':
  return {
    ...state,
    tasks: state.tasks.map(t =>
      t.id === Number(action.payload.id) ? { ...t, ...action.payload } : t
    ),
  };


    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { ...state, theme: newTheme };

    default:
      return state;
  }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, init);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

export default AppContext;
