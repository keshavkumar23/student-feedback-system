import ActiveCourses from "./ActiveCourses";
import StudentNavbar from "./StudentNavbar";

export default function StudentHome() {
  return (
    <>
      <div className="min-h-full">
        <StudentNavbar/>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Student Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <ActiveCourses/>
          </div>
        </main>
      </div>
    </>
  )
}
