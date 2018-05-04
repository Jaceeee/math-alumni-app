/**
  Functions used for redirection and printing
**/

export const porter_endpoint = 'https://baggage-loading-system.herokuapp.com/api/porter';
export const passenger_endpoint = 'https://baggage-loading-system.herokuapp.com/api/passenger';
export const loading_bay_endpoint = 'https://baggage-loading-system.herokuapp.com/api/loading-bay/';
export const login_endpoint = 'https://baggage-loading-system.herokuapp.com/api/staff/login';

export const userName = 'cmsc131';
export const password = 'Dh0ngFh3l';

export const o_enum = (() =>  {
  return {
    LOGIN: -2,
    HOME: -1,
    SUCCESSPASS: 0,
    ADDPASS: 1,
    VIEWPORTS: 2,
    SUCCESSPORT: 3,
    ADDPORT: 4,
    VIEWPASS: 5,
    SEARCHPASS: 6,
    EDITPASS: 7,
    SUCCEDIT: 8
  };
})();

export function imgToPrint (candidates) {  
  const names = candidates.map((candidate) => 
    `<li><b>${candidate.name}</b> Username: ${candidate.userName}, Password: ${candidate.password}</li>\n`)
  return '<html><head><script>function step1() {\n' +
      'setTimeout("step2()", 10);}\n' +
      'function step2(){window.print(); window.close()}\n' + //eslint-disable-next-line
      '</scri' + 'pt><link rel="stylesheet" type = "text/css" >\n' + //eslint-disable-next-line
      '</head>\n' + '<body style="font-family: \'Montserrat\';" onload = "step1()">\n' +            
      '<ul>' + names + '</ul>' +
      '</body></html>';
}

export function printImg(candidates) {
  const pwa = window.open("about:blank", "_new");
  pwa.document.open();
  pwa.document.write(imgToPrint(candidates));
  pwa.document.close();
}
