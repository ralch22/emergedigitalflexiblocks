import React, { useState } from 'react';
import { Button, Container } from 'theme-ui'

const CustomTabSwitcher = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <Container>
      <div style={{ marginBottom: '20px', marginTop: "20px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {tabs.map((tab, index) => (

            <Button
            variant={`${activeTab === index ? 'secondary' : 'primary'}`}
            sx={{ marginRight: "10px" }}
            onClick={() => handleTabClick(index)}
            >
            {tab.title}
            </Button>
          
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </Container>
  );
};

export default CustomTabSwitcher;
