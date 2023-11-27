import { Paths } from 'constants/paths'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const pathLabels = {
  [Paths.BRIDGE]: 'Bridge',
}

const END_LABELS: any = {}
const RELATED_BACK_LINKS: any = {}

export const useRouteNavigator = () => {
  const { pathname } = useLocation()

  const endItem = useMemo(() => {
    const ender = Object.keys(END_LABELS).find((item) => pathname.startsWith(item))
    if (ender) {
      return { label: END_LABELS[ender](pathname), link: pathname }
    }

    return undefined
  }, [pathname])

  return useMemo(() => {
    const pathNames = pathname.split('/').filter((x) => x)

    const links = pathNames.map((value, index) => {
      const link = `/${pathNames.slice(0, index + 1).join('/')}`

      return { link: '/#' + (RELATED_BACK_LINKS[link] || link), label: pathLabels[link] }
    })
    return {
      links: (endItem ? [...links, endItem] : links).filter(({ label }) => !!label),
    }
  }, [pathname, endItem])
}
