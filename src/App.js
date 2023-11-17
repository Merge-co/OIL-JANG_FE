import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Main from './pages/product/Main';
import Merge from './pages/product/Merge';
import AdminHeader from './components/common/AdminHeader';
import Report from './pages/report/Report';
import Login from './pages/user/Login';
import Test from './pages/user/Test';
import ReportManagement from './pages/report/ReportManagement';
import ProcessDetail from './pages/report/ProcessDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />}>

          <Route index element={<Main />} />
          <Route path='merge' element={<Merge />} />
          <Route path='admin' element={<AdminHeader />} />
          <Route path='/report' element={<Report />} />
          <Route path='/reportSelect' element={<ReportManagement />} />
          <Route path='/processDetail/:reportNo' element={<ProcessDetail />}/>
      <Route path='login' element={<Login />} />
      <Route path='test' element={<Test />} />

    </Route>

      </Routes >
    </BrowserRouter >
  );
}

export default App;
