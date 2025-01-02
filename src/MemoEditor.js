import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';

function MemoEditor({ memo, onSave, onDelete }) {
  const { isLoggedIn } = useAuth();

  const [title, setTitle] = useState(memo ? memo.title : '');
  const [content, setContent] = useState(memo ? memo.content : '');

  useEffect(() => {
    if (memo) {
      setTitle(memo.title);
      setContent(memo.content);
    }
  }, [memo]);

  const handleSave = () => {
    if (isLoggedIn) {
      onSave(memo.id, { title, content });
    }
  };

  if (!memo) {
    return <p>メモが選択されていません。</p>;
  }

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトルを入力"
        style={{
          width: '90%',
          padding: '8px',
          marginBottom: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="メモ内容を入力"
        style={{
          width: '90%',
          height: '120px',
          padding: '8px',
          marginBottom: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      ></textarea>
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '8px 16px',
            marginRight: '8px',
            backgroundColor: '#e0e0e0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          保存
        </button>
        <button
          onClick={onDelete}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e0e0e0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          削除
        </button>
      </div>
    </div>
  );
}

export default MemoEditor;
