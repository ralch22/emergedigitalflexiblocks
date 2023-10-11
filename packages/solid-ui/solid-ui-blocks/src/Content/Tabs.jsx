import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const CustomTabSwitcher = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = index => {
    setActiveTab(index);
  };

  return (
    <div style={{ marginBottom: '20px', marginTop: '20px', width: '100%' }}>
      <Tabs>
        <TabList>
          <Tab>{tabs[0].title}</Tab>
          <Tab>{tabs[1].title}</Tab>
        </TabList>

        <TabPanel>{tabs[0].content}</TabPanel>
        <TabPanel>{tabs[1].content}</TabPanel>
      </Tabs>
    </div>
  );
};

export default CustomTabSwitcher;
