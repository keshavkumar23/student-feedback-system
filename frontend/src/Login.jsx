import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Register() {
    const [userData, setUserData] = useState({
        userType: "admin",
        email: "",
        password: "",
    });
    const { setUserType: setLoggedInUserType, setId } = useContext(UserContext);

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSubmit(ev) {
        const url = userData === 'faculty' ? "/api/faculty/login" : "/api/" + userData.userType + "/login";
        ev.preventDefault();
        const { data } = await axios.post(url, userData, { withCredentials: true });
        setLoggedInUserType(userData.userType);
        setId(data.id);
    }

    return (
        <div className="bg-green-50 h-screen flex items-center">
            <form className="w-64 mx-auto" onSubmit={handleSubmit}>
                <select
                    name="userType"
                    value={userData.userType}
                    onChange={handleInputChange}
                    className="block w-full rounded-sm p-2 mb-2"
                >
                    <option value="admin">Admin</option>
                    <option value="faculty">Faculty</option>
                    <option value="student">Student</option>
                </select>
                <input type="email" name="email" value={userData.email} onChange={handleInputChange} placeholder="Email" className="block w-full rounded-sm p-2 mb-2" />
                <input type="password" name="password" value={userData.password} onChange={handleInputChange} placeholder="Password" className="block w-full rounded-sm p-2 mb-2" />
                <button className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-2 border-blue-700 text-white block w-full rounded-sm">
                    Login
                </button>
                <div className="flex justify-center items-center mt-4 gap-2">
                    <p className="mr-1">Not registered ?</p>
                    <Link to="/register" className="text-blue-500 hover:underline block text-center">
                        Register.
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register;
