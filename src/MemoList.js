import React from 'react';

function MemoList({ memos, onSelectMemo, onAddMemo }) {
  return (
    <div>
      <h3>一覧</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {memos.map((memo) => (
          <li
            key={memo.id}
            onClick={() => onSelectMemo(memo.id)}
            style={{
              cursor: 'pointer',
              textDecoration: 'underline',
              color: 'blue',
              marginBottom: '8px',
            }}
          >
            {memo.title}
          </li>
        ))}
      </ul>
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
    </div>
  );
}

export default MemoList;
