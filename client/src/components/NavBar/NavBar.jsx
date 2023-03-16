import React from 'react';
import './NavBar.scss';
import { setLineWidth, setStrokeColor } from '../../store/toolSlice';
import { asyncUndo, redo } from '../../store/canvasSlice';
import { useDispatch } from 'react-redux';

export const NavBar = () => {
  const dispatch = useDispatch();

  return (
    <div className='navbar control_block'>
      <div className='logo'>CyberTeacher</div>
      <ul className='navigation'>
        <li>
          <a>Поделиться</a>
        </li>
        <li>
          <a>Сохранить</a>
        </li>
        <li>
          <a>Настройки</a>
        </li>
        <li>
          <a>Профиль</a>
        </li>
        |
        <li>
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault();
              dispatch(asyncUndo());
            }}
          >
            Назад
          </a>
        </li>
        <li>
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault();
              dispatch(redo());
            }}
          >
            Вперед
          </a>
        </li>
      </ul>
      |
      <ul>
        <li>
          <label htmlFor='line-width'>Толщина линии</label>
          <input
            id='line-width'
            type='number'
            min={1}
            max={50}
            defaultValue={1}
            onChange={(e) => dispatch(setLineWidth(e.target.value))}
          />
        </li>
        <li>
          <label htmlFor='stroke-color'>Цвет обводки</label>
          <input id='stroke-color' type='color' onChange={(e) => dispatch(setStrokeColor(e.target.value))} />
        </li>
      </ul>
    </div>
  );
};
