import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import BuildingToward from '../components/BuildingToward'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <BuildingToward />
      <Contact />
    </main>
  )
}
