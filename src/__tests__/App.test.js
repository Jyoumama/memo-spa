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
    
    expect(screen.getByText("メモ1")).toBeInTheDocument();
    expect(screen.getByText("メモ2")).toBeInTheDocument();
    expect(screen.getByText("メモを選択してください。")).toBeInTheDocument();
  });

  test("adds a new memo when the add button is clicked", () => {
    render(<App />);

    const addButton = screen.getByText("＋");
    fireEvent.click(addButton);

    expect(screen.getByText("メモ3")).toBeInTheDocument();
  });

  test("selects a memo and displays its content in the editor", () => {
    render(<App />);

    const memo1 = screen.getByText("メモ1");
    fireEvent.click(memo1);

    expect(screen.getByDisplayValue("メモ1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("メモ1の内容")).toBeInTheDocument();
  });

  test("deletes a memo", () => {
    render(<App />);

    const memo1 = screen.getByText("メモ1");
    fireEvent.click(memo1);

    const deleteButton = screen.getByText("削除");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("メモ1")).not.toBeInTheDocument();
  });
});
