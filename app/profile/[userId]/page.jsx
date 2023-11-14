'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const ProfilePage = ({ params }) => {

	const [posts, setPosts] = useState([]);
	const searchParams = useSearchParams();
	const username = searchParams.get('username');

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params?.userId}/posts`);
			const data = await response.json();
			setPosts(data);
		};
		if (params?.userId) fetchPosts();
	}, []);


	return (
		<Profile
			name={username}
			desc={`Welcome to ${username}'s profile. Feel free to browse through the prompts created by the user`}
			data={posts}
		/>
	)
}

export default ProfilePage;