import create from 'zustand'
import {pick} from './utils'
import shallow from 'zustand/shallow'
import classnames from 'classnames'
import { useState } from 'react'

interface TodoItme {
	id: number
	// completed: boolean
	text: string
}

interface StoreType {
	input: string
	list: TodoItme[]
	setInput: (s: string) => void
	addTodo: () => void
	deleteTodo: (id: number) => void
}

interface DataType {
	count: number
	age: number
	add: () => void
}

const useStore = create<DataType>()((set) => ({
	count: 0,
	age: 11,
	add() {
		set((state) => ({count: state.count + 1}))
	},
}))

const useTodoStore = create<StoreType>((set, get) => ({
	input: '',
	list: [],
	setInput(s) {
		set({input: s})
	},
	addTodo() {
		if (!get().input) return
		set((state) => ({
			list: [
				...state.list,
				{
					id: Date.now(),
					text: state.input,
				},
			],
		}))
	},
	deleteTodo(id) {
		set(() => ({
			list: get().list.filter((item) => item.id !== id),
		}))
	},
}))

function ZustandDemo() {
    console.log('render')
    const [obj, setObj] = useState({count: 1})
	// const {count, add} = useStore((state) => ({
	// 	count: state.count,
	// 	add: state.add,
	// }))
	const {count, add} = useStore((state) => pick(state, ['count', 'add']), shallow)
	const {input, list, setInput, addTodo, deleteTodo} = useTodoStore((state) =>
		pick(state, ['input', 'list', 'setInput', 'addTodo', 'deleteTodo'])
	)
	const handleAdd = () => {
		addTodo()
		setInput('')
	}
    const handle = () => {
        setObj({count: 2})
    }
	return (
		<div>
            <p>{obj.count}</p>
            <button onClick={handle}>sfsf</button>
			<div>{count}</div>
			<button
				className='border-2 rounded-xl border-red-200 p-[10px] hover:bg-orange-900 hover:text-gray-400'
				onClick={add}
			>
				add
			</button>
			<hr />
			<input
				type='text'
				className='bg-slate-500'
				value={input}
				onChange={({target: {value}}) => setInput(value)}
			/>
			<button
				className={classnames(
					'border-2 rounded-xl border-red-200 p-[4px] hover:bg-green-300 hover:text-black',
					{'cursor-not-allowed': !input}
				)}
				onClick={handleAdd}
				disabled={!input}
			>
				添加
			</button>
			{list.map((item) => (
				<div key={item.id}>
					{item.text}{' '}
					<button
						onClick={() => deleteTodo(item.id)}
						className='border-2 rounded-xl border-red-200 p-[4px] hover:bg-cyan-500'
					>
						删除
					</button>
				</div>
			))}
		</div>
	)
}

export default ZustandDemo
