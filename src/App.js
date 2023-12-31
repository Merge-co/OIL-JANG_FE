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
import FindPwd from './pages/user/FindPwd';
import Message from './components/message/Message';
import InquiryList from './pages/inquery/InquiryList';
import MyCalendar from './pages/myCalendar/MyCalendar';
import AuthCheck from './AuthCheck';
import InquiryDetail from './pages/inquery/InquiryDetail';
import InquiryDetailForm from './pages/inquery/InquiryDetailForm';
import InquiryAdmin from './pages/inquery/InquiryAdmin';
import SanctionsManagement from './pages/userSanctions/SanctionsManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='merge' element={<AuthCheck component={<Merge />} require="NoAdmin" />} />
          <Route path='usedProduct' element={<UsedProduct />} />
          <Route path='usedProduct/:productCode' element={<UsedProductDetail />} />
          <Route path='addProduct' element={<AuthCheck component={<AddProduct />} require="User" />} />
          <Route path='productEdit/:productCode' element={<AuthCheck component={<ProductEdit />} require="User" /> } />

          <Route path='/' element={<AuthCheck component={<SubHeaderLayout />} require="Login" />}>
            <Route path='myproductlist' element={<AuthCheck component={<MyProductList />} require="User" />} />
            <Route path='wishList' element={<AuthCheck component={<WishList />} require="User" />} />
            <Route path='myInfo' index element={<AuthCheck component={<MyInfo/>} require="User" />}></Route>
            <Route path='myCalendar' element={<AuthCheck component={<MyCalendar/>} require="User" />}/>
            <Route path='editMyInfo' element={<AuthCheck component={<EditMyInfo/>} require="User" />}/>
            <Route path='inquiry' element={<InquiryList/>}/>
            <Route path='inquiryDetail/:inqCode' element={<InquiryDetail/>}/>
            <Route path='inquiryDetail' element={<InquiryDetailForm/>}/>
          </Route>

          <Route path='inquiryAdmin/:inqCode' element={<InquiryAdmin/>} />
          <Route path='/' element={<AuthCheck component={<Message />} require="User" />}>
           <Route path='messageList' element={<MessageList />} />
          </Route>
          <Route path='messageDetail/:msgCode' element={<AuthCheck component={<MessageDetail/>} require="User" />}/>

          <Route path='/report' element={<AuthCheck component={<Report />} require="Admin" />} />
          <Route path='/processManagement' element={<AuthCheck component={<ReportManagement />} require="Admin" />} />
          <Route path='/sanctions' element={<AuthCheck component={<SanctionsManagement />} require="Admin" />} />
          
          <Route path='login' element={<Login />} />
          <Route path='join' element={<Join />} />
          <Route path='searchPwd' element={<FindPwd />} />
          <Route path='searchId' element={<FindId />} />
          <Route path='error' element={<Error />} />
          <Route path='changePwd' element={<ChangePwd />} />
        </Route>
      </Routes >
    </BrowserRouter >
  );
}

export default App;
