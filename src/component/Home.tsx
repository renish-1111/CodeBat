import Navbar from "./core/Navbar"
import Animation from "./Animation"

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-main-bg bg-fixed h-screen fixed w-full -z-10 bg-center bg-no-repeat bg-cover ">
        <p className="kranky-regular fixed text-center top-[30%] mx-5 text-2xl font-bold tracking-widest leading-tight md:text-4xl md:leading-tight md:mx-40 md:text-start">
          <Animation sequence={
            [
              "Welcome to Codebat !        ",10,
              "Your one-stop destination for coding tutorials        ",10,
              "Discover the latest trends, tips, and insights in the world of coding on our blog        ",10,
              "We are here to help you to learn coding and programming        ",10,
            ]
          }/>
        </p>

      </div>
    </div>
  )
}

export default Home
