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
function Navbar() {
    return (
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-white font-semibold">Logo</span>
            </div>
            <div className="flex">
              <div className="flex items-center">
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                <button 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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
  
  export default Navbar;
  