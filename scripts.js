const API_URL = 'https://apis.is/company?name=';

document.addEventListener('DOMContentLoaded', function () {
  const comp = document.querySelector('.companies');
  program.init(comp);
  debugger;
});


/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */

const program = (() => {
  let companiesSection;
  let container;

  function init(_companies) {
    companiesSection = _companies;

    container.companiesSection.querySelector('.results');

    form = companiesSection.querySelector('form');
    form.addEventListener('submit',getData());

  }

  function getData(){
    fetch(API_URL)
      .then(response => {
        if(!response.ok){
          throw Error("Villa");
        }
        return response.jason();
      })
      .then(jsonResponse => {
        show(jsonResponse);
      })
      .catch(e => console.error("Þú fékkst villu", err));

  }

  function show(data){
    debugger;


  }

  function el(name, ...children) {
    const element = document.createElement(name);
    for (const child of children) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    }
    return element;
  }

  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  return {
    init,
  };
})();

