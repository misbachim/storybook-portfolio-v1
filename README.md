# 🎨 Misbach's Portfolio

A modern, interactive portfolio website built with React showcasing my projects, skills, and experience.

## ✨ Features

- 🌙 **Dark/Light Theme Toggle** - Switch between themes with a beautiful light switch animation
- 🌤️ **Weather Widget** - Real-time weather information with clock
- 💬 **Interactive Chat** - Engaging conversation interface with typewriter effect
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- ⚡ **Progressive Web App** - Installable and works offline
- 🎭 **Story Mode** - Interactive storytelling experience
- 🎨 **Modern UI** - Clean and professional design with smooth animations

## 🚀 Live Demo

Visit the live website: [https://storybook-portfolio-v1.vercel.app/](https://storybook-portfolio-v1.vercel.app/)

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **State Management:** Redux Toolkit
- **Styling:** Styled Components + PaperCSS
- **Icons:** React Icons
- **Build Tool:** Create React App
- **Deployment:** Vercel
- **Package Manager:** Yarn

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/misbachim/storybook-portfolio-v1.git
   cd storybook-portfolio-v1
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Runs the app in development mode |
| `yarn build` | Builds the app for production |
| `yarn test` | Launches the test runner |
| `yarn eject` | Ejects from Create React App |

## 🏗️ Project Structure

```
src/
├── app/                    # Redux store and browser storage
├── components/             # Reusable UI components
│   ├── background/         # Background component
│   └── Switch/            # Theme toggle switch
├── features/              # Redux slices
│   └── story/             # Story state management
├── hooks/                 # Custom React hooks
├── pages/                 # Page components
│   ├── component/         # Chat and typewriter components
│   ├── Main/             # Main portfolio page
│   └── Weather/          # Weather widget components
├── resources/             # Static data and assets
└── App.js                 # Main application component
```

## 🎯 Key Components

### Theme Toggle
- Beautiful light switch animation
- Persistent theme preference
- Smooth transitions

### Weather Widget
- Real-time weather data
- Clock with current time
- Forecast information

### Interactive Chat
- Typewriter effect
- Dynamic responses
- Engaging user experience

### Story Mode
- Interactive storytelling
- State management with Redux
- Local storage persistence

## 🌐 Deployment

This project is deployed on **Vercel** with the following configuration:

- **Build Command:** `yarn build`
- **Output Directory:** `build`
- **Install Command:** `yarn install`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for any environment-specific variables.

### Vercel Configuration
The `vercel.json` file contains routing configuration for proper SPA behavior.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Misbach Isron Meitirto**
- Email: misbachim@gmail.com
- GitHub: [@misbachim](https://github.com/misbachim)

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) for the development setup
- [Vercel](https://vercel.com/) for hosting and deployment
- [React Icons](https://react-icons.github.io/react-icons/) for beautiful icons
- [Styled Components](https://styled-components.com/) for component styling

---

⭐ If you found this project helpful, please give it a star!
