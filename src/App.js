import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import MemoList from './MemoList';
import MemoEditor from './MemoEditor';
import LoginButton from './components/LoginButton';

function AppContent() {
  const { isLoggedIn } = useAuth();
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

  const addMemo = (title, content) => {
    const newMemo = {
      id: Date.now(),
      title,
      content,
    };
    const updatedMemos = [...memos, newMemo];
    setMemos(updatedMemos);
    localStorage.setItem('memos', JSON.stringify(updatedMemos));
  };

  const updateMemo = (id, updatedMemo) => {
    const updatedMemos = memos.map((memo) =>
      memo.id === id ? { ...memo, ...updatedMemo } : memo
    );
    setMemos(updatedMemos);
    localStorage.setItem('memos', JSON.stringify(updatedMemos));
  };

  const deleteMemo = (id) => {
    const updatedMemos = memos.filter((memo) => memo.id !== id);
    setMemos(updatedMemos);
    localStorage.setItem('memos', JSON.stringify(updatedMemos));
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginButton />
      ) : (
        <>
          <button onClick={useAuth().logout}>ログアウト</button>
          <MemoList
            memos={memos}
            setSelectedMemoId={setSelectedMemoId}
            deleteMemo={deleteMemo}
          />
          {selectedMemoId ? (
            <MemoEditor
              memo={memos.find((memo) => memo.id === selectedMemoId)}
              updateMemo={(updatedMemo) =>
                updateMemo(selectedMemoId, updatedMemo)
              }
            />
          ) : (
            <button onClick={() => addMemo('新しいメモ', '内容')}>新しいメモを追加</button>
          )}
        </>
      )}
    </div>
  );
}

export default AppContent;
