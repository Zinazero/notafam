import { useEffect, useState } from 'react';
import axios from 'axios';
import { LeftTentacles, RightTentacles } from './components/Tentacles';
import Header from './components/Header';
import Carousel from './components/Carousel';

export const App = () => {
	const [status, setStatus] = useState<string>('Loading...');
	const [galleryImages, setGalleryImages] = useState<string[]>([]);
	const [logoImages, setLogoImages] = useState<string[]>([]);
	const [illustrationImages, setIllustrationImages] = useState<string[]>([]);
	const [productImages, setProductImages] = useState<string[]>([]);

	useEffect(() => {
		const fetchStatus = async () => {
			try {
				const { data } = await axios.get<{ status: string }>('/api/health');
				setStatus(data.status);
			} catch {
				setStatus('Error');
			}
		};

		fetchStatus();
	}, []);

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

	// new: load logos, illustrations and products from server
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
	return (
		<div className='min-h-screen flex flex-col items-center bg-light text-black relative'>
			<Header />

			<main className='w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8'>
				{/* Responsive grid: stacks on small screens, 2 columns on md+ */}
				<section className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='col-span-2'>
						<h2 className='text-2xl font-bold text-center w-full mb-2 text-brand'>
							Illustrations
						</h2>
						<Carousel
							images={illustrationImages}
							className='w-full'
							slidesToShow={3}
						/>
					</div>

					<div>
						<h2 className='text-2xl font-bold text-center w-full mb-2 text-brand'>Logos</h2>
						<Carousel images={logoImages} className='w-full' />
					</div>

					<div>
						<h2 className='text-2xl font-bold text-center w-full mb-2 text-brand'>Products</h2>
						<Carousel images={productImages} className='w-full' />
					</div>
				</section>

				{/* Gallery grid — responsive columns; maps images from public/gallery */}
				<section className='mt-8'>
					<h3 className='text-2xl font-semibold mb-4'>Gallery</h3>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
						{galleryImages.length === 0 ? (
							<div className='text-sm text-gray-500'>
								No gallery images found. Put images in public/gallery.
							</div>
						) : (
							galleryImages.map((src, i) => (
								<div key={i} className='rounded overflow-hidden bg-gray-100'>
									<img
										src={src}
										alt={`gallery ${i}`}
										className='w-full h-40 object-cover'
									/>
								</div>
							))
						)}
					</div>
				</section>
				<LeftTentacles />
				<RightTentacles />
			</main>
		</div>
	);
};
