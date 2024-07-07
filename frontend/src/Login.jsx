import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { UserContext } from "./UserContext";

function Login() {
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
        <div className="flex h-screen overflow-hidden">
            <motion.div className="w-1/2" animate={{ x: 0 }} initial={{ x: '-100vw' }} transition={{ duration: 2, type: 'tween' }}>
                <motion.img animate={{ y: [0, -10, 0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} src="/login.png" alt="Background" className="object-cover w-full h-full" />
            </motion.div>
            <motion.div className="w-1/2 flex items-center justify-center align-center" animate={{ x: 0 }} initial={{ x: '100vw' }} transition={{ duration: 2, type: 'tween' }}>
                <form className="w-[60%] flex flex-col gap-5" onSubmit={handleSubmit}>
                    <select
                        name="userType"
                        value={userData.userType}
                        onChange={handleInputChange}
                        className="block w-full rounded-sm p-3 mb-3 text-lg"
                    >
                        <option value="admin">Admin</option>
                        <option value="faculty">Faculty</option>
                        <option value="student">Student</option>
                    </select>
                    <input type="email" name="email" value={userData.email} onChange={handleInputChange} placeholder="Email" className="block w-full rounded-sm p-3 mb-3 text-lg" />
                    <input type="password" name="password" value={userData.password} onChange={handleInputChange} placeholder="Password" className="block w-full rounded-sm p-3 mb-3 text-lg" />
                    <button className="bg-[#8883d8] hover:bg-blue-600 font-bold py-3 px-3 border-blue-700 text-white block w-full rounded-sm">
                        Login
                    </button>
                    <div className="flex justify-center items-center mt-6 gap-2">
                        <p className="mr-2 text-lg">Not registered?</p>
                        <Link to="/register" className="text-[#8883d8] hover:underline block text-lg">
                            Register.
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default Login;
