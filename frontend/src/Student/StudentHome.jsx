import { useState } from "react";
import ActiveCourses from "./ActiveCourses";
import ActiveFaculties from "./ActiveFaculties"
import StudentNavbar from "./StudentNavbar";

export default function StudentHome() {
  const [activeTab, setActiveTab] = useState('courses');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="min-h-full">
        <StudentNavbar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Student Dashboard</h1>
          </div>
          <hr/>
          <div className="px-4 py-6 sm:px-6 lg:px-8 flex">
            <div
              className={`w-1/2 cursor-pointer flex items-center justify-center ${activeTab === 'courses' ? 'font-bold' : 'font-normal'
                }`}
              onClick={() => handleTabChange('courses')}
            >
              Courses
            </div>
            <div
              className={`w-1/2 cursor-pointer flex items-center justify-center ${activeTab === 'faculties' ? 'font-bold' : 'font-normal'
                }`}
              onClick={() => handleTabChange('faculties')}
            >
              Faculties
            </div>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {activeTab === 'courses' ? <ActiveCourses /> : <ActiveFaculties />}
          </div>
        </main>
      </div>
    </>
  )
}
