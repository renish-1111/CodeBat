import React from 'react';
import CSidebar from '../../../config/CSidebar';
import Sidebar from '../../component/core/Sidebar';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from '../../component/core/Navbar';
import CodeBlock from '../../component/core/CodeBlock';

const Setup: React.FC = () => {
    return (
        <>
            <Navbar component={<Sidebar sideOption={CSidebar} />} />
            <div className="md:m-5 mt-20 md:mt-24">
                <div className="flex justify-between m-5">
                    <Link to='/tutorial/c/introduction'>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            sx={{ bgcolor: '#121212', ":hover": { bgcolor: 'white', color: 'black' }, width: '100%', maxWidth: '200px' }}
                        >
                            Preview
                        </Button>
                    </Link>
                    <Link to='/tutorial/c'>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ bgcolor: '#121212', ":hover": { bgcolor: 'white', color: 'black' }, width: '100%', maxWidth: '200px' }} 
                            className="ml-2"
                        >
                            Next
                        </Button>
                    </Link>
                </div>

                <main className="m-5 text-white">
                    <h1 className="text-3xl font-bold">Setup the Environment</h1>
                    <p className='mt-5 mb-10 leading-7'>
                        To set up an environment for C programming, you'll need to follow these steps based on your operating system. Here’s a general guide for different platforms:
                    </p>

                    <h2 className="text-2xl font-bold">Windows</h2>
                    <ol className='mt-5 mb-10 leading-7 list-decimal ml-5'>
                        <li>
                            <strong>Install a Compiler</strong>
                            <ul className='list-disc ml-5'>
                                <li>
                                    <strong>MinGW:</strong> A popular GCC compiler for Windows.
                                    <ul className='list-disc ml-5'>
                                        <li>Download and install MinGW from the <a className='text-lime-500 underline' target='blank' href="http://www.mingw.org/" >MinGW website</a>.</li>
                                        <li>During installation, ensure you select the <code>gcc</code> component.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>MSVC:</strong> Microsoft Visual C++ compiler.
                                    <ul className='list-disc ml-5'>
                                        <li>Install Visual Studio Community Edition from the <a className='text-lime-500 underline' target='blank' href="https://visualstudio.microsoft.com/">Visual Studio website</a>. Select the “Desktop development with C++” workload during installation.</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>Set Up Your Development Environment</strong>
                            <ul className='list-disc ml-5'>
                                <li><strong>IDE:</strong> You can use an IDE like Code::Blocks, CLion, or Visual Studio.</li>
                                <li><strong>Text Editor:</strong> Alternatively, you can use text editors like Notepad++, VSCode, or Sublime Text.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Configure the PATH Variable (for MinGW)</strong>
                            <ul className='list-disc ml-5'>
                                <li>Add the path to the <code>bin</code> directory of MinGW (e.g., <code>C:\MinGW\bin</code>) to your system PATH variable so that you can run <code>gcc</code> from the command line.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Verify Installation</strong>
                            <ul className='list-disc ml-5'>
                                <li>Open Command Prompt and run <code>gcc --version</code> to check if the compiler is installed correctly.</li>
                            </ul>
                        </li>
                    </ol>

                    <h2 className="text-2xl font-bold">macOS</h2>
                    <ol className='mt-5 mb-10 leading-7 list-decimal ml-5'>
                        <li>
                            <strong>Install Xcode Command Line Tools</strong>
                            <ul className='list-disc ml-5'>
                                <li>Open Terminal and run the command: <code>xcode-select --install</code></li>
                                <li>This will install the necessary tools, including the Clang compiler.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Set Up Your Development Environment</strong>
                            <ul className='list-disc ml-5'>
                                <li><strong>IDE:</strong> Xcode (available on the App Store) or other editors like VSCode, Sublime Text.</li>
                                <li><strong>Text Editor:</strong> VSCode, Sublime Text, or any text editor of your choice.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Verify Installation</strong>
                            <ul className='list-disc ml-5'>
                                <li>Open Terminal and run <code>clang --version</code> to ensure the compiler is installed.</li>
                            </ul>
                        </li>
                    </ol>

                    <h2 className="text-2xl font-bold">Linux</h2>
                    <ol className='mt-5 mb-10 leading-7 list-decimal ml-5'>
                        <li>
                            <strong>Install a Compiler</strong>
                            <ul className='list-disc ml-5'>
                                <li>Most Linux distributions come with GCC pre-installed. If not, you can install it using your package manager.</li>
                                <li>For Debian-based systems (e.g., Ubuntu): <code>sudo apt update && sudo apt install build-essential</code></li>
                                <li>For Red Hat-based systems (e.g., Fedora): <code>sudo dnf groupinstall 'Development Tools'</code></li>
                            </ul>
                        </li>
                        <li>
                            <strong>Set Up Your Development Environment</strong>
                            <ul className='list-disc ml-5'>
                                <li><strong>IDE:</strong> Options include Code::Blocks, CLion, or GNOME Builder.</li>
                                <li><strong>Text Editor:</strong> VSCode, Sublime Text, or any other text editor.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Verify Installation</strong>
                            <ul className='list-disc ml-5'>
                                <li>Open Terminal and run <code>gcc --version</code> to ensure that GCC is properly installed.</li>
                            </ul>
                        </li>
                    </ol>

                    <h2 className="text-2xl font-bold">General Tips</h2>
                    <ul className='mt-5 mb-10 leading-7 list-disc ml-5'>
                        <li><strong>Version Control:</strong> Consider using Git for version control. Install Git from <a className='text-lime-500 underline' target='blank' href="https://git-scm.com/">Git’s website</a>.</li>
                        <li><strong>Build Systems:</strong> Learn to use build systems like <code>make</code> or <code>CMake</code> to manage your projects.</li>
                    </ul>

                    <h2 className="text-2xl font-bold">Example of a Simple C Program</h2>
                    <p className='mt-5 leading-7'>
                        Here’s a simple “Hello, World!” program to test your setup:
                    </p>
                    <div className='mt-5 mb-10'>
                        <CodeBlock 
                            code={`#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`} 
                            language='c' 
                        />
                    </div>

                    <ol className='mt-5 mb-10 leading-7 list-decimal ml-5'>
                        <li><strong>Save this code in a file named</strong> <code>hello.c</code>.</li>
                        <li><strong>Compile the program using a terminal or command prompt:</strong>
                            <ul className='list-disc ml-5'>
                                <li><strong>On Windows (using MinGW):</strong> <code>gcc hello.c -o hello.exe</code></li>
                                <li><strong>On macOS/Linux: </strong> <code>gcc hello.c -o hello</code></li>
                            </ul>
                        </li>
                        <li><strong>Run the executable:</strong>
                            <ul className='list-disc ml-5'>
                                <li><strong>On Windows:</strong> <code>hello.exe</code></li>
                                <li><strong>On macOS/Linux:</strong> <code>./hello</code></li>
                            </ul>
                        </li>
                    </ol>
                </main>

                <div className="flex justify-between m-5">
                    <Link to='/tutorial/c/introduction'>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            sx={{ bgcolor: '#121212', ":hover": { bgcolor: 'white', color: 'black' }, width: '100%', maxWidth: '200px' }}
                        >
                            Preview
                        </Button>
                    </Link>
                    <Link to='/tutorial/c'>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ bgcolor: '#121212', ":hover": { bgcolor: 'white', color: 'black' }, width: '100%', maxWidth: '200px' }} 
                            className="ml-2"
                        >
                            Next
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Setup;
