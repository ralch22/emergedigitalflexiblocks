import React, { useEffect } from 'react';

const ClutchWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://widget.clutch.co/static/js/widget.js';
    script.async = true;

    const div = document.createElement('div');
    div.className = 'clutch-widget';
    div.setAttribute('data-nofollow', 'true');
    div.setAttribute('data-url', 'https://widget.clutch.co');
    div.setAttribute('data-widget-type', '2');
    div.setAttribute('data-darkbg', 'true');
    div.setAttribute('data-height', '45');
    div.setAttribute('data-clutchcompany-id', '1978827');

    // Append the script and div elements to the document's head
    document.head.appendChild(script);
    document.body.appendChild(div);

    // Cleanup: Remove the script and div elements when the component unmounts
    return () => {
      document.head.removeChild(script);
      document.body.removeChild(div);
    };
  }, []);

  return <div className="clutch-widget" data-nofollow="true" data-url="https://widget.clutch.co" data-widget-type="2" data-darkbg="true" data-height="45" data-clutchcompany-id="1978827"></div>;
};

export default ClutchWidget;
