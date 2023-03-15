import React, { useRef, useEffect } from 'react';
import './Board.scss';
import { useSelector, useDispatch } from 'react-redux';
import { pushToUndo, pushToRedo, setCanvas } from '../../store/canvasSlice';
import { setTool } from '../../store/toolSlice';
import Brush from '../../tools/Brush';

export const Board = () => {
  const canvasRef = useRef();
  const canvas = useSelector((state) => state.canvas.canvas);
  const tool = useSelector((state) => state.tool.tool);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current));
    dispatch(setTool(new Brush(canvasRef.current)));
  }, [dispatch]);

  const mouseDownHandler = () => {
    dispatch(pushToUndo(canvasRef.current.toDataURL()));
  };

  return (
    <canvas
      ref={canvasRef}
      className='board'
      width={document.documentElement.clientWidth}
      height={document.documentElement.clientHeight}
      onMouseDown={() => mouseDownHandler()}
    ></canvas>
  );
};
