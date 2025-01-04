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

    const parseBoldText = (line: string): React.ReactNode[] => {
      const parts = line.split(/(\*\*.*?\*\*)/);
      return parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={`bold-${index}`}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      );
    };

    content.trim().split('\n').forEach((line, index) => {
      if (line.startsWith('# ')) {
        if (listStack[currentListLevel].length) {
          elements.push(
            <ul key={`list-${index}`} className={`list-disc pl-${6 + currentListLevel * 4} mb-10 mx-6`}>
              {listStack[currentListLevel]}
            </ul>
          );
          listStack[currentListLevel] = [];
        }
        elements.push(
          <h1 key={index} className="text-2xl md:text-4xl font-bold space-y-4 my-6 md:my-12">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        if (listStack[currentListLevel].length) {
          elements.push(
            <ul key={`list-${index}`} className={`list-disc pl-${6 + currentListLevel * 4} mx-6 my-10`}>
              {listStack[currentListLevel]}
            </ul>
          );
          listStack[currentListLevel] = [];
        }
        elements.push(
          <h2 key={index} className="font-semibold text-xl md:text-3xl my-6 md:my-12">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        if (listStack[currentListLevel].length) {
          elements.push(
            <ul key={`list-${index}`} className={`list-disc pl-${6 + currentListLevel * 4} mx-6 my-10`}>
              {listStack[currentListLevel]}
            </ul>
          );
          listStack[currentListLevel] = [];
        }
        elements.push(
          <h3 key={index} className="font-medium text-lg md:text-2xl my-4 md:my-8">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        const itemLevel = (line.match(/^(- )+/g)?.[0].split('- ').length ?? 1) - 1;
        if (itemLevel > currentListLevel) {
          currentListLevel = itemLevel;
          if (!listStack[currentListLevel]) listStack[currentListLevel] = [];
        } else if (itemLevel < currentListLevel) {
          while (currentListLevel > itemLevel) {
            elements.push(
              <ul key={`list-close-${index}`} className={`list-disc pl-${6 + currentListLevel * 4} md:my-10 my-5`}>
                {listStack[currentListLevel]}
              </ul>
            );
            listStack[currentListLevel] = [];
            currentListLevel--;
          }
        }
        listStack[currentListLevel].push(
          <li key={`li-${index}`} className="text-lg md:text-xl leading-relaxed my-1">
            {parseBoldText(line.replace(/^-+ /, ''))}
          </li>
        );
      } else if (line.startsWith('```')) {
        if (listStack[currentListLevel].length) {
          elements.push(
            <ul key={`list-${index}`} className={`list-disc pl-${6 + currentListLevel * 4} mb-10 mx-6`}>
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
            <div className="my-6 md:my-12" key={index}>
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
            <ul key={`list-${index}`} className={`list-disc pl-${6 + currentListLevel * 4} mb-10 mx-6`}>
              {listStack[currentListLevel]}
            </ul>
          );
          listStack[currentListLevel] = [];
        }
        elements.push(
          <p key={index} className="text-base md:text-xl my-5">
            {parseBoldText(line)}
          </p>
        );
      }
    });

    while (currentListLevel >= 0 && listStack[currentListLevel]?.length) {
      elements.push(
        <ul key={`list-close-final-${currentListLevel}`} className={`list-disc pl-${6 + currentListLevel * 4} mb-10 mx-6`}>
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
