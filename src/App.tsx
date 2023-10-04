/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { HeaderTodo } from './components/HeaderTodo';
import { TodoList } from './components/TodoList';
import { FooterTodo } from './components/FooterTodo';
import { TodosError } from './components/TodosError';
import { getTodos } from './api/todos';
import { useTodo } from './providers/AppProvider';
import { USER_ID } from './utils/fetchClient';
import { getError } from './utils/error';
import { TodoItem } from './components/TodoItem';

export const App: React.FC = () => {
  const {
    todos, setTodosContext, filterBy, errorTitle, setError, setIsLoadingContext,
    todoItem,
  } = useTodo();

  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos(USER_ID);

      setTodosContext(data, filterBy);
    };

    loadTodos()
      .catch(() => setError(getError('loadError')))
      .finally(() => {
        setIsLoadingContext(false);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderTodo />
        <TodoList />
        {todoItem && <TodoItem todo={todoItem} />}
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <FooterTodo />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorTitle && <TodosError />}
    </div>
    // <section className="section container">
    //   <p className="title is-4">
    //     Copy all you need from the prev task:
    //     <br />
    //     <a href="https://github.com/mate-academy/react_todo-app-loading-todos#react-todo-app-load-todos">React Todo App - Load Todos</a>
    //   </p>

  //   <p className="subtitle">Styles are already copied</p>
  // </section>
  );
};
