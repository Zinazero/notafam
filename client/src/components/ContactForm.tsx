import type { FormSubmitProps, InputType } from '../types';

export const ContactForm = ({ handleContactSubmit }: FormSubmitProps) => {
	const inputArray: InputType[] = [
		{
			tag: 'input',
			type: 'text',
			name: 'Name',
			placeholder: 'Your Name',
			required: true,
		},
		{
			tag: 'input',
			type: 'email',
			name: 'Email',
			placeholder: 'Your Email',
			required: true,
		},
		{
			tag: 'textarea',
			name: 'Message',
			placeholder: 'Message',
			rows: 4,
            className: 'resize-none',
			required: true,
		},
	];

	return (
		<form className='flex flex-col space-y-4' onSubmit={handleContactSubmit}>
			{inputArray.map(
				({ tag, type, name, placeholder, className, rows, required }, i) =>
					tag === 'input' ? (
						<input
							key={i}
							type={type}
							name={name}
							placeholder={placeholder}
							className={className}
							required={required}
						/>
					) : (
						<textarea
							key={i}
							name={name}
							placeholder={placeholder}
							rows={rows}
							className={className}
							required={required}
						/>
					)
			)}
			<input
				type='text'
				name='website'
				autoComplete='off'
				tabIndex={-1}
				style={{ display: 'none' }}
			/>
			<button
				type='submit'
				className='w-full active:scale-95 bg-brand text-white py-3 px-6 rounded-xl hover:scale-105 transition shadow-sm hover:shadow-md'
			>
				Send Message
			</button>
		</form>
	);
};
