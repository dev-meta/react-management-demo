import useDarkMode from "./hooks/useDarkMode"

const Theme = () => {
    const [isDark, setIsDark] = useDarkMode();
    
    return <button className="rounded-[8px] border-2 border-stone-500 p-[4px]" onClick={() => setIsDark(t => !t)}>theme-{isDark ? 'dark' : 'light'}</button>
}

export default Theme;