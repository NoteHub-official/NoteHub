import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-56px)] bg-[#f8e9dd] p-4">
        <Hero />
      </main>
    </>
  );
}
