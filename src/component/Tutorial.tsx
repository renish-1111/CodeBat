import Navbar from './core/Navbar'
import Cards from './core/Cards'

// Combine data into a single array of objects
const tutorials = [
  { title: 'C programing', img: 'assets/c.jpeg', desc: 'best lag', link: '/tutorial/c' },
  { title: 'Java', img: 'assets/as.java.png', desc: 'good', link: '/tutorial/java' },
];

const Tutorial = () => {
  return (
    <div>
      <Navbar />

      <div className='container mt-20'>
        <div className="flex flex-row flex-wrap gap-4 justify-evenly">
          {tutorials.map((tutorial, index) => (
            <Cards key={index} {...tutorial} /> // Spread the object properties
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tutorial
