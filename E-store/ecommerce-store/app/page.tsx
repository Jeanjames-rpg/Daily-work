import Navbar from "./components/layout/Navbar";




export default function Home(){
  return (
    <>
    
    <Navbar/>
    <main className="max-w-7xl mx-auto p-6">

      <h2 className="text-4xl font-bold">
        Welcome to E-store
      </h2>
      
      <p className="mt-4 text-gray-600">
        Your one-stop shop for everything.
      </p>
    </main>

    </>
  )
}