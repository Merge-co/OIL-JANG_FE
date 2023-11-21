import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Main from './pages/product/Main';
import Merge from './pages/product/Merge';
import Report from './pages/report/Report';
import AddProduct from './pages/product/AddProduct';
import Login from './pages/user/Login';
import Test from './pages/user/Test';
import ReportManagement from './pages/report/ReportManagement';
import ProcessDetail from './pages/report/ProcessDetail';
import ReportUpdate from './pages/report/ReportUpdate';
import AdminNav from './components/common/AdminNav';
import Search from './pages/report/Search';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='merge' element={<Merge />} />
          <Route path='addProduct' element={<AddProduct />} />
          <Route path='admin' element={<AdminNav />} />
          <Route path='/report' element={<Report />} />
          <Route path='search' element={<Search />} />
          <Route path='/reportSelect' element={<ReportManagement />} />
          <Route path='/processDetail/:reportNo' element={<ProcessDetail />} />
          <Route path='/process/:reportNo' element={<ReportUpdate />} />
          <Route path='login' element={<Login />} />
          <Route path='test' element={<Test />} />
        </Route>
      </Routes >
    </BrowserRouter >
  );
}

export default App;
