import React from 'react'

const PeriodIcon = ({
	size = 24,
	color = '#E11D48',
	className = '',
	strokeWidth = 1,
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
			aria-hidden='true'
		>
			{/* Central Blood Drop */}
			<path
				d='M12 8.5C12 8.5 9.5 11.5 9.5 13.5C9.5 14.8807 10.6193 16 12 16C13.3807 16 14.5 14.8807 14.5 13.5C14.5 11.5 12 8.5 12 8.5Z'
				fill={color}
			/>

			{/* Top Arrow Arc */}
			<path
				d='M19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.65825 4.5 7.56588 5.57463 6.19598 7.25M6.19598 7.25V4.5M6.19598 7.25H9'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>

			{/* Bottom Arrow Arc */}
			<path
				d='M4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C14.3418 19.5 16.4341 18.4254 17.804 16.75M17.804 16.75V19.5M17.804 16.75H15'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export { PeriodIcon }
