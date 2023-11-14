"use client";

import { useState } from "react"

const X_ICON = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>;

const Test = () => {
  const [tags, setTags] = useState(['tag1', 'tag2']);
  const [tagName, setTagName] = useState('');
  const isDisabled = tags.length >= 5;
  const handleKeyDown = (e) => {
    const {key} = e;
    if ((key === ',' || key === ' ' || key === 'Enter')) {
      e.preventDefault();
      if (tagName.trim() && !tagName.match(/^#+$/gm) && !tags.includes(tagName)) {
        setTags(prev => [...prev, e.target.value]);
        setTagName('');
        return;
      }
    }
    if (key === 'Backspace' && tagName === '' && tags.length) {
      e.preventDefault();
      const tagsCopy = [...tags];
      setTagName(tagsCopy.pop());
      setTags(tagsCopy);
    }
  };
  const handleRemoveTag = (index) => {
    const tagsCopy = [...tags];
    tagsCopy.splice(index, 1);
    setTags(tagsCopy);
  };
  return (
    <div className="w-full flex flex-row flex-wrap gap-2 p-2 border">
      {tags.map((tag, index) => (
        <div key={tag} className="border flex flex-row content-between items-center px-2">
          <span>{tag}</span>
          <span className="ml-1 hover:bg-zinc-800 hover:text-stone-100" onClick={() => handleRemoveTag(index)}>{X_ICON}</span>
        </div>
      ))}
      <input 
        type="text"
        className={`grow border outline-none bg-inherit ${isDisabled ? 'cursor-not-allowed' : ''}`}
        value={tagName}
        onChange={e => e.key !== ',' && setTagName(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        placeholder={isDisabled ? 'At most only 5 tags! Remove one to add more...' : `#tag #webdev  You can add ${5 -tags.length} more...`}
      />
    </div>
  )
}

export default Test