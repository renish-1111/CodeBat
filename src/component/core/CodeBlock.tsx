import { CopyBlock , monokai } from 'react-code-blocks';

interface CodeBlockInterface {
    code: string;
    language: string;
}

const isMobileScreen = window.innerWidth < 767;

const CodeBlock = ({ code, language}: CodeBlockInterface) => {
    return (
        <div className='mb-5 w-96 md:w-full'>
            <CopyBlock
                text={code}
                language={language}
                showLineNumbers={!isMobileScreen}
                theme={monokai}
                codeBlock
            />
        </div>
    )
}

export default CodeBlock;