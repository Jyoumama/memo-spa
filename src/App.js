import { useState } from 'react';
import MemoList from './MemoList.js';
import MemoEditor from './MemoEditor.js';
import LoginButton from './components/LoginButton.js';
import { AuthProvider, useAuth } from './contexts/AuthContext.js';

function AppContent() {
  const { isLoggedIn } = useAuth();
  const [memos, setMemos] = useState([
    { id: 1, title: 'メモ1', content: 'メモ1の内容' },
    { id: 2, title: 'メモ2', content: 'メモ2の内容' },
  ]);
  const [selectedMemoId, setSelectedMemoId] = useState(null);

  const handleAddMemo = () => {
    if (!isLoggedIn) return;
    const newMemo = {
      id: Date.now(),
      title: `メモ${memos.length + 1}`,
      content: '',
    };
    setMemos([...memos, newMemo]);
    setSelectedMemoId(newMemo.id);
  };

  const handleSaveMemo = (id, content) => {
    if (!isLoggedIn) return;
    setMemos(
      memos.map((memo) => (memo.id === id ? { ...memo, content } : memo))
    );
    setSelectedMemoId(null);
  };

  const handleDeleteMemo = (id) => {
    if (!isLoggedIn) return;
    setMemos(memos.filter((memo) => memo.id !== id));
    setSelectedMemoId(null);
  };

  const selectedMemo = memos.find((memo) => memo.id === selectedMemoId);

  return (
    <div>
      <h1>メモアプリ</h1>
      <LoginButton />
      {selectedMemo ? (
        <MemoEditor
          memo={selectedMemo}
          onSave={handleSaveMemo}
          onDelete={handleDeleteMemo}
        />
      ) : (
        <MemoList
          memos={memos}
          onSelectMemo={setSelectedMemoId}
          onAddMemo={handleAddMemo}
        />
      )}
      {!isLoggedIn && <p>ログインするとメモの追加・編集・削除が可能です。</p>}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <div>
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
