import Navbar from '../../component/core/Navbar';
import Sidebar from '../../component/core/Sidebar';
import CSidebar from '../../../config/CSidebar';
import Animation from '../../component/Animation';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const C = () => {
    return (
        <div className='bg-main-bg'>
            <Navbar component={<Sidebar sideOption={CSidebar} />} />
            <div className=' text-white flex flex-col items-center justify-center h-screen'>
                <div className='px-2 kranky-regular text-center mx-5 text-2xl font-bold tracking-widest leading-tight md:text-4xl md:leading-tight'>
                    <Animation sequence={["Welcome to C language Programming Tutorial", 100]} />
                </div>
                <div className='text-center p-1 rounded-md bg-white hover:bg-black font-serif mt-8'>
                    <Link to="/tutorial/c/introduction" className='font-semibold mx-auto'>
                        <Button variant="contained" color="info" sx={{ bgcolor: 'black', fontSize: 20, ":hover": { bgcolor: 'white', fontSize: 20, color: 'black' }, width: '100%', maxWidth: '200px' }}>
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default C;
