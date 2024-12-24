import { useState } from 'react';
import { useAuth } from './contexts/AuthContext.js';

function MemoEditor({ memo, onSave, onDelete }) {
  const { isLoggedIn } = useAuth();
  const [content, setContent] = useState(memo.content);

  const handleSave = () => {
    if (isLoggedIn) {
      onSave(memo.id, content);
    }
  };

  const handleDelete = () => {
    if (isLoggedIn) {
      onDelete(memo.id);
    }
  };

  return (
    <div>
      <h3>編集</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={!isLoggedIn}
        style={{ opacity: isLoggedIn ? 1 : 0.5 }}
      ></textarea>
      <button onClick={handleSave} disabled={!isLoggedIn}>
        保存
      </button>
      <button onClick={handleDelete} disabled={!isLoggedIn}>
        削除
      </button>
      {!isLoggedIn && <p>ログインすると編集・削除が可能です。</p>}
    </div>
  );
}

export default MemoEditor;
