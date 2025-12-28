<div align="center">

# ⌨️ TypeMaster

### A Modern Typing Speed Test Application

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

_Test your typing speed and accuracy with a beautifully designed, feature-rich typing test._

</div>

---

## ✨ Features

| Feature                   | Description                                 |
| ------------------------- | ------------------------------------------- |
| ⚡ **Real-time Stats**    | Live WPM, CPM, and accuracy tracking        |
| ⏱️ **Multiple Durations** | Choose 15s, 30s, 1min, or 2min tests        |
| 🎯 **Difficulty Levels**  | Easy, Medium, and Hard word pools           |
| 🎨 **Modern UI**          | Glassmorphism design with aurora background |
| 💾 **Score History**      | Automatic local storage of high scores      |
| 📱 **Responsive**         | Works on desktop, tablet, and mobile        |
| ⌨️ **Keyboard Shortcuts** | Tab + Enter to restart quickly              |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/typing-speed-test.git

# Navigate to project
cd typing-speed-test

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🎮 How to Play

1. **Select Settings** — Choose your preferred duration and difficulty
2. **Start Typing** — Click the input field and start typing
3. **Watch Your Progress** — Real-time stats update as you type
4. **View Results** — See your final score when time runs out
5. **Try Again** — Press `Tab` + `Enter` or click Restart

---

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **State Management**: Redux Toolkit with typed hooks
- **Styling**: Custom CSS with CSS Variables & Glassmorphism
- **Build Tool**: Vite 7
- **Fonts**: Inter & JetBrains Mono

---

## 📁 Project Structure

```
src/
├── components/          # React UI components
│   ├── Content.tsx      # Text display with character highlighting
│   ├── Header.tsx       # App header with branding
│   ├── ResultsModal.tsx # End-of-test results popup
│   ├── SettingsPanel.tsx# Duration & difficulty selectors
│   ├── StatsPanel.tsx   # Live statistics display
│   └── TextInput.tsx    # Typing input field
├── store/               # Redux state management
│   ├── hooks.ts         # Typed useSelector/useDispatch
│   ├── store.ts         # Redux store configuration
│   └── typingSlice.ts   # Typing test state & actions
├── utils/               # Helper functions
│   ├── calculations.ts  # WPM, CPM, accuracy formulas
│   ├── localStorage.ts  # High score persistence
│   └── textGenerator.ts # Random text generation
├── App.tsx              # Main application component
├── index.css            # Global styles & design system
└── main.tsx             # React entry point
```

---

## 📊 Scoring System

| WPM Range | Rating             |
| --------- | ------------------ |
| 80+       | 🏆 Expert          |
| 60-79     | ⚡ Advanced        |
| 40-59     | 👍 Intermediate    |
| 25-39     | 📝 Beginner        |
| < 25      | 💪 Keep Practicing |

> **Note**: WPM is calculated using the standard formula where 5 characters = 1 word.

---

## 🎨 Design Features

- **Aurora Background** — Stunning northern lights backdrop
- **Glassmorphism** — Frosted glass effect on cards
- **Smooth Animations** — Fade-in, bounce, and pulse effects
- **Color-coded Feedback** — Green for correct, red for errors
- **Responsive Layout** — Adapts to any screen size

---

## ⚙️ Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---

## 📄 License

MIT License — feel free to use this project for learning or personal use.

---

<div align="center">

**Built with ❤️ using React & TypeScript**

_Happy Typing! 🚀_

</div>
