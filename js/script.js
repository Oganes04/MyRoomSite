//=================== Маска номера телефона ============

$('input[type="tel"]').inputmask({
    "mask": "+7 (999) 999 - 99 - 99",
    "placeholder": "",
    "showMaskOnHover": false,
    "showMaskOnFocus": true
});


//=================== Анимация у checkbox ============

$(".check-label").on("click", function () {
  let isChecked = $(this).children("input").prop("checked");
  if (isChecked) {
      $(this).find(".fakecheck").addClass("checked");
  } else {
      $(this).find(".fakecheck").removeClass("checked");
  }
});


//=================== Часто задаваемые вопросы ============
  

$('.faq__item').click(function() {
    $('.faq__item-question svg').removeClass('rotate-faq');
    
    let $currentAnswer = $(this).find('.faq__item-answer');
    let $currentQuestion = $(this).find('.faq__item-question');

    if ($currentAnswer.is(':visible')) {
        $currentAnswer.slideUp();
    } else {
        $('.faq__item-answer').not($currentAnswer).slideUp();
    
        $currentAnswer.slideDown();
        $currentQuestion.find('svg').addClass('rotate-faq');
    }
});



//=================== Слайдер с клиентами ============

let clientSwiper = new Swiper(".clientSwiper", {
  slidesPerView: 4,
  speed: 600,
  spaceBetween: 30,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    640: {
      // При ширине ≥ 640px применяются настройки по умолчанию (уже указаны выше)
    },
    // При ширине < 640px
    0: {
      effect: 'slide',
      centeredSlides: false,
      coverflowEffect: null,
      slidesPerView: 1,
      spaceBetween: 16,
    }
  }
});



$('.clients__item').click(function() {
  $('.clients__item.open').removeClass('open');
  $('.clients__item>svg').removeClass('rotate');
  $(this).addClass('open');
  $(this).find('svg').addClass('rotate');
});


//=================== Popup окна ============

const lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    duration: 1.2,
    wheelMultiplier: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function openPopup(popup) {
    lenis.stop();
    $('.popup').fadeOut();
    $('.overlay').fadeIn();
    $('html').css('overflow', 'hidden');
    popup.fadeIn();
}
  
function closePopup(closeBtn) {
    lenis.start();
    $('.overlay').fadeOut();
    closeBtn.parent().fadeOut();
    $('html').css('overflow-y', 'auto');
}

$(document).on('click', '.popup_close', function(e) {
  closePopup($(this));
});


$(document).ready(function() {
    $(document).mouseup(function(e) {
        var container = $('.popup');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            lenis.start();
            container.fadeOut();
            $('.overlay').fadeOut();
            $('html').css('overflow-y', 'auto');
        }
    });
  
  
    $(document).on('keydown', function(e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        lenis.start();
        $('.popup').fadeOut();
        $('.overlay').fadeOut();
        $('html').css('overflow-y', 'auto');
      }
    });
});
  



$(".question-popup-btn").click(function() {
  openPopup($(".question-popup"));
});

$(".try-popup-btn").click(function() {
  openPopup($(".try-popup"));
  let popupType = $(this).data("popup-type");
  console.log(popupType);
  $(".try-popup").attr("data-popup-type", popupType);
});






//=================== Анимация бегущей строки ============

$(function() {
    $('.marquee-1').marquee({
        duration: 23000,
        startVisible: true,
        duplicated: true,
        direction: 'left'
    });
    
    $('.marquee-2').marquee({
        duration: 23000,
        startVisible: true,
        duplicated: true,
        direction: 'right'
    });
});



//=================== Burger меню ============

$(".burger__menu").click(function() {
  $(this).toggleClass('open');
  $('html').toggleClass('hidden');

  if ($(this).hasClass('open')) {
    lenis.stop();
  } else {
      lenis.start();
  }
});





// $(document).ready(function () { 
//   $(".try-popup form").on("submit", function (e) { 
//       e.preventDefault(); 

//       // Получаем данные из формы 
//       let popupType = $(this).parent().data("popup-type");
//       let name = $('.try-popup form .name').val().trim(); 
//       let phone = $('.try-popup form .phone').val().trim(); 

//       // Разделяем имя на firstName и lastName 
//       let [firstName, lastName = ""] = name.split(' '); 

//       if (!firstName || !phone) { 
//           console.log("Ошибка: Имя и телефон обязательны для заполнения."); 
//           return; 
//       } 

//       // Формируем тело запроса для создания контакта 
//       let contactRequestBody = { 
//           lastName: lastName, 
//           firstName: firstName,  
//           // emails: [], 
//           phones: [phone], // Телефон 
//       }; 

//       console.log("Request Body (Contact):", contactRequestBody); 

//       // Запрос на создание контакта 
//       fetch("https://api.weeek.net/public/v1/crm/contacts", { 
//           method: "POST", 
//           headers: { 
//               "Content-Type": "application/json", 
//               "Authorization": "Bearer fb2bce57-885c-44c1-9cfd-a5d807d473e3" 
//           }, 
//           body: JSON.stringify(contactRequestBody) 
//       }) 
//       .then(response => { 
//           if (!response.ok) { 
//               return response.json().then(err => { 
//                   throw new Error(`Ошибка создания контакта: ${JSON.stringify(err)}`); 
//               }); 
//           } 
//           return response.json(); 
//       }) 
//       .then(data => { 
//           console.log("Контакт успешно создан:", data); 

//           const contactId = data.contact.id; // Получаем ID созданного контакта 

//           // Формируем тело запроса для создания сделки 
//           let dealRequestBody = { 
//               title: "Заявка с сайта. " + popupType, // Название сделки 
//               contacts: [contactId], // ID контакта 
//               tags: [], // Теги 
//               customFields: {} // Дополнительные поля 
//           }; 

//           console.log("Request Body (Deal):", dealRequestBody); 

//           // Запрос на создание сделки 
//           return fetch("https://api.weeek.net/public/v1/crm/statuses/bK1Ju2xaMsF2Ivdj/deals", { 
//               method: "POST", 
//               headers: { 
//                   "Content-Type": "application/json", 
//                   "Authorization": "Bearer fb2bce57-885c-44c1-9cfd-a5d807d473e3" 
//               }, 
//               body: JSON.stringify(dealRequestBody) 
//           }); 
//       }) 
//       .then(response => { 
//           if (!response.ok) { 
//               return response.json().then(err => { 
//                   throw new Error(`Ошибка создания сделки: ${JSON.stringify(err)}`); 
//               }); 
//           } 
//           return response.json(); 
//       }) 
//       .then(data => { 
//           console.log("Сделка успешно создана:", data); 
//       }) 
//       .catch(async (error) => { 
//           if (error instanceof Response) { 
//               const errorDetails = await error.json(); 
//               console.error("Ошибка сервера:", errorDetails); 
//           } else { 
//               console.error("Ошибка:", error); 
//           } 
//       }); 
//   }); 
// });

