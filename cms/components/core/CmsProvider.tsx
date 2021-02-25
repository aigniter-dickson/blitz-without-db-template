import { useEffect } from 'react'

import { GithubClient, TinacmsGithubProvider } from 'react-tinacms-github'
import { NextGithubMediaStore } from 'next-tinacms-github'
import { TinaCMS, TinaProvider } from 'tinacms'

export type CmsProviderProps = {
  pageProps: import('blitz').AppProps['pageProps']
  children: import('react').ReactNode
}

export const CmsProvider = ({ pageProps, children }: CmsProviderProps) => {
  const github = new GithubClient({
    proxy: '/api/proxy-github',
    authCallbackRoute: '/api/create-github-access-token',
    clientId: process.env.GITHUB_CLIENT_ID,
    baseRepoFullName: process.env.BASE_REPO_FULL_NAME,
  })
  const cms = React.useMemo(() => new TinaCMS(tinaConfig), [])
  const tinaConfig = {
    enabled: pageProps.preview,
    toolbar: pageProps.preview,
    sidebar: pageProps.preview,
    apis: {
      github,
      // storage: typeof window !== 'undefined' ? new BrowserStorageApi(window.localStorage) : {},
    },
    media: new NextGithubMediaStore(github),
  }

  useEffect(
    () => {
      import('react-tinacms-date').then(({ DateFieldPlugin }) => {
        cms.plugins.add(DateFieldPlugin)
      })
      import('react-tinacms-editor').then(({ MarkdownFieldPlugin }) => {
        cms.plugins.add(MarkdownFieldPlugin)
      })
      import('react-tinacms-field-condition').then(
        ({ ConditionalFieldPlugin, ConditionalGroupFieldPlugin }) => {
          cms.plugins.add(ConditionalFieldPlugin)
          cms.plugins.add(ConditionalGroupFieldPlugin)
        },
      )
    },
    [pageProps.preview], // eslint-disable-line
  )

  const enterEditMode = () => undefined
  const exitEditMode = () => undefined

  return (
    <>
      <TinaProvider cms={cms}>
        <TinacmsGithubProvider
          onLogin={enterEditMode}
          onLogout={exitEditMode}
          error={pageProps.error}
        >
          {children}
        </TinacmsGithubProvider>
      </TinaProvider>
    </>
  )
}
