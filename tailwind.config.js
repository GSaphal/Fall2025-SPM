// tailwind.config.js
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        container: {
          center: true,   
        },
        colors:{
            primary:"#75bb75"
        }
     
      },
    },
    plugins: [],
  }