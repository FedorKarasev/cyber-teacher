import React, { useState, useEffect, useRef } from 'react';
import './ToolBox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
import { useDispatch, useSelector } from 'react-redux';
import { setFillColor, setStrokeColor, setTool } from '../../store/toolSlice';
import Brush from '../../tools/Brush';
import Rectangle from '../../tools/Rectangle';
import Circle from '../../tools/Circle';
import Line from '../../tools/Line';
import Eraser from '../../tools/Eraser';

export const ToolBox = () => {
  const [toolBoxHeight, setToolBoxHeight] = useState(0);
  const windowHeight = document.documentElement.clientHeight;
  const ref = useRef(null);

  const canvas = useSelector((state) => state.canvas.canvas);
  const dispatch = useDispatch();

  useEffect(() => {
    setToolBoxHeight(ref.current.clientHeight);
  }, []);

  const changeColor = (color) => {
    dispatch(setFillColor(color));
  };

  return (
    <div className='toolbox control_block' style={{ top: windowHeight / 2 - toolBoxHeight / 2 }} ref={ref}>
      <ul className='toolbox__tools'>
        <li>
          <FontAwesomeIcon icon={solid('arrow-pointer')} className='fa-icon' />
        </li>
        <li>
          <FontAwesomeIcon icon={solid('hand')} className='fa-icon' />
        </li>
        <li onClick={() => dispatch(setTool(new Eraser(canvas)))}>
          <FontAwesomeIcon icon={solid('eraser')} className='fa-icon' />
        </li>
        <li onClick={() => dispatch(setTool(new Brush(canvas)))}>
          <FontAwesomeIcon icon={solid('pen')} className='fa-icon' />
        </li>
        <li onClick={() => dispatch(setTool(new Line(canvas)))}>
          <FontAwesomeIcon icon={solid('slash')} className='fa-icon' />
        </li>
        <li>
          <FontAwesomeIcon
            icon={regular('square')}
            className='fa-icon'
            onClick={() => dispatch(setTool(new Rectangle(canvas)))}
          />
        </li>
        <li onClick={() => dispatch(setTool(new Circle(canvas)))}>
          <FontAwesomeIcon icon={regular('circle')} className='fa-icon' />
        </li>
        <li>
          <input type='color' onChange={(e) => changeColor(e.target.value)} />
        </li>
      </ul>
    </div>
  );
};
