

import React from 'react'
import { Text } from 'react-native';

const CustomText = ({ children, style, ...props }: { children: React.ReactNode, style?: any }) => (
  <Text
    allowFontScaling={false}
    maxFontSizeMultiplier={1}
    style={[style]}
    {...props}
  >
    {children}
  </Text>
);

export default CustomText