import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Main from './pages/product/Main';
import Merge from './pages/product/Merge';
import AdminHeader from './components/common/AdminHeader';
import Report from './pages/report/Report';
import AddProduct from './pages/product/AddProduct';
import Login from './pages/user/Login';
import Test from './pages/user/Test';
import ReportManagement from './pages/report/ReportManagement';
import ProcessDetail from './pages/report/ProcessDetail';
import UsedProduct from './pages/product/UsedProduct';
import UsedProductDetail from './pages/product/UsedProductDetail';
import WishList from './pages/wish/WishList';
import SubHeaderLayout from './layouts/SubHeaderLayout';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />}>

          <Route index element={<Main />} />
          <Route path='merge' element={<Merge />} />
          <Route path='usedProduct' element={<UsedProduct />} />
          <Route path='usedProduct/:productCode' element={<UsedProductDetail />} />
          <Route path='addProduct' element={<AddProduct />} />

          <Route path='myPage' element={<SubHeaderLayout />}>
            <Route path='wishList' element={<WishList />} />
          </Route>

          <Route path='admin' element={<AdminHeader />} />
          <Route path='/report' element={<Report />} />
          <Route path='/reportSelect' element={<ReportManagement />} />
          <Route path='/processDetail/:reportNo' element={<ProcessDetail />} />
          
        <Route path='login' element={<Login />} />
        <Route path='test' element={<Test />} />
    
      </Route>
    </Routes >
    </BrowserRouter >
  );
}

export default App;
