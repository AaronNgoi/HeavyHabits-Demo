/** @type {import('tailwindcss').Config} */
module.exports = {

    future: {
    hoverOnlyWhenSupported: true,
  },
  
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

            boxShadow: {
        'press-orange-button': '0 2px 0 0 #A97A40',
        'press-brown-button': '0 2px 0 0 #571B09',
      },

            translate: {
        '2px': '2px',
      },
      
         colors: {
            FCE3BF:'#FCE3BF',
           'green':"#94884B",
   'green-clicked':"#A99C56",
             'red':"#995046",
     'red-clicked':"#B6685E",
           
           
        'brown': {
		       'font':'#571B09',
	         'add-button':'#A16840',
           'component': '#A97A40',
           'border': '#BB925D',
           'header-bottom': '#876233',
           'pet-bg': '#B87647',
           'button-press': '#754B2E',
          },
        'biege': {
		       'drop-down':'#EECFA0',
	         'form-colour':'#FDEFD9',
           'display':'#FCE9CA', 
           'background':'#F2DAB5',
        //    'header-bottom': '#A97A40',
          },
                   'orange': {
		       'button-click':'#F7B759',
	         'button':'#FACE8F',
          },
       },
    },
  },
  plugins: [],
}