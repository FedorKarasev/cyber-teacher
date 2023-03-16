import React, { useRef, useEffect, useState } from 'react';
import './Board.scss';
import { useSelector, useDispatch } from 'react-redux';
import { pushToUndo, pushToRedo, setCanvas } from '../../store/canvasSlice';
import { setTool } from '../../store/toolSlice';
import Brush from '../../tools/Brush';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Board = () => {
  const canvasRef = useRef();
  const canvas = useSelector((state) => state.canvas.canvas);
  const tool = useSelector((state) => state.tool.tool);
  const dispatch = useDispatch();
  const connectionHandler = () => {};

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current));
    dispatch(setTool(new Brush(canvasRef.current)));
  }, [dispatch]);

  const mouseDownHandler = () => {
    dispatch(pushToUndo(canvasRef.current.toDataURL()));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>I will not close if you click outside me. Don't even try to press escape key.</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary'>Understood</Button>
        </Modal.Footer>
      </Modal>
      <canvas
        ref={canvasRef}
        className='board'
        width={document.documentElement.clientWidth}
        height={document.documentElement.clientHeight}
        onMouseDown={() => mouseDownHandler()}
      ></canvas>
    </>
  );
};
