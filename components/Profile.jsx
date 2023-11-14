import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section
      className='w-full'
    >
      <h1><span className='blue_gradient'>{name} profile</span></h1>
      <p className='desc text-left'>{desc}</p>
      <div className='mt-10 prompt_layout'>
      {data.map((prompt) => (
        <PromptCard 
          post={prompt}
          key={prompt._id} 
          handleEdit={() => handleEdit && handleEdit(prompt._id)}
          handleDelete={() => handleDelete && handleDelete(prompt)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile