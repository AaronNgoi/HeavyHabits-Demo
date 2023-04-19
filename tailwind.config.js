/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
         colors: {
          FCE3BF:'#FCE3BF',
         'green':"#94884B",
           'red':"#995046",
        'brown': {
		       'font':'#571B09',
	         'add-button':'#A16840',
           'header-bottom': '#A97A40',
           'border': '#BB925D',
          },
        'biege': {
		       'drop-down':'#EECFA0',
	         'form-colour':'#FDEFD9',
        //    'header-bottom': '#A97A40',
          },
       },
    },
  },
  plugins: [],
}