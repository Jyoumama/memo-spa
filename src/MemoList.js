import React from 'react';
import { useAuth } from './contexts/AuthContext';

function MemoList({ memos, onSelectMemo, onAddMemo }) {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <h3>一覧</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {memos.map((memo) => (
          <li
            key={memo.id}
            onClick={() => isLoggedIn && onSelectMemo(memo.id)}
            style={{
              cursor: isLoggedIn ? 'pointer' : 'not-allowed',
              textDecoration: 'underline',
              color: 'blue',
              marginBottom: '8px',
              opacity: isLoggedIn ? 1 : 0.5,
            }}
          >
            {memo.title}
          </li>
        ))}
      </ul>
    {isLoggedIn ? (
      <button
        onClick={onAddMemo}
        style={{
          display: 'block',
          marginTop: '10px',
          padding: '8px 16px',
          fontSize: '16px',
          backgroundColor: '#e0e0e0',
          color: '#000',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ＋
      </button>
    ) : (
      <p>ログインするとメモの追加が可能です。</p>
    )}
    </div>
  );
}
 
export default MemoList;
