import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  from: "user" | "assistant";
  text: string;
}

interface ChatState {
  selectedId: string;
  isSidebarOpen: boolean;
  messages: Record<string, Message[]>;
}

const initialState: ChatState = {
  selectedId: "chat-1",
  isSidebarOpen: true,
  messages: { "chat-1": [] },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
      if (!state.messages[action.payload]) {
        state.messages[action.payload] = [];
      }
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    sendMessage(state, action: PayloadAction<{ chatId: string; text: string }>) {
      const { chatId, text } = action.payload;
      state.messages[chatId].push({ from: "user", text });
    },
    receiveMessage(state, action: PayloadAction<{ chatId: string; text: string }>) {
      const { chatId, text } = action.payload;
      state.messages[chatId].push({ from: "assistant", text });
    },
  },
});

export const { setSelectedId, toggleSidebar, sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
