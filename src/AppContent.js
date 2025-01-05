import React, { useState, useEffect } from 'react';
import MemoList from './MemoList';
import MemoEditor from './MemoEditor';
import LoginButton from './components/LoginButton';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { isLoggedIn, logout } = useAuth();
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
    if (!isLoggedIn) return;

    const maxMemoNumber = memos.reduce((max, memo) => {
      if (!memo || !memo.title) return max;
      const match = memo.title.match(/メモ(\d+)/);
      const number = match ? parseInt(match[1], 10) : 0;
      return Math.max(max, number);
    }, 0);

    const newMemo = {
      id: Date.now(),
      title: `メモ${maxMemoNumber + 1}`,
      content: '',
    };
    setMemos([...memos, newMemo]);
    setSelectedMemoId(newMemo.id);
  };

  const handleSaveMemo = (id, updatedMemo) => {
    if (!isLoggedIn) return;

    setMemos((prevMemos) =>
      prevMemos.map((memo) =>
        memo.id === id ? { ...memo, ...updatedMemo } : memo
      )
    );
    setSelectedMemoId(null);
    console.log('Memo saved and editor closed.');
  };

  const selectedMemo = selectedMemoId
    ? memos.find((memo) => memo.id === selectedMemoId)
    : null;

  const handleDeleteMemo = (id) => {
    if (!isLoggedIn) return;

    const updatedMemos = memos.filter((memo) => memo.id !== id);
    setMemos(updatedMemos);

    if (selectedMemoId === id) {
      setSelectedMemoId(null);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>メモアプリ</h1>
      {isLoggedIn ? (
        <button onClick={logout} style={{ marginBottom: '20px' }}>
          ログアウト
        </button>
      ) : (
        <LoginButton />
      )}
      {!isLoggedIn && <p>ログインするとメモの追加・編集・削除が可能です。</p>}

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ width: '300px' }}>
          <MemoList
            memos={memos}
            onSelectMemo={(id) => isLoggedIn && setSelectedMemoId(id)}
            onAddMemo={handleAddMemo}
            isLoggedIn={isLoggedIn}
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          {!isLoggedIn ? (
            <div>ログインしてください。</div>
          ) : selectedMemo ? (
            <MemoEditor
              memo={selectedMemo}
              onSave={(updatedMemo) =>
                handleSaveMemo(selectedMemo.id, updatedMemo)
              }
              onDelete={() => handleDeleteMemo(selectedMemo.id)}
            />
          ) : (
            <div>メモを選択してください。</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppContent;
