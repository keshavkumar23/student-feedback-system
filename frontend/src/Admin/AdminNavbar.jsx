import axios from "axios";
const handleLogOut = () => {
  axios.post('/logout', {}, {
    withCredentials: true 
  })
    .then(response => {
      if (response.status === 200) {
        window.location.href = '/'; 
      } else {
        console.error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Error logging out:', error);
    });
}
function AdminNavbar() {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-semibold text-3xl">SFS</a>
          </div>
          <div className="flex">
            <div className="flex items-center">
              <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium">Home</a>
              <a href="/admin/student-details" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium">Students</a>
              <a href="/admin/faculty-details" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium">Faculties</a>
              <a href="/admin/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium">Profile</a>
              <button
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
