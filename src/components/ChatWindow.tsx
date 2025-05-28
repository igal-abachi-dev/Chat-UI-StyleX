// @ts-ignore
import React from 'react';

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import ChatBubble from "./ChatBubble";
import Header from "./Header";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../../tokens.stylex";
import { FixedSizeList as List } from "react-window";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sendMessage, receiveMessage } from "../store/chatSlice";

const styles = stylex.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
  listWrapper: {
    flex: 1,
    overflow: "hidden",
    padding: "0 24px",
  },
  chip: {
    position: "absolute",
    bottom: "96px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: colors.lightBorder,
    color: "#fff",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    cursor: "pointer",
  }
});

export default function ChatWindow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<List>(null);
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector((s) => s.chat.selectedId);
  const messages = useAppSelector((s) => s.chat.messages[selectedId]);
  const [height, setHeight] = useState(600);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => {
      if (containerRef.current) setHeight(containerRef.current.offsetHeight);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isAtBottom && listRef.current) {
      listRef.current.scrollToItem(messages.length - 1);
    }
  }, [messages]);

  const handleSend = (text: string) => {
    dispatch(sendMessage({ chatId: selectedId, text }));
    setTimeout(() => {
      dispatch(receiveMessage({ chatId: selectedId, text: `You said: ${text}` }));
    }, 600);
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const msg = messages[index];
    return (
      <div style={{ ...style, display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
        <ChatBubble from={msg.from} text={msg.text} />
      </div>
    );
  };

  return (
    <div {...stylex.props(styles.container)}>
      <Header />
      <div ref={containerRef} {...stylex.props(styles.listWrapper)}>
        <List
          ref={listRef}
          height={height - 120}
          itemCount={messages.length}
          itemSize={64}
          width="100%"
          onScroll={({ scrollOffset, scrollUpdateWasRequested }) => {
            const listHeight = 64 * messages.length;
            if (!scrollUpdateWasRequested) {
              setIsAtBottom(scrollOffset + height >= listHeight - 120);
            }
          }}
        >
          {Row}
        </List>
        {!isAtBottom && (
          <div {...stylex.props(styles.chip)} onClick={() => listRef.current?.scrollToItem(messages.length - 1)}>
            New messages ↓
          </div>
        )}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
