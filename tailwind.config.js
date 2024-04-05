/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 16 row grid
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridTemplateCols: {
        // Simple 16 row grid
        '16': 'repeat(16, minmax(0, 1fr))',
         'layout': '200px minmax(900px, 1fr) 100px',
      }
    },
    fontSize: {
      'textBody': '0.8rem',
      'objectx': '0.8rem',
      'bodyx': '0.8rem',
      'exemplevaluex': '0.8rem',
      'modelx': '0.9rem',
      'descriptionx': '0.8rem',
      'examplejson': '0.9rem',
      'Parametercontent': '0.9rem',
      'valuemodel':'0.8rem',
    },
  },
  plugins: [],
}

