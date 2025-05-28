// @ts-ignore
import React from 'react';

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSelectedId } from "../store/chatSlice";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../../tokens.stylex";

const styles = stylex.create({
  sidebar: {
    width: "240px",
    backgroundColor: "#fff",
    borderRight: `1px solid ${colors.lightBorder}`,
    display: "flex",
    flexDirection: "column",
  },
  chatList: {
    flex: 1,
    overflowY: "auto",
  },
  item: {
    padding: "12px 16px",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#eee",
    },
  },
  selected: {
    fontWeight: "bold",
    backgroundColor: "#ddd",
  },
});

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector((state) => state.chat.selectedId);
  const chatItems = Array.from({ length: 30 }, (_, i) => ({ id: `chat-${i + 1}`, title: `Chat ${i + 1}` }));

  return (
    <div {...stylex.props(styles.sidebar)}>
      <div {...stylex.props(styles.chatList)}>
        {chatItems.map((chat) => (
          <div
            key={chat.id}
            {...stylex.props(styles.item, selectedId === chat.id && styles.selected)}
            onClick={() => dispatch(setSelectedId(chat.id))}
          >
            {chat.title}
          </div>
        ))}
      </div>
    </div>
  );
}
