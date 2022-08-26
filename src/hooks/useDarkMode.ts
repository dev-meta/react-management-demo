import {useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import {useEffect} from 'react'

const themeAtom = atomWithStorage('theme', false)

const useDarkMode = () => {
	const [isDark, setIsDark] = useAtom(themeAtom)
	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add('dark')
			return
		}
		document.documentElement.classList.remove('dark')
	}, [isDark])

	return [isDark, setIsDark] as const
}

export default useDarkMode
