import './App.css';
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Main } from './components/Main/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
