export type InputType = {
	tag: 'input' | 'textarea';
	type?: 'text' | 'email' | 'tel' | 'number';
	name: string;
	placeholder: string;
	className?: string;
	rows?: number;
	required: boolean;
};
export type FormSubmitHandler = (
	e: React.FormEvent<HTMLFormElement>
) => void | Promise<void>;

export interface FormSubmitProps {
	handleContactSubmit: (
		e: React.FormEvent<HTMLFormElement>
	) => void | Promise<void>;
}
