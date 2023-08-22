import ContentText from "@solid-ui-components/ContentText/ContentText";
import React, { useEffect } from "react";

const CalendlyWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    
      <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/emerge-digital-rami/free-digital-discovery-emerge-digital?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0e0b0b&text_color=ffffff&primary_color=ed185c"
      style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyCenter: "center", backgroundColor: "#0e0b0b", minWidth: "320px", height: "700px" }}
    >
      
    </div>
  );
};


export default CalendlyWidget;
