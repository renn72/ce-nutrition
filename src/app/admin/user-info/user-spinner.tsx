import { SpinnerGapIcon } from '@phosphor-icons/react'
const UserSpinner = () => {
	return (
		<div className='flex flex-col justify-center items-center mt-20'>
			<SpinnerGapIcon size={48} className='animate-spin' />
		</div>
	)
}

export { UserSpinner }
