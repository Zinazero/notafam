import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { LeftTentacles, RightTentacles } from './components/Tentacles';
import Header from './components/Header';
import Carousel from './components/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { ContactForm } from './components/ContactForm';
import type { FormSubmitHandler } from './types';

export const App = () => {
	const [galleryImages, setGalleryImages] = useState<string[]>([]);
	const [logoImages, setLogoImages] = useState<string[]>([]);
	const [illustrationImages, setIllustrationImages] = useState<string[]>([]);
	const [productImages, setProductImages] = useState<string[]>([]);
	const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isContactSent, setIsContactSent] = useState(false);

	const [modalOpen, setModalOpen] = useState(false);
	const [modalImg, setModalImg] = useState<string | null>(null);

	const gallerySectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadGallery = async () => {
			try {
				const { data } = await axios.get<{ images: string[] }>('/api/gallery');
				setGalleryImages(data.images || []);
			} catch (err) {
				console.error('Failed to load gallery from API', err);
				setGalleryImages([]);
			}
		};

		loadGallery();
	}, []);

	useEffect(() => {
		const loadCollections = async () => {
			try {
				const [logosRes, illRes, prodRes] = await Promise.all([
					axios.get<{ images: string[] }>('/api/logos'),
					axios.get<{ images: string[] }>('/api/illustrations'),
					axios.get<{ images: string[] }>('/api/products'),
				]);

				setLogoImages(logosRes.data.images || []);
				setIllustrationImages(illRes.data.images || []);
				setProductImages(prodRes.data.images || []);
			} catch (err) {
				console.error('Failed to load collections from API', err);
				setLogoImages([]);
				setIllustrationImages([]);
				setProductImages([]);
			}
		};

		loadCollections();
	}, []);

	useEffect(() => {
		if (gallerySectionRef.current) {
			gallerySectionRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	}, [isGalleryExpanded]);

	const openModal = (img: string) => {
		setModalImg(img);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setModalImg(null);
	};

	const handleContactSubmit: FormSubmitHandler = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());

		try {
			await axios.post('/api/contact', data);
			setIsContactSent(true);
			setErrorMessage('');
		} catch (error: any) {
			setErrorMessage('Something went wrong. Please try again.');
			//console.error(error.response?.data || error.message);
		}
	};

	return (
		<div className='min-h-screen flex flex-col items-center bg-light text-black relative'>
			<Header />

			<main className='w-full py-8'>
				<section className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto'>
					<div className='col-span-2'>
						<h2 className='text-2xl font-bold text-center w-full mb-2 text-brand'>
							Illustrations
						</h2>
						<Carousel
							images={illustrationImages}
							slidesToShow={3}
							onImageClick={openModal}
							className='w-full'
						/>
					</div>

					<div>
						<h2 className='text-2xl font-bold text-center w-full mb-2 text-brand'>
							Logos
						</h2>
						<Carousel
							images={logoImages}
							onImageClick={openModal}
							className='w-full'
						/>
					</div>

					<div>
						<h2 className='text-2xl font-bold text-center w-full mb-2 text-brand'>
							Products
						</h2>
						<Carousel
							images={productImages}
							onImageClick={openModal}
							className='w-full'
						/>
					</div>
				</section>

				<section className='mt-8 max-w-7xl mx-auto' ref={gallerySectionRef}>
					<h2 className='text-2xl font-bold text-center w-full mb-4 text-brand'>
						Gallery
					</h2>
					<div
						className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-hidden shadow-md rounded-lg relative ${
							isGalleryExpanded ? '' : 'max-h-100'
						}`}
					>
						{galleryImages.length === 0 ? (
							<div className='text-sm text-gray-500'>
								No gallery images found.
							</div>
						) : (
							<>
								{galleryImages.map((src, i) => (
									<div
										key={i}
										className='rounded overflow-hidden bg-gray-100 shadow-sm cursor-pointer'
										onClick={() => openModal(src)}
									>
										<img
											src={src}
											alt={`gallery ${i}`}
											className='w-full h-40 object-cover'
										/>
									</div>
								))}
								<div
									className='absolute bottom-0 w-full h-15 bg-gradient-to-t from-brand/80 to-brand/0 flex items-center justify-center group cursor-pointer'
									onClick={() => {
										setIsGalleryExpanded(!isGalleryExpanded);
									}}
								>
									<FontAwesomeIcon
										icon={isGalleryExpanded ? 'chevron-up' : 'chevron-down'}
										className='text-4xl text-transparent-grey group-hover:text-orange transition'
									/>
								</div>
							</>
						)}
					</div>
				</section>

				<section className='mt-8 text-center bg-white shadow-md py-10 flex flex-col items-center justify-center'>
					<h2 className='text-4xl text-brand mb-10'>
						Who am I? No, seriously.
					</h2>
					<div className='flex items-center justify-center text-gray-500'>
						<div className='flex flex-col items-start justify-center gap-4 mr-10 max-w-1/5 text-left'>
							<h3 className='text-2xl'>Rohit Sharia</h3>
							<p className='text-lg'>
								30-year-old graphic designer who believes that design is a
								powerful tool for communication and storytelling. With 8 years
								of experience in the print industry, I’ve had the opportunity to
								work with clients across a range of sectors including Food,
								Alcoholic Beverages, and Healthcare. My specialties include
								<strong> Prepress, Print Design, and Illustration.</strong> I’m
								always looking for ways to push the boundaries and think outside
								the box.
							</p>
						</div>
						<div className='rounded-4xl overflow-hidden shadow-sm'>
							<img src='logosgogo.jpg' alt='Self Pic' />
						</div>
					</div>
				</section>

				<section className='mt-8 text-center shadow-md py-10 flex flex-col items-center justify-center'>
					<h2 className='text-4xl text-brand mb-10'>Hit a Brotha Up</h2>
					<div className='w-1/5'>
						<ContactForm handleContactSubmit={(e) => handleContactSubmit(e)} />
						{errorMessage && (
							<p className='text-red-500 mt-4'>{errorMessage}</p>
						)}
					</div>
				</section>

				{/* Modal for fullscreen image with fade animation */}
				<AnimatePresence>
					{modalOpen && modalImg && (
						<motion.div
							className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.1 }}
							onClick={closeModal}
						>
							<motion.div
								className='relative max-w-3xl w-full flex items-center justify-center'
								initial={{ scale: 0.95, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.95, opacity: 0 }}
								transition={{ duration: 0.1 }}
								onClick={(e) => e.stopPropagation()}
							>
								<img
									src={modalImg}
									alt='fullscreen'
									className='max-h-[80vh] w-auto rounded-lg shadow-lg'
								/>
								<button
									onClick={closeModal}
									className='absolute top-2 right-2 bg-white/80 text-black rounded-full p-2 text-xl hover:bg-white'
									aria-label='Close'
								>
									×
								</button>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				<LeftTentacles />
				<RightTentacles />
			</main>
		</div>
	);
};
