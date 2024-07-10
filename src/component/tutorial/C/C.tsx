import Navbar from '../../core/Navbar'
import SecondaryBar from './SecondaryBar'


const C = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='mt-16 md:mt-20'>
                <SecondaryBar />
            </div>
        </div>
    )
}

export default C
