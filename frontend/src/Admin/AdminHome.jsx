import AdminNavbar from "./AdminNavbar";

export default function AdminHome() {
  return (
    <>
      <div className="min-h-full">
        <AdminNavbar/>
        <header className="bg-white shadow">
          <div className="py-6 sm:px-6 flex gap-5 align-center justify-center">
            <img src="img_33.png" alt="" height={50} width={50} className="rounded-full"/>
            <div className="text-4xl font-bold tracking-tight text-gray-900 pt-1">Admin Dashboard</div>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
      </div>
    </>
  )
}
