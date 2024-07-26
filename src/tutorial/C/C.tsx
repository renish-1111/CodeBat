import Navbar from '../../component/core/Navbar'
import Sidebar from '../../component/core/Sidebar'
import CSidebar from '../../../config/CSidebar'



const C = () => {
    return (
        <div>
            <div>
                <Navbar component={<Sidebar sideOption={CSidebar} />} />
            </div>
            <main className='mt-20 text-white'>
               

            </main>
        </div>
    )
}

export default C
