const Header = () => {
	return (
		<header className='sticky top-0 h-20 w-full shadow-md z-10 overflow-hidden text-white flex items-center'>
			<img
				src='back1.jpg'
				alt='Header Background'
				className='absolute inset-0 w-full h-full object-cover z-0'
			/>
			<nav className='relative w-full flex items-center justify-between px-8 py-3 z-10'>
				<div className='font-bold text-2xl'>Logo</div>
				<ul className='flex gap-6 list-none m-0 p-0 text-lg'>
					<li>
						<a href='/'>Home</a>
					</li>
					<li>
						<a href='/about'>About</a>
					</li>
					<li>
						<a href='/contact'>Contact</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
