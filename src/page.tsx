import React, {useState, useMemo, useEffect} from 'react'
import orderBy from 'lodash/orderBy'

type Country = {
	id: string
	name: string
}

const Item = ({country}: {country: Country}) => {
	console.info('Item re-render')

	return <button className={`country-item`}>{country.name}</button>
}

const ItemMemo = React.memo(Item)

const Measure = ({before}: {before: number}) => {
	const now = performance.now()

	const result = now - before

	console.info('Overall performance: ', result)
	return <>{result}</>
}

const List = ({countries, before = 0}: {countries: Country[]; before?: number}) => {
	const [sort, setSort] = useState<'asc' | 'desc'>('asc')

	const sortedCountries = orderBy(countries, 'name', sort)
	console.info('Array sorting perf: ', performance.now() - before)

	const button = <button onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}>toggle sorting: {sort}</button>

	return (
		<>
			{button}
			{sortedCountries.map((country) => (
				<ItemMemo
					country={country}
					key={country.id}
				/>
			))}
		</>
	)
}

export const Page = ({countries}: {countries: any[]}) => {
	const [count, setCount] = useState(1)
	const [remount, setRemount] = useState(1)

	const before = performance.now()
	// const list = useMemo(() => <List countries={countries} />, [countries])
	return (
		<div>
			<button className='bg-slate-500 rounded-lg p-2 hover:bg-orange-400' onClick={() => setCount(count + 1)}>re-render: {count}</button>
			<button onClick={() => setRemount(remount + 1)}>re-mount: {remount}</button>
			<List
				countries={countries}
				// key={remount}
				before={before}
			/>
			{/* {list} */}
			<Measure before={before} />
		</div>
	)
}
