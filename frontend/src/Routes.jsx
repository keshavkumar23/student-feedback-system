import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './Register';
import Login from "./Login"
import { UserContext } from './UserContext';
import AdminHome from './Admin/AdminHome';
import FacultyHome from "./Faculty/FacultyHome"
import StudentHome from './Student/StudentHome';
import FacultyDetails from './Admin/FacultyDetails'; 
import StudentDetails from './Admin/StudentDetails';
import CourseForm from "./Faculty/CourseForm"; 
import FacultyProfile from './Admin/FacultyProfile';
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
        <Route path="/admin/faculty-details" element={<FacultyDetails />} />
        <Route path="/admin/student-details" element={<StudentDetails />} />
        <Route path="/faculty/course-form" element={<CourseForm />} />
        <Route path="/admin/faculty-details/faculty/profile" element={<FacultyProfile/>} />
      </Routes>
    </Router>
  )
}
export default UserRoutes;