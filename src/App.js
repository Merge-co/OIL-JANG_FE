import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Main from './pages/product/Main';
import Merge from './pages/product/Merge';
import AdminHeader from './components/common/AdminHeader';
import ReportManagement from './pages/report/ReportManagement';
import Report from './pages/report/Report';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />}>

          <Route index element={<Main />} />
          <Route path='merge' element={<Merge />} />
          <Route path='admin' element={<AdminHeader />} />
          <Route path='reportManagement' element={<ReportManagement />} />
          <Route path='report' element={<Report/>}/>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
