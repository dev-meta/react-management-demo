import Theme from './theme'
import './styles.css'

import {Outlet} from 'react-router-dom'
import Header from './header'

export default function App() {
	return (
		<div className='App'>
			<Theme />
			<Header />
			<Outlet />
		</div>
	)
}
