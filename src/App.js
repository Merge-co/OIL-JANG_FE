import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Main from './pages/product/Main';
import Merge from './pages/product/Merge';
import AdminHeader from './components/common/AdminHeader';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />}>

          <Route index element={<Main />} />
          <Route path='product/merge' element={<Merge />} />
          <Route path='admin' element={<AdminHeader />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
