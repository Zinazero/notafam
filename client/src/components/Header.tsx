const Header = () => {
	const NAV_HEIGHT = 60;

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		sectionId: string
	) => {
		e.preventDefault();
		const section = document.getElementById(sectionId);
		const h2 = section?.querySelector('h2');
		const target = h2 || section;
		if (target) {
			const y = target.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({
				top: y - (NAV_HEIGHT + 10),
				behavior: 'smooth',
			});
		}
	};

	return (
		<header
			className='sticky top-0 w-full shadow-md z-10 overflow-hidden text-white flex items-center'
			style={{ height: `${NAV_HEIGHT}px` }}
		>
			<img
				src='back1.jpg'
				alt='Header Background'
				className='absolute inset-0 w-full h-full object-cover z-0'
			/>
			<nav className='relative w-full flex items-center justify-between px-8 py-3 z-10'>
				<div className='font-bold text-2xl'>Not a Family Company</div>
				<ul className='flex gap-6 list-none m-0 p-0 text-lg'>
					<li>
						<a href='#home' onClick={(e) => handleNavClick(e, 'home')}>
							Home
						</a>
					</li>
					<li>
						<a href='#gallery' onClick={(e) => handleNavClick(e, 'gallery')}>
							Gallery
						</a>
					</li>
					<li>
						<a href='#about' onClick={(e) => handleNavClick(e, 'about')}>
							About
						</a>
					</li>
					<li>
						<a href='#contact' onClick={(e) => handleNavClick(e, 'contact')}>
							Contact
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
