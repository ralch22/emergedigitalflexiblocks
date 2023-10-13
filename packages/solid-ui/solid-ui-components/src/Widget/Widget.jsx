import React from 'react';
import { Script } from 'gatsby';

const ClutchWidget = () => {
  return (
    <>
      <Script
        type="text/javascript"
        src="https://widget.clutch.co/static/js/widget.js"
      />
      <div
        className="clutch-widget"
        data-nofollow="true"
        data-url="https://widget.clutch.co"
        data-widget-type="2"
        data-darkbg="true"
        data-height="45"
        data-clutchcompany-id="1978827"
      ></div>
    </>
  );
};

export default ClutchWidget;
