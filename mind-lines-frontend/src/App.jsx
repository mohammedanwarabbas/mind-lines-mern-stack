import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import "./assets/styles/global.css"
import {ToastContainer} from 'react-toastify'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Home from './pages/home/Home'
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Unauthorized from "./pages/common/Unauthorized"
import NotFound from "./pages/common/NotFound"
import WriterDashboard from "./pages/writer/Dashboard"
import AdminDashboard from "./pages/admin/Dashboard"
import MyQuotes from './pages/writer/MyQuotes'
import WriteQuote from './pages/writer/WriteQuote'
import AllQuotes from './pages/admin/AllQuotes'
import WritersList from './pages/admin/WritersList'
import UpdateProfile from './pages/auth/UpdateProfile'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {

  return (
    <>
    <Router>
      <Navbar />
    <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Writer-Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['writer']} />}>
            <Route path="/writer/dashboard" element={<WriterDashboard />} />
            <Route path="/writer/my-quotes" element={<MyQuotes />} />
            <Route path="/writer/write-quote" element={<WriteQuote />} />
          </Route>

          {/* Admin-Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/all-quotes-list" element={<AllQuotes />} />
            <Route path="/admin/all-writers-list" element={<WritersList />} />
          </Route>

          {/* Writer and Admin protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin','writer']} />}>
          <Route path="/auth/profile" element={<UpdateProfile />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>

    <ToastContainer position="top-right" autoClose={3000} />
    <Footer/>
    </Router>
    </>
  )
}

export default App
