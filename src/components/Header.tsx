// @ts-ignore
import React from 'react';

import * as stylex from "@stylexjs/stylex";
import { colors } from "../../tokens.stylex";

const styles = stylex.create({
  header: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "12px 16px",
    borderBottom: `1px solid ${colors.lightBorder}`,
  },
  shareBtn: {
    backgroundColor: "#eee",
    border: `1px solid ${colors.lightBorder}`,
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
});

export default function Header() {
  return (
    <div {...stylex.props(styles.header)}>
      <button {...stylex.props(styles.shareBtn)}>🔗 Share Chat</button>
    </div>
  );
}
