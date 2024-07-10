import Navbar from './core/Navbar'
import Cards from './core/Cards'


const title = ['C programing', 'Java'];
const img = ['./src/assets/c.jpeg', './src/assets/as.java.png'];
const desc = ['best lag', 'good'];
const link = ['/tutorial/c', '/tutorial/java'];

const Tutorial = () => {

    return (
        <div>
            <Navbar />

            <div className='container mt-20'>

                <div className="flex flex-row flex-wrap gap-4 justify-evenly">

                    {title.map((title, index) => (
                
                    <Cards title={title} img={img[index]} desc={desc[index]} link={link[index]} />
              ))}
                </div>
            </div>
        </div>
    )
}

export default Tutorial
