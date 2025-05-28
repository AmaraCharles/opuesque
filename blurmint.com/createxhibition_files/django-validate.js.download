function getCSRFCookie() {
    let name = "csrftoken=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
      c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
      }
    }
    return "";
}

  let init_csrf_cookie =  getCSRFCookie()
  let page_forms = document.getElementsByTagName('form')
  for(const key in page_forms){
    if (page_forms[key].id !== undefined){
      page_forms[key].addEventListener('submit', (event) => {
        let curr_csrf_cookie = getCSRFCookie()
        if(init_csrf_cookie != curr_csrf_cookie){
          event.preventDefault();
          location.reload();
        }
      });
    }
  }