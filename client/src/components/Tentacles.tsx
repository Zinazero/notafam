import { motion } from 'framer-motion';

export const LeftTentacles = () => {
	return (
		<motion.div
			initial={{ x: '-20%' }} // start completely offscreen to the left
			animate={{ x: '-10%' }} // move into view
			transition={{
				duration: 2, // slow movement
				repeat: Infinity, // loop forever
				repeatType: 'reverse', // move back and forth
				ease: 'linear', // constant speed
				delay: 0,
			}}
			className='fixed bottom-0 left-0 h-screen'
		>
			<img src='tentacles_left.png' alt='Left Tentacles' className='h-full' />
		</motion.div>
	);
};

export const RightTentacles = () => {
	return (
		<motion.div
			initial={{ x: '20%' }} // start completely offscreen to the right
			animate={{ x: '10%' }} // move into view
			transition={{
				duration: 2, // slow movement
				repeat: Infinity, // loop forever
				repeatType: 'reverse', // move back and forth
				ease: 'linear', // constant speed
				delay: 0.25,
			}}
			className='fixed bottom-0 right-0 h-screen'
		>
			<img src='tentacles_right.png' alt='Right Tentacles' className='h-full' />
		</motion.div>
	);
};
