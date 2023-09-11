import ContentText from "@solid-ui-components/ContentText/ContentText";
import React from "react";
import Calendly from "./ThreeCX"

const CalendarComponent = ({ content: { collection } }) => {



  return (
    
      <div style={{ textAlign: "center" }}>
        {collection?.map(({ text, variant, color }, index) => (
            <ContentText
            content={text}
            variant={variant}
            color={color}
            key={index}
            />
        ))}
      <Calendly />
    </div>
  );
};

export default CalendarComponent