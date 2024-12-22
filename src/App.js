import { useState } from 'react';
import MemoList from './MemoList.js';
import MemoEditor from './MemoEditor.js';

function App() {
  const [memos, setMemos] = useState([
    { id: 1, title: 'メモ1', content: 'メモ1の内容' },
    { id: 2, title: 'メモ2', content: 'メモ2の内容' },
  ]);
  const [selectedMemoId, setSelectedMemoId] = useState(null);

  const handleAddMemo = () => {
    const newMemo = {
      id: Date.now(),
      title: `メモ${memos.length + 1}`,
      content: '',
    };
    setMemos([...memos, newMemo]);
    setSelectedMemoId(newMemo.id);
  };

  const handleSaveMemo = (id, content) => {
    setMemos(
      memos.map((memo) => (memo.id === id ? { ...memo, content } : memo))
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
    </div>
  );
}

export default App;
