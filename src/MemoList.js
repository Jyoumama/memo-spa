import { useAuth } from './contexts/AuthContext.js';

function MemoList({ memos, onSelectMemo, onAddMemo }) {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <h3>一覧</h3>
      <ul>
        {memos.map((memo) => (
          <li
            key={memo.id}
            onClick={() => isLoggedIn && onSelectMemo(memo.id)}
            style={{
              cursor: isLoggedIn ? 'pointer' : 'not-allowed',
              opacity: isLoggedIn ? 1 : 0.5,
            }}
          >
            {memo.title}
          </li>
        ))}
      </ul>
      {isLoggedIn && <button onClick={onAddMemo}>＋</button>}
      {!isLoggedIn && <p>ログインするとメモの追加が可能です。</p>}
    </div>
  );
}

export default MemoList;
