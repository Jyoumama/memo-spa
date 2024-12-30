import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import MemoList from './MemoList';
// eslint-disable-next-line no-unused-vars
import MemoEditor from './MemoEditor';

function App() {
  const [memos, setMemos] = useState(() => {
    const storedMemos = localStorage.getItem('memos');
    return storedMemos
      ? JSON.parse(storedMemos)
      : [
          { id: 1, title: 'メモ1', content: 'メモ1の内容' },
          { id: 2, title: 'メモ2', content: 'メモ2の内容' },
        ];
  });

  const [selectedMemoId, setSelectedMemoId] = useState(null);

  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  const handleAddMemo = () => {
    const newMemo = {
      id: Date.now(),
      title: `メモ${memos.length + 1}`,
      content: '',
    };
    setMemos([...memos, newMemo]);
    setSelectedMemoId(newMemo.id);
  };

  const handleSaveMemo = (id, updatedMemo) => {
    setMemos(
      memos.map((memo) => (memo.id === id ? { ...memo, ...updatedMemo } : memo))
    );
    setSelectedMemoId(null);
  };

  const handleDeleteMemo = (id) => {
    setMemos(memos.filter((memo) => memo.id !== id));
    setSelectedMemoId(null);
  };

  const selectedMemo = memos.find((memo) => memo.id === selectedMemoId);

  return (
    <div>
      <h1>アプリケーション</h1>
      {/* MemoList: 常に表示 */}
      <MemoList
        memos={memos}
        onSelectMemo={setSelectedMemoId}
        onAddMemo={handleAddMemo}
      />
      {/* MemoEditor: 常に表示 */}
      <MemoEditor
        memo={selectedMemo || { id: null, title: '', content: '' }}
        onSave={handleSaveMemo}
        onDelete={handleDeleteMemo}
      />
    </div>
  );
}

export default App;
