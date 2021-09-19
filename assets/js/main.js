/**
* Template Name: Laura - v4.4.0
* Template URL: https://bootstrapmade.com/laura-free-creative-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
const $ =document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }
  
  /**
   * Testimonials slider
   */
  // new Swiper('.testimonials-slider', {
  //   speed: 600,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   slidesPerView: 'auto',
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   }
  // });

  
    


  

})()
/**-------------------------form sunmit--------------------- */
// Gửi dữ liệu của user từ form lên GG sheet
$('#form-1').onsubmit = function(e){
  e.preventDefault();
  // truy cập vào spacer
  let spacer = $('.spacer')
  spacer.innerText = '';
  //b1 TRUY CẬP VÀO TỪNG THÀNH PHẦN HTML TƯONG ỨNG
  let fullNamein = $('input[name="fullname"]')
  let emailin = $('input[name="email"]')
  let subjectin = $('input[name="subject"]')
  let messagein = $('textarea[name="message"]')
  
  //b2 lấy value người dùng nhập vào
  let fullName = fullNamein.value;
  let email = emailin.value;
  let subject = subjectin.value;
  let message = messagein.value;
  
  
  //validator form
  
  //reset thông báo
  let formMesseges = $$('.form-message');
  if(formMesseges.length>0){
      formMesseges.forEach(function(item){
        item.innerText = '';
      })
  }
  console.log(fullName)

  let errors = {};
  if(fullName.trim()==''){
      errors['fullname'] = 'Name cannot be left blank'
      fullNamein.parentElement.querySelector('.form-message').innerText = errors['fullname'];
      //từ thẻ con input lên thẻ cha sau đó select ngược xuống
  }
  if(email.trim()==''){
      errors['email'] = 'Email cannot be left blank'
      emailin.parentElement.querySelector('.form-message').innerText = errors['email'];

  }
  if(subject.trim()==''){
      errors['subject'] = 'Please enter subject'
      subjectin.parentElement.querySelector('.form-message').innerText = errors['subject'];

  }
  if(message.trim()==''){
    errors['message'] = 'Enter the text of the message before sending'
    messagein.parentElement.querySelector('.form-message').innerText = errors['message'];

}
  //nếu TH không bị lỗi, check object errors xem nó có data không
  if(Object.keys(errors).length==0){
      //không có lỗi gì thì lấy dữ liệu gửi lên GG Sheet
      let data = {
          'entry.4437769': fullName,
          'entry.429496769': email,
          'entry.1964049889': subject, 
          'entry.1979229409': message
      }
      let queryString = new URLSearchParams(data);
      queryString = queryString.toString();
     
      
      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSe3F4ieWvmG4-WNuOG4a8nQ3V27yScMztlvw6X5fPwmb2PdUw/formResponse', true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

     
      //gửi một message đến user khi họ thực hiện thành công
      alert(`Thank you ${fullName} for contacting, you've done it successfully`)

      //reset field sau khi gửi xong
      fullNamein.value = '';
      emailin.value = '';
     subjectin.value = '';
      messagein.value='';

      xhr.send(queryString);
  }else{
      spacer.innerHTML = '<div class="elert elert-danger text-center">Only accepted when full information is entered</div>'
  }
 
  
}