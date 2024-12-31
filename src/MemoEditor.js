import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';

function MemoEditor({ memo, onSave, onDelete }) {
  const { isLoggedIn } = useAuth();
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  const handleSave = () => {
    if (isLoggedIn) {
      onSave(memo.id, { title, content });
    }
  };

  const handleDelete = () => {
    if (isLoggedIn) {
      onDelete(memo.id);
    }
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
          height: '200px',
          padding: '8px',
          boxSizing: 'border-box',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
          lineHeight: '1.5',
        }}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleSave}
          disabled={!isLoggedIn}
          style={{
            height: '40px',
            padding: '0 16px',
            backgroundColor: '#e0e0e0',
            color: '#000',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: isLoggedIn ? 1 : 0.5,
          }}
        >
          保存
        </button>
        <button
          onClick={() => onDelete(memo.id)}
          disabled={!isLoggedIn}
          style={{
            height: '40px',
            padding: '0 16px',
            backgroundColor: '#e0e0e0',
            color: '#000',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: isLoggedIn ? 1 : 0.5,
          }}
        >
          削除
        </button>
      </div>
      {!isLoggedIn && <p>ログインすると編集・削除が可能です。</p>}
    </div>
  );
}

export default MemoEditor;
