import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Main from './pages/product/Main';
import Merge from './pages/product/Merge';
import Report from './pages/report/Report';
import AddProduct from './pages/product/AddProduct';
import Login from './pages/user/Login';
import ReportManagement from './pages/report/ProcessManagement';
import MessageList from './pages/message/MessageList';
import UsedProduct from './pages/product/UsedProduct';
import UsedProductDetail from './pages/product/UsedProductDetail';
import WishList from './pages/wish/WishList';
import SubHeaderLayout from './layouts/SubHeaderLayout';
import MyProductList from './pages/product/MyProductList';
import MessageDetail from './pages/message/MessageDetail';
import ProductEdit from './pages/product/ProductEdit';
import Join from './pages/user/Join';
import ChangePwd from './pages/user/ChangePwd';
import FindId from './pages/user/FindId';
import MyInfo from './pages/user/MyInfo';
import EditMyInfo from './pages/user/EditMyInfo';
import Error from './components/common/Error';
import Result from './components/user/Result';
import FindPwd from './pages/user/FindPwd';



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
          <Route path='productEdit/:productCode' element={<ProductEdit /> } />

          <Route path='/' element={<SubHeaderLayout />}>
            <Route path='myproductlist' element={<MyProductList />} />
            <Route path='wishList' element={<WishList />} />
            <Route path='myInfo' index element={<MyInfo/>}></Route>
            <Route path='editMyInfo' element={<EditMyInfo/>}/>
          </Route>

          <Route path='messageList' element={<MessageList />} />
          <Route path='/messageDetail/:msgCode' element={<MessageDetail/>}/>

          <Route path='/report' element={<Report />} />
          <Route path='/processManagement' element={<ReportManagement />} />

          <Route path='login' element={<Login />} />
          <Route path='join' element={<Join/>}/>
          <Route path='searchPwd' element={<FindPwd/>}/>
          <Route path='searchId' element={<FindId/>}/>
          <Route path='error' element={<Error/>}/>
        </Route>
      </Routes >

    </BrowserRouter >
  );
}

export default App;
