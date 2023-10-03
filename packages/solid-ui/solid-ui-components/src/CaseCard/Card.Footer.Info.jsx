import React from 'react';
import { Text } from 'theme-ui';
import TextList from '@solid-ui-components/TextList';
import { FaRegClock } from 'react-icons/fa';
import rv from '@solid-ui-components/utils/buildResponsiveVariant';

import { format } from 'date-fns';

const CardFooterInfo = ({ variant, date, timeToRead }) => (
  <TextList nowrap>
    {date && (
      <Text sx={{ variant: rv(variant, 'date') }}>
        {format(new Date(date), 'MMMM dd, yyyy')}
      </Text>
    )}
    {timeToRead && (
      <Text sx={{ variant: rv(variant, 'timeToRead') }}>
        <FaRegClock css={{ verticalAlign: `middle` }} /> {timeToRead} min
      </Text>
    )}
  </TextList>
);

export default CardFooterInfo;
