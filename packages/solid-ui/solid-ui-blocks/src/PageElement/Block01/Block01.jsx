import React from 'react';

// Recursive function to create React elements from parsed JSON
const createElementFromJson = (jsonNode, index) => {
  if (jsonNode.type === 'text') {
    return jsonNode.text;
  }

  const children = jsonNode.children
    ? jsonNode.children.map((childNode, childIndex) =>
        createElementFromJson(childNode, childIndex),
      )
    : null;

  return React.createElement(
    jsonNode.type,
    { key: index, className: 'custom-class' },
    children,
  );
};

const ParsedHtmlComponent = ({ parsedJson }) => {
  const elements = parsedJson.children.map((childNode, index) =>
    createElementFromJson(childNode, index),
  );

  return <div className="parsed-html">{elements}</div>;
};

export default ParsedHtmlComponent;
