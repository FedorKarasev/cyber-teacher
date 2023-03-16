import React, { useRef, useEffect, useState } from 'react';
import './Board.scss';
import { useSelector, useDispatch } from 'react-redux';
import { pushToUndo, pushToRedo, setCanvas, setUserName, setSocket, setSessionId } from '../../store/canvasSlice';
import { setTool } from '../../store/toolSlice';
import Brush from '../../tools/Brush';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Rectangle from '../../tools/Rectangle';

export const Board = () => {
  const canvasRef = useRef();
  const canvas = useSelector((state) => state.canvas);
  const tool = useSelector((state) => state.tool.tool);
  const dispatch = useDispatch();
  const userNameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();

  const connectionHandler = () => {
    dispatch(setUserName(userNameRef.current.value));
    setModal(false);
  };

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current));
  }, [dispatch]);

  useEffect(() => {
    if (canvas.userName) {
      const socket = new WebSocket('ws://localhost:5000');
      dispatch(setSocket(socket));
      dispatch(setSessionId(params.id));
      dispatch(setTool(new Brush(canvasRef.current, socket, params.id)));
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            userName: canvas.userName,
            method: 'connection',
          })
        );
      };
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case 'connection':
            console.log('Подключен');
            break;
          case 'draw':
            drawHandler(msg);
            break;
        }
      };
    }
  }, [canvas.userName]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case 'rectangle':
        Rectangle.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
        break;
      case 'finish':
        ctx.beginPath();
        break;
    }
  };

  const mouseDownHandler = () => {
    dispatch(pushToUndo(canvasRef.current.toDataURL()));
  };

  return (
    <>
      <Modal show={modal} onHide='' backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor='name'>Введите ваше имя</label>
          <br />
          <input ref={userNameRef} id='name' type='text' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={connectionHandler}>
            Войти
          </Button>
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
