"use client";

import {useState, useEffect, useRef} from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => (
        <PromptCard post={prompt} key={prompt._id} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  let debounce = useRef(true);
  let totalPosts = useRef([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      totalPosts.current = data;
      setPosts(totalPosts.current);
    };
    fetchPosts();
  }, []);

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setPosts(totalPosts.current.filter(p => p?.tag?.includes(tag)));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (!value) {
      setPosts(totalPosts.current);
      return;
    }
    setTimeout(() => {
      debounce.current = true;
    }, 400);
    if (debounce.current) {
      debounce.current = false;
      const keyword = value?.trim();
      setPosts(totalPosts.current.filter(p => p?.prompt?.includes(keyword) || p?.tag?.includes(keyword) || p?.creator?.username?.toLowerCase()?.includes(keyword)));
    }
  }
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
         type="text"
         className='search_input'
         placeholder='Search for a tag or username'
         value={searchText}
         onChange={handleSearch}
         required
        />
      </form>
      <PromptCardList
        data = {posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed