import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from "./Login"
import { UserContext } from './UserContext';
import AdminHome from './Admin/AdminHome';
import FacultyHome from "./Faculty/FacultyHome"
import StudentHome from './Student/StudentHome';
import FacultyRegisterForm from './Admin/FacultyRegisterForm';
const UserRoutes = () => {
  const { userType, id } = useContext(UserContext);
  // if (userType === 'admin') {
  //   return <AdminHome />;
  // } else if (userType === 'student') {
  //   return <StudentHome />;
  // } else if(userType === 'faculty'){
  //   return <FacultyHome />;
  // }else{
  //   console.log('No User Type Found');
  // }
  return (
    <Router>
      <Routes>
        {userType === 'admin' && <Route path="/" element={<AdminHome />} />}
        {userType === 'student' && <Route path="/" element={<StudentHome />} />}
        {userType === 'faculty' && <Route path="/" element={<FacultyHome />} />}
        {/* {userType && <Navigate to="/" />}  */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin/faculty" element={<FacultyRegisterForm />} />
      </Routes>
    </Router>
  )
}
export default UserRoutes;