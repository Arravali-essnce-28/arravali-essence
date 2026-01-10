import React from 'react';

const components = {
  types: {
    block: ({ children, value }: any) => {
      const style = value?.style || 'normal';
      
      switch (style) {
        case 'h1':
          return <h1 className="text-4xl font-bold text-gray-900 mb-6">{children}</h1>;
        case 'h2':
          return <h2 className="text-3xl font-bold text-gray-900 mb-4">{children}</h2>;
        case 'h3':
          return <h3 className="text-2xl font-bold text-gray-900 mb-3">{children}</h3>;
        case 'h4':
          return <h4 className="text-xl font-bold text-gray-900 mb-2">{children}</h4>;
        case 'h5':
          return <h5 className="text-lg font-bold text-gray-900 mb-2">{children}</h5>;
        case 'h6':
          return <h6 className="text-base font-bold text-gray-900 mb-2">{children}</h6>;
        default:
          return <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>;
      }
    },
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a 
        href={value?.href} 
        className="text-primary-600 hover:text-primary-700 underline"
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  list: ({ children, type }: any) => {
    if (type === 'bullet') {
      return <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>;
    }
    return <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>;
  },
  listItem: ({ children }: any) => (
    <li className="text-gray-700">{children}</li>
  ),
};

export default components;
