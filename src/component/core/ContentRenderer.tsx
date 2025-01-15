import React from 'react';
import CodeBlock from './CodeBlock';

interface ContentRendererProps {
  content: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  const parseContent = (content: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeContent: string[] = [];
    const listStack: React.ReactNode[][] = [[]];
    let currentListLevel = 0;

    // Helper to parse bold text and links
    const parseInlineText = (line: string): React.ReactNode[] => {
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/); // Match bold (**text**) and links [text](url)
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`bold-${index}`}>{part.slice(2, -2)}</strong>;
        } else if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const linkText = part.slice(1, part.indexOf(']'));
          const url = part.slice(part.indexOf('](') + 2, -1);
          return (
            <a
              key={`link-${index}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-500 underline"
            >
              {linkText}
            </a>
          );
        } else {
          return part;
        }
      });
    };

    content.trim().split('\n').forEach((line, index) => {
      if (line.startsWith('# ')) {
        if (listStack[currentListLevel].length) {
          elements.push(
            <ul key={`list-${index}`} style={{ paddingLeft: `${currentListLevel * 20}px` }} className="list-disc mb-10">
              {listStack[currentListLevel]}
            </ul>
          );
          listStack[currentListLevel] = [];
        }
        elements.push(
          <h1 key={index} className="text-2xl md:text-4xl font-bold space-y-4 my-6 md:my-10">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        if (listStack[currentListLevel].length) {
          elements.push(
            <ul key={`list-${index}`} style={{ paddingLeft: `${currentListLevel * 20}px` }} className="list-disc my-10">
              {listStack[currentListLevel]}
            </ul>
          );
          listStack[currentListLevel] = [];
        }
        elements.push(
          <h2 key={index} className="font-semibold text-xl md:text-3xl my-6 md:my-10">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        if (listStack[currentListLevel].length) {
          elements.push(
            <ul key={`list-${index}`} style={{ paddingLeft: `${currentListLevel * 20}px` }} className="list-disc my-10">
              {listStack[currentListLevel]}
            </ul>
          );
          listStack[currentListLevel] = [];
        }
        elements.push(
          <h3 key={index} className="font-medium text-lg md:text-2xl my-3 md:my-6">
            {line.replace('### ', '')}
          </h3>
        );
      } 
      else if (/^-+ /.test(line)) {
        // Determine the nesting level based on the number of leading hyphens
        const match = line.match(/^-+/);
        const itemLevel = match ? match[0].length : 1; // Get number of hyphens as nesting level
      
        // Close higher levels if moving to a shallower level
        while (currentListLevel > itemLevel) {
          elements.push(
            <ul className='md:text-xl list-decimal' key={`close-${currentListLevel}`} style={{ marginLeft: (currentListLevel - 1) * 20 }}>
              {listStack[currentListLevel]}
            </ul>
          );
          listStack[currentListLevel] = [];
          currentListLevel--;
        }
      
        // Open deeper levels if moving to a higher level
        while (currentListLevel < itemLevel) {
          listStack[++currentListLevel] = [];
        }
      
        // Add the current list item to the appropriate level
        listStack[currentListLevel].push(
          <li className=' md:text-xl list-disc' key={`item-${index}`} style={{ margin: '4px 0', marginLeft: '20px' }}>
            {parseInlineText(line.replace(/^-+ /, ''))} {/* Remove leading hyphens and parse the text */}
          </li>
        );
      
      
      // Ensure to render the remaining open lists at the end
      while (currentListLevel > 0) {
        elements.push(
          <ul className='list-disc' key={`final-close-${currentListLevel}`} style={{ marginLeft: (currentListLevel - 1) * 40 }}>
            {listStack[currentListLevel]}
          </ul>
        );
        listStack[currentListLevel] = [];
        currentListLevel--;
      }}
      else if (line.startsWith('```')) {
        if (listStack[currentListLevel].length) {
          elements.push(
            <ul key={`list-${index}`} style={{ paddingLeft: `${currentListLevel * 20}px` }} className="list-disc mb-10">
              {listStack[currentListLevel]}
            </ul>
          );
          listStack[currentListLevel] = [];
        }

        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.replace('```', '').trim();
        } else {
          elements.push(
            <div className="my-3 md:my-12" key={index}>
              <CodeBlock code={codeContent.join('\n')} language={codeLanguage} />
            </div>
          );
          inCodeBlock = false;
          codeContent = [];
          codeLanguage = '';
        }
      } else if (inCodeBlock) {
        codeContent.push(line);
      } else if (line.trim()) {
        if (listStack[currentListLevel].length) {
          elements.push(
            <ul key={`list-${index}`} style={{ paddingLeft: `${currentListLevel * 20}px` }} className="list-disc mb-10">
              {listStack[currentListLevel]}
            </ul>
          );
          listStack[currentListLevel] = [];
        }
        elements.push(
          <p key={index} className="text-base  md:text-xl my-3 md:my-6">
            {parseInlineText(line)}
          </p>
        );
      }
    });

    while (currentListLevel >= 0 && listStack[currentListLevel]?.length) {
      elements.push(
        <ul key={`list-close-final-${currentListLevel}`} style={{ paddingLeft: `${currentListLevel * 20}px` }} className="list-disc mb-10">
          {listStack[currentListLevel]}
        </ul>
      );
      listStack[currentListLevel] = [];
      currentListLevel--;
    }

    return elements;
  };

  return <>{parseContent(content)}</>;
};

export default ContentRenderer;