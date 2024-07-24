import Navbar from './core/Navbar'
import Cards from './core/Card/Cards'
import tutorialCardDetail from '../../config/tutorialCardDetail'

const Tutorial = () => {
  return (
    <div>
      <Navbar />
      <main className="flex mt-16 md:mt-20 items-center justify-center">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-10 justify-center">
          {tutorialCardDetail.map((tutorial, index) => (
            <div className="py-16 md:py-13" key={index}>
              <Cards {...tutorial} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Tutorial
