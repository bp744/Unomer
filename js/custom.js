document.addEventListener("DOMContentLoaded", function () {

  //Header Fixed //
 
    $(window).scroll(function () {
        var sticky = $('header'),
                scroll = $(window).scrollTop();
        if (scroll >= 100)
            sticky.addClass('fixed');
        else
            sticky.removeClass('fixed');
    });



let isActive = false;
$('.navbar-toggler').on('click', function() {
    if (isActive) {
        $(this).removeClass("active");
        $('body').removeClass("menu-open"); 
        $('body').css({
            'overflow': 'inherit'
        });
    } else {
        $(this).addClass("active");
        $('body').addClass("menu-open"); 
        $('body').css({
            'overflow': 'hidden'
        });
    }
    isActive = !isActive; 
});


// Dropdown Menu

    $('.dropdown-menu').on('click', function(e) {
        e.stopPropagation(); 
    });
   
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown-menu').removeClass('show'); 
        }
    });

    $('#dropdownMenuButton').on('click', function(e) {
        $('.dropdown-menu').toggleClass('show'); 
 });



  // back-top Buttton Form //

var btn = $('#back-top');
    $(window).scroll(function() {
      if ($(window).scrollTop() > 300) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
});

    btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
    });




  // Request Form //
  
    $("#requestDemoForm").submit(function (e) {
        e.preventDefault();
        if (!this.checkValidity()) {
            event.stopPropagation()
        } else {
            var name = $(this).find('input[id="requestDemoName"]').val();
            var email = $(this).find('input[id="requestDemoEmail"]').val();
            var contact_no = $(this).find('input[id="requestDemoPhoneNumber"]').val();
            var organization = $(this).find('input[id="requestDemoOrganizationName"]').val();
            var message = $(this).find('input[id="requestDemoMessage"]').val();
            var captcha = $(this).find('#g-recaptcha-response').val();
            $.ajax({
                type: 'POST',
                url: 'requestDemo',
                dataType: 'json',
                data: {'name': name, 'email': email, 'contact_no': contact_no, 'organization': organization, 'message': message, 'g-recaptcha-response': captcha},
                success: function (res) {
                    try {
                        if (res.type == 'success') {
                            $("#requestDemoErrorMessageDiv").html(res.message);
                            grecaptcha.reset(widgetId1);
                        }
                        $("#requestDemoErrorMessageDiv").html(res.message);
                    } catch (err) {
                        console.log('error occured');
                    }
                }
            });
        }
        this.classList.add('was-validated')
        return false;
    });


 
  // Parallax Effect //

if ($(window).width() > 1200) {
    gsap.registerPlugin(ScrollTrigger);
    const section = gsap.utils.toArray(".jarallax");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#wrapper",
            start: "top top",
            end: `+=${section.length * window.innerHeight}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            snap: {
                snapTo: 1 / section.length,
                duration: 1,
            }
        }
    });

    section.forEach((slide, i) => {
        const clipTarget = `#slide_${i + 1}`;
        const zIndexValue = 400 - (i * 40);

        gsap.set(clipTarget, { zIndex: zIndexValue });

        ScrollTrigger.create({
            trigger: clipTarget,
            start: "top center",
            end: "bottom top",
            scrub: true,
            onEnter: () => gsap.set(clipTarget, { zIndex: zIndexValue + 100 }),
            onLeave: () => gsap.set(clipTarget, { zIndex: zIndexValue }),
            onEnterBack: () => gsap.set(clipTarget, { zIndex: zIndexValue + 100 }),
            onLeaveBack: () => gsap.set(clipTarget, { zIndex: zIndexValue }),
        });

        if (i !== section.length - 1) {
            tl.to(clipTarget, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 0.1,
                delay: 0,
                onUpdate: () => {
                    const nextIndex = i + 1;
                    if (nextIndex < section.length && !section[nextIndex].classList.contains('active')) {
                        setTimeout(() => {
                            section[nextIndex].classList.add('active');
                        }, 400);
                    }
                }
            });
        } else {
            // ðŸŽ¯ Dummy animation to maintain timeline scroll
            tl.to(clipTarget, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 0.1
            });
        }
    });
}



 

 // Brand Slider //

$('.our-customer').owlCarousel({
    autoplay: true,
    autoplayTimeout: 2000,
    loop: true,
    margin: 30,
    dots: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,

        },
        600: {
            items: 2,
            margin: 15,

        },
        768: {
            items: 3,
            margin: 15,

        },
        1000: {
            items: 5,

        },
        1300: {
            items: 6,

        }
    }
});



         
         $(function () {
             setInterval(function () {
                 $('.brand-logo').each(function(){
                    var totalDiv = $(this).find('.brand-logos-grid').length - 1;
                     var divNumber = randomIntFromInterval(0, totalDiv);
                     var divToChangeLogo = $(this).find('.brand-logos-grid').eq(divNumber);
                     changeLogo(divToChangeLogo);
                 });
             }, 2000);
         });
         
         function randomIntFromInterval(min, max) { // min and max included 
             return Math.floor(Math.random() * (max - min + 1) + min)
         }
         
   function changeLogo(elementObj) {
        var flipDuration = 800;
        var shownLogo = $(elementObj).find('.client-logo:not(.hidden)');
        shownLogo.addClass('flip-out').on('animationend', function () {
        shownLogo.removeClass('flip-out').addClass('hidden').off('animationend');
        
        var nextLogo = shownLogo.next('.client-logo');
          if (!nextLogo.length) {
            nextLogo = $(elementObj).find('.client-logo:first');
      }
     nextLogo.removeClass('hidden').addClass('flip-in').on('animationend', function () {
      nextLogo.removeClass('flip-in').off('animationend');
    });
  });
}

         
          // Media Slider //
          
             $('.media-slider').owlCarousel({
                 autoplay: false,
                 loop: true,
                 margin: 20,
                 dots: true,
                 responsiveClass: true,
                 responsive: {
                     0: {
                         items: 1,
                         dots: true
                     },
                     600: {
                         items: 2,
                         dots: true,
                         loop: false
                     },
                     
                     767: {
                         items: 3,
                         dots: true,
                         loop: false
                     },
                     
                     1200: {
                         items: 4,
                         dots: true,
                         loop: false
                     }
                     
                 },
                  
             });
             
             
             //Festival Slider //
    if ($(window).width() > 1200) {
            $('.festival-slider').owlCarousel({
                loop: false,
                margin: 0,
                merge: true,
                dotsEach: true,
                items: 3
            });
    }
    
    
    
    // Media Slider //
          
             $('.three-item-slider').owlCarousel({
                 autoplay: false,
                 loop: true,
                 margin: 20,
                 dots: true,
                 responsiveClass: true,
                 responsive: {
                     0: {
                         items: 1,
                         dots: true
                     },
                     600: {
                         items: 2,
                         dots: true,
                         loop: false
                     },
                     
                     767: {
                         items: 3,
                         dots: true,
                         loop: false
                     },
                     
                     1200: {
                         items: 3,
                         dots: true,
                         loop: false
                     }
                     
                 },
                  
             });
    

         
});




