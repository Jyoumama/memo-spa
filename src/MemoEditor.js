import React, { useState } from 'react';

function MemoEditor({ memo, onSave, onDelete }) {
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  const handleSave = () => {
    onSave(memo.id, { title, content });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
      }}
    >
      <h3>編集</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトルを入力"
        style={{
          height: '40px',
          padding: '8px',
          boxSizing: 'border-box',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="内容を入力"
        style={{
          height: '100px',
          padding: '8px',
          boxSizing: 'border-box',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      ></textarea>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleSave}
          style={{ height: '40px', padding: '0 16px' }}
        >
          保存
        </button>
        <button
          onClick={() => onDelete(memo.id)}
          style={{ height: '40px', padding: '0 16px' }}
        >
          削除
        </button>
      </div>
    </div>
  );
}

export default MemoEditor;
