import React from 'react'

const OvulationIcon = ({ size = 24, color = '#8B5CF6', className = '' }) => {
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
			{/* Main Sparkle / Burst */}
			<path
				d='M12 3V6M12 18V21M21 12H18M6 12H3M18.364 5.63604L16.2426 7.75736M7.75736 16.2426L5.63604 18.364M18.364 18.364L16.2426 16.2426M7.75736 7.75736L5.63604 5.63604'
				stroke={color}
				strokeWidth='2'
				strokeLinecap='round'
			/>
			{/* The Central "Egg" or Core */}
			<circle cx='12' cy='12' r='3' fill={color} />
		</svg>
	)
}

export { OvulationIcon }
