import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { UserContext } from "./UserContext";

function Register() {
    const [semester, setSemester] = useState(1);
    const [userData, setUserData] = useState({
        userType: "admin",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
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
        const url = "/api/" + userData.userType + "/register";
        ev.preventDefault();
        const requestData = userData.userType === "admin" ? userData : { ...userData, semester };
        const { data } = await axios.post(url, requestData, { withCredentials: true });
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
                        className="block w-full rounded-sm p-2 mb-2"
                    >
                        <option value="admin">Admin</option>
                        <option value="student">Student</option>
                    </select>
                    <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} placeholder="First Name" className="block w-full rounded-sm p-2 mb-2" />
                    <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} placeholder="Last Name" className="block w-full rounded-sm p-2 mb-2" />
                    {
                        userData.userType === "student" &&
                        <input
                            type="number"
                            name="semester"
                            value={semester}
                            onChange={(ev) => setSemester(ev.target.value)}
                            placeholder="Semester"
                            className="block w-full rounded-sm p-2 mb-2"
                            min={1}
                            max={8}
                        />

                    }
                    <input type="email" name="email" value={userData.email} onChange={handleInputChange} placeholder="Email" className="block w-full rounded-sm p-2 mb-2" />
                    <input type="password" name="password" value={userData.password} onChange={handleInputChange} placeholder="Password" className="block w-full rounded-sm p-2 mb-2" />
                    <button className="bg-[#8883d8] hover:bg-blue-600 font-bold py-2 px-2 border-blue-700 text-white block w-full rounded-sm">
                        Register
                    </button>
                    <div className="flex justify-center items-center mt-4 gap-2">
                        <p className="mr-1">Already registered ?</p>
                        <Link to="/" className="text-[#8883d8] hover:underline block text-center">
                            Login.
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default Register;
