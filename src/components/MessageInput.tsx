// @ts-ignore
import React from 'react';

import { useRef, useState, useEffect } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../../tokens.stylex";

const styles = stylex.create({
  container: {
    display: "flex",
    padding: "12px 16px",
    borderTop: `1px solid ${colors.lightBorder}`,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: `1px solid ${colors.lightBorder}`,
    fontSize: "14px",
    resize: "none",
    overflow: "hidden",
    minHeight: "36px",
    maxHeight: "160px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 16px",
    marginLeft: "8px",
    borderRadius: "8px",
    cursor: "pointer",
  },
});

export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onFocus = () => inputRef.current?.focus();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div {...stylex.props(styles.container)}>
      <textarea
        ref={inputRef}
        rows={1}
        {...stylex.props(styles.input)}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder="Type a message..."
      />
      <button {...stylex.props(styles.button)} onClick={handleSend}>Send</button>
    </div>
  );
}
