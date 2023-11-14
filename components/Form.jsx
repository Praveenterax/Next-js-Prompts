"use client";

import { useState } from 'react';
import Link from 'next/link';
import Tags from './Tags';

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  const [tags, setTags] = useState([]);
  const onSubmit = (e) => {
    e?.preventDefault();
    const newPrompt = {
      ...post,
      tag: tags
    };
    handleSubmit(e, newPrompt);
  };
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing AI snippets to the world. Let your inner creativity break the bounds of your limits
      </p>
      <form
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        onSubmit={onSubmit}
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI prompt</span>
          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value})}
            placeholder='Write your prompt here'
            required
            className='form_textarea'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Tag <span className='font-normal'>(#product, #webdevelopment)</span></span>
          <Tags tags={tags} setTags={setTags} />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>Cancel</Link>
          <button
           type="submit"
           disabled={submitting}
           className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
           onClick={onSubmit}
          >{submitting ? `${type} ...` : type}</button>
        </div>
      </form>
    </section>
  )
}

export default Form;