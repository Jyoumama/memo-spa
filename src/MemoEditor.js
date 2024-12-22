import { useState } from 'react';

function MemoEditor({ memo, onSave, onDelete }) {
  const [content, setContent] = useState(memo.content);

  const handleSave = () => {
    onSave(memo.id, content);
  };

  return (
    <div>
      <h3>編集</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleSave}>保存</button>
      <button onClick={() => onDelete(memo.id)}>削除</button>
    </div>
  );
}

export default MemoEditor;
