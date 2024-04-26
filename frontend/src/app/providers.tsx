'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import theme from '../theme';
import { SaasProvider } from "@saas-ui/react";

import { BackgroundGradient } from '@/components/component/gradients/background-gradient';

const extendedTheme = extendTheme(theme);

export function Providers({ children }: { children: React.ReactNode }) {
  return(
      <ChakraProvider>
    <SaasProvider theme={theme}>

      <BackgroundGradient theme={extendedTheme} />
        {children}
    </SaasProvider>

      </ChakraProvider>
  )
}