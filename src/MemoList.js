function MemoList({ memos, onSelectMemo, onAddMemo }) {
  return (
    <div>
      <h3>一覧</h3>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id} onClick={() => onSelectMemo(memo.id)}>
            {memo.title}
          </li>
        ))}
      </ul>
      <button onClick={onAddMemo}>＋</button>
    </div>
  );
}

export default MemoList;
