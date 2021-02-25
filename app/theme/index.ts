import {
  //
  extendTheme,
  ThemeConfig,
} from '@chakra-ui/react'

import styles from './styles'

const direction: import('@chakra-ui/react').ThemeDirection = 'ltr'

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'light',
}

export const overrides = {
  direction,
  styles: { ...styles },
  config: { ...config },
}

export default extendTheme(overrides)
