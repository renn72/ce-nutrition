import { SpinnerGapIcon } from '@phosphor-icons/react'
const Spinner = () => {
	return (
		<div className='flex flex-col justify-center items-center mt-16 w-full'>
			<SpinnerGapIcon size={48} className='animate-spin' />
		</div>
	)
}

export { Spinner }
