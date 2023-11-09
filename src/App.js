import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Main from './pages/product/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={ <Layout/> }>

          <Route index element={ <Main/> }/>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
