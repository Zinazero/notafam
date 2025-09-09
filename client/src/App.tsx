import { useEffect, useState } from 'react';
import axios from 'axios';

export const App = () => {
	const [status, setStatus] = useState<string>('Loading...');

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

	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<h1 className='text-4xl text-semibold'>Server status: {status}</h1>
		</div>
	);
};
