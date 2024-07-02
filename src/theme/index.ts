// src/theme/index.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'body',
        color: 'gray.800',
        bg: 'white',
        lineHeight: 'base'
      }
    }
  }
});

export default theme;
