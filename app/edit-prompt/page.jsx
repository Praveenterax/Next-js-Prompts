'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {

	const { data: session } = useSession();
	const router = useRouter();
	const searchParams = useSearchParams();
	const postId = searchParams.get('id');


	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: ''
	});
	useEffect(() => {
		const getPrompt = async () => {
			const response = await fetch(`/api/prompt/${postId}`);
			const data = await response.json();
			setPost({
				prompt: data.prompt,
				tag: data.tag
			});
		};
		getPrompt();
	}, [postId]);
	const updatePrompt = async (e, updatedPost) => {
		e?.preventDefault();
		setSubmitting(true);
		try {
			const response = await fetch(`/api/prompt/${postId}`, {
				method: 'PATCH',
				body: JSON.stringify(updatedPost)
			});

			if (response.ok) {
				router.push('/profile');
			}

		} catch (err) {
			console.log(err);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	)
}

export default EditPrompt;