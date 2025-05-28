// @ts-ignore
import React from 'react';

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { toggleSidebar } from "./store/chatSlice";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";


const styles = stylex.create({
  root: {
    display: "flex",
    height: "100vh",
    backgroundColor: colors.lightBackground,
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  },
  toggle: {
    display: "none",
    position: "absolute",
    top: "12px",
    left: "12px",
    zIndex: 50,
    backgroundColor: colors.lightBorder,
    padding: "6px 10px",
    borderRadius: "6px",
    "@media (max-width: 768px)": {
      display: "block",
    },
  },
});

export default function App() {
  const isSidebarOpen = useAppSelector((state) => state.chat.isSidebarOpen);
  const dispatch = useAppDispatch();

  return (
    <div {...stylex.props(styles.root)}>
      <button onClick={() => dispatch(toggleSidebar())} {...stylex.props(styles.toggle)}>☰</button>
      {isSidebarOpen && <Sidebar />}
      <main {...stylex.props(styles.main)}>
        <ChatWindow />
      </main>
    </div>
  );
}
