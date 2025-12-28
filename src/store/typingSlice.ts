import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  calculateAccuracy,
  calculateCPM,
  calculateWPM,
} from "../utils/calculations";
import { Difficulty, generateParagraph } from "../utils/textGenerator";

export interface TypingStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}

export interface TypingSettings {
  duration: number; // in seconds
  difficulty: Difficulty;
}

export interface TypingState {
  text: string;
  userInput: string;
  currentIndex: number;
  timeRemaining: number;
  timeElapsed: number;
  isActive: boolean;
  isComplete: boolean;
  stats: TypingStats;
  settings: TypingSettings;
  charStatuses: ("correct" | "incorrect" | "pending")[];
}

const initialSettings: TypingSettings = {
  duration: 60,
  difficulty: "medium",
};

function createInitialState(): TypingState {
  const text = generateParagraph(initialSettings.difficulty);
  return {
    text,
    userInput: "",
    currentIndex: 0,
    timeRemaining: initialSettings.duration,
    timeElapsed: 0,
    isActive: false,
    isComplete: false,
    stats: {
      wpm: 0,
      cpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
    },
    settings: initialSettings,
    charStatuses: new Array(text.length).fill("pending"),
  };
}

const initialState: TypingState = createInitialState();

const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    startTest(state) {
      state.isActive = true;
    },

    typeCharacter(state, action: PayloadAction<string>) {
      if (state.isComplete || state.currentIndex >= state.text.length) return;

      const expectedChar = state.text[state.currentIndex];
      const typedChar = action.payload;

      state.userInput += typedChar;
      state.stats.totalChars++;

      if (typedChar === expectedChar) {
        state.charStatuses[state.currentIndex] = "correct";
        state.stats.correctChars++;
      } else {
        state.charStatuses[state.currentIndex] = "incorrect";
        state.stats.incorrectChars++;
      }

      state.currentIndex++;

      // Update stats
      if (state.timeElapsed > 0) {
        state.stats.wpm = calculateWPM(
          state.stats.correctChars,
          state.timeElapsed,
        );
        state.stats.cpm = calculateCPM(
          state.stats.totalChars,
          state.timeElapsed,
        );
      }
      state.stats.accuracy = calculateAccuracy(
        state.stats.correctChars,
        state.stats.totalChars,
      );

      // Check if test is complete (all text typed)
      if (state.currentIndex >= state.text.length) {
        state.isComplete = true;
        state.isActive = false;
      }
    },

    deleteCharacter(state) {
      if (state.currentIndex === 0 || state.isComplete) return;

      state.currentIndex--;
      const deletedStatus = state.charStatuses[state.currentIndex];
      state.charStatuses[state.currentIndex] = "pending";
      state.userInput = state.userInput.slice(0, -1);

      // Adjust stats
      state.stats.totalChars--;
      if (deletedStatus === "correct") {
        state.stats.correctChars--;
      } else if (deletedStatus === "incorrect") {
        state.stats.incorrectChars--;
      }

      // Recalculate stats
      if (state.timeElapsed > 0) {
        state.stats.wpm = calculateWPM(
          state.stats.correctChars,
          state.timeElapsed,
        );
        state.stats.cpm = calculateCPM(
          state.stats.totalChars,
          state.timeElapsed,
        );
      }
      state.stats.accuracy =
        state.stats.totalChars > 0
          ? calculateAccuracy(state.stats.correctChars, state.stats.totalChars)
          : 100;
    },

    tick(state) {
      if (!state.isActive || state.isComplete) return;

      state.timeRemaining--;
      state.timeElapsed++;

      // Update WPM and CPM on each tick
      if (state.stats.totalChars > 0) {
        state.stats.wpm = calculateWPM(
          state.stats.correctChars,
          state.timeElapsed,
        );
        state.stats.cpm = calculateCPM(
          state.stats.totalChars,
          state.timeElapsed,
        );
      }

      if (state.timeRemaining <= 0) {
        state.isComplete = true;
        state.isActive = false;
      }
    },

    setDuration(state, action: PayloadAction<number>) {
      state.settings.duration = action.payload;
      state.timeRemaining = action.payload;
    },

    setDifficulty(state, action: PayloadAction<Difficulty>) {
      state.settings.difficulty = action.payload;
    },

    resetTest(state) {
      const newText = generateParagraph(state.settings.difficulty);
      state.text = newText;
      state.userInput = "";
      state.currentIndex = 0;
      state.timeRemaining = state.settings.duration;
      state.timeElapsed = 0;
      state.isActive = false;
      state.isComplete = false;
      state.stats = {
        wpm: 0,
        cpm: 0,
        accuracy: 100,
        correctChars: 0,
        incorrectChars: 0,
        totalChars: 0,
      };
      state.charStatuses = new Array(newText.length).fill("pending");
    },
  },
});

export const {
  startTest,
  typeCharacter,
  deleteCharacter,
  tick,
  setDuration,
  setDifficulty,
  resetTest,
} = typingSlice.actions;

export const actions = typingSlice.actions;

export default typingSlice.reducer;
