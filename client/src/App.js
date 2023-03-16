import './App.css';
import { BrowserRouter, Navigate, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import { Main } from './components/Main/Main';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Main />,
//   },
// ]);

function App() {
  // return <RouterProvider router={router} />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:id' element={<Main />} />
        <Route path='/' element={<Navigate replace to={`f${(+new Date()).toString(16)}`} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
