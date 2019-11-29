import React, { useState } from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  };

  const addTask = () => {
    if (!inputValue) {
      alert('Введите название задачи!');
      return;
    }

    setIsLoading(true);

    axios
      .post('http://localhost:3001/tasks/', {
        listId: list.id,
        text: inputValue,
        completed: false
      })
      .then(({ data }) => {
        onAddTask(data);
        toggleFormVisible();
      })
      .catch(() => {
        alert('Ошибка при добавлении задачи!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='tasks__form'>
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className='tasks__form-new'>
          <img src={addSvg} alt='Add' />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className='tasks__form-block'>
          <input
            value={inputValue}
            autoFocus={true}
            className='field'
            type='text'
            placeholder='Текст задачи'
            onChange={e => setInputValue(e.target.value)}
          />
          <button
            disabled={!inputValue || isLoading}
            onClick={addTask}
            className='button'
          >
            {isLoading ? 'Добавление' : 'Добавить задачу'}
          </button>
          <button onClick={toggleFormVisible} className='button button-gray'>
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
