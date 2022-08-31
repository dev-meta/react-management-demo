import React, {useEffect, useRef, useState} from 'react'
import Theme from './theme'

function App() {
	// const [top, setTop] = useState('15rem')
	const boxRef = useRef<HTMLDivElement>(null)
	const distanceRef = useRef(0)
	const initTopRef = useRef(0)
	useEffect(() => {
		const container = boxRef.current
		console.log('onload')
		if (!container) {
			return
		}
		const {top} = container.getBoundingClientRect()
		initTopRef.current = top

		function handler (e: TouchEvent) {
			// if (e._isScroller) return
			// 阻止默认事件
			e.preventDefault()
		}
		document.body.addEventListener(
			'touchmove',
			handler,
			{
				passive: false,
			}
		)
		return () => {
			console.log('unload')
			document.body.removeEventListener('touchmove', handler)
		}
	}, [])

	const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		const positions = e.targetTouches[0]
		const {clientY} = positions
		const target = e.target as HTMLDivElement
		// const distance = clientY - distanceRef.current
		const topRes = clientY - distanceRef.current
		target.style.top = Math.min(Math.max(topRes, 0), initTopRef.current) + 'px'
		console.log('touchmove', topRes)
	}
	const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement
		const {clientY} = e.targetTouches[0]
		const {top} = target.getBoundingClientRect()
		distanceRef.current = clientY - top
		console.log('target', target, top)
	}
	const onTouchEnd = (e: React.TouchEvent) => {
		const target = e.target as HTMLDivElement;
		const {top} = target.getBoundingClientRect();
		if(initTopRef.current - top > 20) {
			target.style.top = '0px'
		}
		console.log('touchend', e.targetTouches[0], top)
	}

	return (
		<div className='App h-full overflow-hidden relative'>
			<Theme />
			<div
				ref={boxRef}
				onTouchMove={onTouchMove}
				onTouchStart={onTouchStart}
				onTouchEnd={onTouchEnd}
				className='bg-lime-600 absolute top-60 w-full h-5/6'
			>
				draggable
			</div>
		</div>
	)
}

export default App
