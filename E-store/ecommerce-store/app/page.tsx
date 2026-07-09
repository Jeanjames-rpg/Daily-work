
import FeaturedProducts from "./components/products/FeaturedProducts";
import Hero from "./components/ui/Hero";




export default function Home(){
  return (
    
    <section>

      <h2 className="text-4xl font-bold">
        Welcome to E-store
      </h2>

      <p className="mt-4 text-lg text-gray-600">
        Your one-stop shop for everything.
      </p>
    
      <Hero/>

      <FeaturedProducts/>

    </section>
   
  )
}