import { AppProps, ErrorComponent, useRouter } from 'blitz'
// import { queryCache } from 'react-query'

// # Components
import { ErrorBoundary } from 'react-error-boundary'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      // onReset={() => {
      //   // This ensures the Blitz useQuery hooks will automatically refetch
      //   // data any time you reset the error boundary
      //   queryCache.resetErrorBoundaries()
      // }}
    >
      {getLayout(
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>,
      )}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error }: import('react-error-boundary').FallbackProps) {
  // if (error?.name === 'AuthenticationError') {
  //   return <LoginForm onSuccess={resetErrorBoundary} />
  // } else if (error?.name === 'AuthorizationError') {
  //   return (
  //     <ErrorComponent
  //       statusCode={(error as any).statusCode}
  //       title="Sorry, you are not authorized to access this"
  //     />
  //   )
  // } else {
  return (
    <ErrorComponent
      statusCode={(error as any)?.statusCode || 400}
      title={error?.message || error?.name}
    />
  )
  // }
}
