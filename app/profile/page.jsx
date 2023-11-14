'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const ProfilePage = () => {

  const { data: session } = useSession();
  const userId = session?.user.id;
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`,{
        cache: 'no-store'
      });
      const data = await response.json();
      setPosts(data);
    };
    if (userId) fetchPosts();
  }, [userId, reload]);

  const handleEdit = (id) => {
    router.push(`/edit-prompt?id=${id}`);
  };
  const handleDelete = async (post) => {
    const confirmDelete = confirm('Are you sure, you want to delete?');
    if (confirmDelete) {
      try {
        if (session?.user.id === post?.creator?._id) {
          const response = await fetch(`/api/prompt/${post._id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            setReload(prev => !prev);
          }
        } else {
          throw new Error("You cannot delete other's posts!")
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage;