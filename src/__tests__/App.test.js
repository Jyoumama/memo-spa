import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App component", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test("renders the memo list and shows placeholder text when no memo is selected", () => {
    render(<App />);
    
    // "メモ1" と "メモ2" のタイトルが表示されていることを確認
    expect(screen.getByText("メモ1")).toBeInTheDocument();
    expect(screen.getByText("メモ2")).toBeInTheDocument();

    // "メモを選択してください。" のプレースホルダーが表示されていることを確認
    expect(screen.getByText("メモを選択してください。")).toBeInTheDocument();
  });

  test("adds a new memo when the add button is clicked", () => {
    render(<App />);

    // "+" ボタンをクリックして新しいメモを追加
    const addButton = screen.getByText("＋");
    fireEvent.click(addButton);

    // 新しいメモがリストに追加されていることを確認
    expect(screen.getByText("メモ3")).toBeInTheDocument();
  });

  test("selects a memo and displays its content in the editor", () => {
    render(<App />);

    // "メモ1" をクリックして選択
    const memo1 = screen.getByText("メモ1");
    fireEvent.click(memo1);

    // メモエディタに "メモ1の内容" が表示されていることを確認
    expect(screen.getByDisplayValue("メモ1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("メモ1の内容")).toBeInTheDocument();
  });

  test("deletes a memo", () => {
    render(<App />);

    // "メモ1" をクリックして選択
    const memo1 = screen.getByText("メモ1");
    fireEvent.click(memo1);

    // メモエディタの "削除" ボタンをクリック
    const deleteButton = screen.getByText("削除");
    fireEvent.click(deleteButton);

    // "メモ1" がリストから削除されていることを確認
    expect(screen.queryByText("メモ1")).not.toBeInTheDocument();
  });
});
