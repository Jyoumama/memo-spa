import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import MemoList from './MemoList';
import MemoEditor from './MemoEditor';
import LoginButton from './components/LoginButton';

function AppContent() {
  const { isLoggedIn, login, logout } = useAuth();
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

  const addMemo = () => {
    const nextMemoNumber = memos.length + 1;
    const newMemo = {
      id: Date.now(),
      title: `メモ${nextMemoNumber}`,
      content: '内容',
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
    setSelectedMemoId(null);
  };

  const deleteMemo = (id) => {
    const updatedMemos = memos.filter((memo) => memo.id !== id);
    setMemos(updatedMemos);
    localStorage.setItem('memos', JSON.stringify(updatedMemos));
    setSelectedMemoId(null);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px'}}>
      <h1>メモアプリ</h1>
      <p>このアプリは、ログイン後にメモの追加、編集、削除が可能です。</p>

      {!isLoggedIn ? (
        <>
        <p>現在は閲覧モードです。編集や削除を行うにはログインしてください。</p>
        <LoginButton />
        </>
      ) : (
          <button onClick={logout} style={{ marginBottom: '20px' }}>
            ログアウト
          </button>
      )}

      <MemoList
        memos={memos}
        onSelectMemo={setSelectedMemoId}
        onAddMemo={addMemo}
        isLoggedIn={isLoggedIn}
      />

      {selectedMemoId && isLoggedIn && (
        <MemoEditor
          memo={memos.find((memo) => memo.id === selectedMemoId)}
          onSave={(id, updatedMemo) => {
            if (!updatedMemo) {
              console.error("updatedMemo is not defined");
              return;
            }
            updateMemo(id, updatedMemo);
          }}
          onDelete={()=> {
            deleteMemo(selectedMemoId);
            setSelectedMemoId(null);
          }}
        />
      )}
    </div>
  );
}

export default AppContent;
