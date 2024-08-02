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
                    <Link to='/tutorial/c'>
                        <Button variant="contained" color="secondary" sx={{ bgcolor: '#121212', ":hover": { bgcolor: 'white', color: 'black' }, width: '100%', maxWidth: '200px' }}>Preview</Button>
                    </Link>
                    <Link to='/tutorial/c/setup'>
                        <Button variant="contained" color="primary" className="mr-2" sx={{ bgcolor: '#121212', ":hover": { bgcolor: 'white', color: 'black' }, width: '100%', maxWidth: '200px' }}>Next</Button>
                    </Link>
                </div>

                <main className="m-5 text-white">
                    <h1 className="text-3xl font-bold">Introduction to C Programming</h1>
                    <p className='mt-5 mb-10 leading-7'>Welcome to our C Programming tutorial! Whether you’re a beginner taking your first steps into the world of programming or an experienced developer looking to brush up on your skills, this guide is here to help you master C.</p>
                    <h1 className="text-2xl font-bold">What is C?</h1>

                    <ul className='mt-5 mb-10 leading-7 list-disc ml-5'>
                        <li>C is a powerful, high-performance programming language.</li>
                        <li>It has been the foundation for many modern languages and software systems.</li>
                        <li>Developed in the early 1970s by Dennis Ritchie at Bell Labs.</li>
                        <li>Has become one of the most widely used languages in the world.</li>
                        <li>Its efficiency and close-to-hardware capabilities make it ideal for:
                            <ul className='list-disc ml-5'>
                                <li>System-level programming</li>
                                <li>Embedded systems</li>
                                <li>Software development</li>
                            </ul>
                        </li>
                    </ul>

                    <h1 className="text-2xl font-bold">Key Features of C</h1>
                    <ul className="mt-5 mb-10 leading-7 list-disc ml-5">
                        <li className="">
                            <span className="font-semibold">Simplicity</span> : C provides a small set of keywords and constructs, which makes it relatively straightforward to learn.
                        </li>
                        <li className="">
                            <span className="">Procedural Language</span> : C follows a set of steps or procedures to perform a task, emphasizing a sequential execution of instructions.
                        </li>
                        <li className="">
                            <span className="font-semibold">Low-Level Access</span> : C allows direct manipulation of hardware and memory, offering a close-to-the-metal programming experience.
                        </li>
                        <li className="">
                            <span className="font-semibold">Modularity</span> : C supports modularity through functions, facilitating code reuse and organization.
                        </li>
                    </ul>   

                    <h1 className="text-2xl font-bold">Basic Structure</h1>

                    <div className='mt-5 mb-10'>
                        <CodeBlock code='#include <stdio.h>     // Preprocessor directive to include the standard I/O library

int main() {          // Main function: the entry point of the program
    printf("Hello, World!\n");   // Print "Hello, World!" to the console
    return 0;         // Return 0 to indicate successful execution
}'
                            language='c' />
                    </div>
                </main>


                <div className="flex justify-between m-5">
                    <Link to='/tutorial/c'>
                        <Button variant="contained" color="secondary" sx={{ bgcolor: '#121212', ":hover": { bgcolor: 'white', color: 'black' }, width: '100%', maxWidth: '200px' }}>Preview</Button>
                    </Link>
                    <Link to='/tutorial/c/setup'>
                        <Button variant="contained" color="primary" className="mr-2" sx={{ bgcolor: '#121212', ":hover": { bgcolor: 'white', color: 'black' }, width: '100%', maxWidth: '200px' }}>Next</Button>
                    </Link>
                </div>

            </div>
        </>
    );
}

export default Introduction;
