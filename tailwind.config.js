/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

// npx tailwindcss -i ./src/assets/base.css -o ./src/assets/main.css --watch
