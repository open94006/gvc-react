import { useState } from 'react';

export function FormReact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h3>4. Save Form</h3>
      <input
        placeholder="請輸入姓名"
        onChange={e => {
          setName(e.target.value);
        }}
        value={name}
      />
      <input
        placeholder="請輸入手機"
        onChange={e => {
          setPhone(e.target.value);
        }}
        value={phone}
      />
      <input
        placeholder="請輸入標籤"
        onChange={e => {
          setTagInput(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key !== 'Enter') return;

          const trimTag = tagInput.trim();

          if (!trimTag) return;
          if (tags.includes(trimTag)) return;

          setTags(prev => [...prev, tagInput]);
          setTagInput('');
        }}
        value={tagInput}
      />
      <ul>
        {tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          console.log({
            name: name.trim(),
            phone: phone.trim(),
            tags,
          });
        }}
      >
        Save Form
      </button>
    </div>
  );
}
