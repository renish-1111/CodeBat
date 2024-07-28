import Navbar from '../../component/core/Navbar';
import Sidebar from '../../component/core/Sidebar';
import CSidebar from '../../../config/CSidebar';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import CodeBlock from '../../component/core/CodeBlock';

const Introduction = () => {


    return (
        <>
            <Navbar component={<Sidebar sideOption={CSidebar} />} />
            <div className="md:m-5 mt-20 md:mt-24">

                <div className="flex justify-between m-5">
                    <Link to='/tutorial/c/introduction'>
                        <Button variant="contained" color="secondary" sx={{ bgcolor: '#121212', ":hover": { bgcolor: 'white', color: 'black' }, width: '100%', maxWidth: '200px' }}>Preview</Button>
                    </Link>
                    <Link to='/tutorial/c'>
                        <Button variant="contained" color="primary" className="mr-2" sx={{ bgcolor: '#121212', ":hover": { bgcolor: 'white', color: 'black' }, width: '100%', maxWidth: '200px' }}>Next</Button>
                    </Link>
                </div>

                <main className="m-5 text-white">
                    <h1 className="text-4xl font-bold">Introduction to C Programming</h1>
                    <p className='mt-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis illo, natus quas provident odio assumenda a? Eaque, dolorum! Ratione, consectetur? Repudiandae dolores, maiores eaque minus amet nihil, eveniet repellat, sed consequuntur aspernatur non ducimus animi ipsam excepturi. Amet, earum quod.</p>
                </main>
                <div className="mx-1">

                    <CodeBlock
                        code="#include <stdio.h>
int main() {
    printf('Hello, World!');
    return 0;
}"
                        language='c'
                    />
                </div>

            </div>
        </>
    );
}

export default Introduction;
