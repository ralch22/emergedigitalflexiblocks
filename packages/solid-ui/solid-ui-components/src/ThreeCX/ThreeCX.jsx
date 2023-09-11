import React from 'react';
import { Script } from 'gatsby'

const ThreeCXLiveChat = () => {
  
  return (
    <>
    <div dangerouslySetInnerHTML={{ __html: `<call-us-selector phonesystem-url="https://thetrusteeofalcheikhtrust.3cx.com.au:5001" party="LiveChat167450"></call-us-selector>` }} />
      <Script defer src="https://downloads-global.3cx.com/downloads/livechatandtalk/v1/callus.js" id="tcx-callus-js" charset="utf-8" />
      
    </>
  )
};

export default ThreeCXLiveChat;
