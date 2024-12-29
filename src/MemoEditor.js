import React, { useState } from 'react';

function MemoEditor({ memo, onSave, onDelete }) {
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  const handleSave = () => {
    onSave(memo.id, { title, content });
  };

  return (
    <div>
      <h3>編集</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトルを入力"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="内容を入力"
      ></textarea>
      <button onClick={handleSave}>保存</button>
      <button onClick={() => onDelete(memo.id)}>削除</button>
    </div>
  );
}

export default MemoEditor;
