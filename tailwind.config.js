/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      margin: {
        '1px': '1px',
        '44px': '35px'
      },

      borderRadius: {
      '22px': '22px',
      '19px': '19px',
    },

      inset: {
        '-3.5': '-14px',
      },
      
      width: {
        '11': '11px',
        '13': '13px',
      },
      height: {
        '11': '11px',
        '13': '13px',
        '44': '44px',
        '108': '108px',
      },      

      fontSize: {
        '9': '9px',
        '10': '10px',
        '11': '11px',
      },

      
         colors: {
          FCE3BF:'#FCE3BF',
          FACE8F:'#FACE8F',
         'green':"#94884B",
           'red':"#995046",
        'brown': {
		       'font':'#571B09',
	         'add-button':'#A16840',
           'component': '#A97A40',
           'border': '#BB925D',
           'header-bottom': '#876233',
           'pet-bg': '#B87647',
          },
        'biege': {
		       'drop-down':'#EECFA0',
	         'form-colour':'#FDEFD9',
           'display':'#FCE9CA', 
           'background':'#F2DAB5',
        //    'header-bottom': '#A97A40',
          },
       },
    },
  },
  plugins: [],
}