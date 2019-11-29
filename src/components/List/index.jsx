import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import removeSvg from '../../assets/img/remove.svg';

import { Badge } from '../../components';

import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove, activeItem }) => {
  const removeList = item => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul className='list'>
      {items.map((item, index) => (
        <li
          onClick={onClick ? () => onClick(item) : null}
          key={index}
          className={classNames({
            active: activeItem && activeItem.id === item.id
          })}
        >
          {item.icon ? <i>{item.icon}</i> : <Badge color={item.color.name} />}
          <span>
            {item.name} {item.tasks && item.tasks.length}
          </span>

          {isRemovable && (
            <img
              className='list__remove-icon'
              src={removeSvg}
              alt='X'
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
