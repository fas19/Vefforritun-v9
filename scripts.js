const API_URL = 'https://apis.is/company?name=';
document.addEventListener('DOMContentLoaded', function () {
  const comp = document.querySelector('.companies');
  program.init(comp);

});


/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */

const program = (() => {
  let companiesSection;
  let container;
  let form;

  function init(_companies) {
    companiesSection = _companies;


    container = companiesSection.querySelector('.results');

    form = companiesSection.querySelector('form');
    form.addEventListener('submit', onSubmit);

  }
  function onSubmit(e) {
    e.preventDefault();
    const text = e.target.querySelector('input').value;
    if (text.length === 0) {
      empty(container);
      displayError('Fyrirtæki verður að vera strengur.');
    } else {
      displayLoading();
      getData(text);
    }
  }

  function getData(data) {
    fetch(API_URL + data)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(jsonResponse => {
        show(jsonResponse);
      })
      .catch(() => {
        displayError("Villa við að sækja gögn.");
      })



  }

  function show(data) {
    if (data.results.length == 0) {
      displayError('Fann ekkert fyrirtæki');
      return;
    }
    results = data.results;
    empty(container);
    for (const result of results) {
      const active = parseInt(result.active);

      if (active == 0) {
        const div = el('div',
          el('dl',
            el('dt', "Nafn"),
            el('dd', "" + result.name),
            el('dt', "Kennitala"),
            el('dd', "" + result.sn),
          )
        )
        div.classList.add("company");
        div.classList.add("company--inactive");
        container.appendChild(div);
      }
      else {
        const div = el('div',
          el('dl',
            el('dt', "Nafn"),
            el('dd', "" + result.name),
            el('dt', "Kennitala"),
            el('dd', "" + result.sn),
            el('dt', "Heimilisfang"),
            el('dd', "" + result.address),
          )
        )
        div.classList.add("company");
        div.classList.add("company--active");
        container.appendChild(div);

      }

    }
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

  function displayError(error) {
    empty(container);
    const div = el('div',
      el('dl',
        el('dd', "" + error),
      )
    )
    container.appendChild(div);

  }

  function displayLoading() {
    empty(container);
    const div = el('div',
      el('img'),
      el('p', "Leita að fyrirtækjum...")
    )
    div.classList.add("loading");
    div.firstChild.setAttribute("src", "../loading.gif");

    container.append(div);

  }

  return {
    init,
  };
})();

