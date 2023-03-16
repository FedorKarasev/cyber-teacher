import React from 'react';
import { Board } from '../Board/Board';
import { NavBar } from '../NavBar/NavBar';
import { ToolBox } from '../ToolBox/ToolBox';
import './Main.scss';

export const Main = () => {
  return (
    <div className='main'>
      <NavBar />
      <ToolBox />
      <Board />
    </div>
  );
};
