import React from 'react';

interface PortableTextProps {
  value: any;
}

const PortableTextFallback: React.FC<PortableTextProps> = ({ value }) => {
  if (!value) return null;

  // Simple fallback for PortableText - just render as plain text
  const renderText = (blocks: any[]) => {
    return blocks.map((block, index) => {
      if (block._type === 'block') {
        const text = block.children?.map((child: any) => child.text).join('') || '';
        const Tag = block.style === 'h1' ? 'h1' : 
                    block.style === 'h2' ? 'h2' : 
                    block.style === 'h3' ? 'h3' : 
                    block.style === 'h4' ? 'h4' : 
                    block.style === 'h5' ? 'h5' : 
                    block.style === 'h6' ? 'h6' : 'p';
        
        return (
          <Tag key={index} className="mb-4">
            {text}
          </Tag>
        );
      }
      return null;
    });
  };

  return <div>{renderText(Array.isArray(value) ? value : [value])}</div>;
};

export default PortableTextFallback;
