// @ts-ignore
import React from 'react';

import * as stylex from "@stylexjs/stylex";
import { colors } from "../../tokens.stylex";

const styles = stylex.create({
  bubble: (from: "user" | "assistant") => ({
    maxWidth: "75ch",
    padding: "10px 14px",
    margin: "8px 0",
    borderRadius: "14px",
    backgroundColor: from === "user" ? colors.userBubble : colors.assistantBubble,
    alignSelf: from === "user" ? "flex-end" : "flex-start",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  }),
});

export default function ChatBubble({ text, from }: { text: string; from: "user" | "assistant" }) {
  return <div {...stylex.props(styles.bubble(from))}>{text}</div>;
}
