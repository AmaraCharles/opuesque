/*
 * show pass
 * otp input
 * delete Item 
 * check item
 * back Page
 * handle time
 * Datepicker 
 * active Suggestions
 * change value
 * touch spin
 * preloader 
 * modal click handle
 * tab slide 
 * toggle theme
 * Counter
 * Input file 
*******************************


 */
(function ($) {
  "use strict";

    /* show pass
  ------------------------------------------------------------------------------------- */
  var showPass = function () {
    $(".show-pass").on("click", function () {
      $(this).toggleClass("active");
      if ($(".password-field").attr("type") == "password") {
        $(".password-field").attr("type", "text");
      } else if ($(".password-field").attr("type") == "text") {
        $(".password-field").attr("type", "password");
      }
    });

    $(".show-pass2").on("click", function () {
      $(this).toggleClass("active");
      if ($(".password-field2").attr("type") == "password") {
        $(".password-field2").attr("type", "text");
      } else if ($(".password-field2").attr("type") == "text") {
        $(".password-field2").attr("type", "password");
      }
    });
  };

   /* otp input
  ------------------------------------------------------------------------------------- */
  var otpInput = function () {
    if ($(".digit-group").length > 0) {
      $(".digit-group")
        .find("input")
        .each(function () {
          $(this).attr("maxlength", 1);
          $(this).on("keyup", function (e) {
            var valNum = $(this).val();
            var parent = $($(this).parent());

            if (e.keyCode === 8 || e.keyCode === 37) {
              var prev = parent.find("input#" + $(this).data("previous"));

              if (prev.length) {
                $(prev).select();
              }
            } else if (
              (e.keyCode >= 48 && e.keyCode <= 57) ||
              (e.keyCode >= 65 && e.keyCode <= 90) ||
              (e.keyCode >= 96 && e.keyCode <= 105) ||
              e.keyCode === 39
            ) {
              var next = parent.find("input#" + $(this).data("next"));
              if (!$.isNumeric(valNum)) {
                $(this).val("");
                return false;
              }

              if (next.length) {
                $(next).select();
              } else {
                if (parent.data("autosubmit")) {
                  parent.submit();
                }
              }
            }
          });
        });
    }
  };


  /* delete Item 
  ------------------------------------------------------------------------------------- */
  var delItem = function () {
    if ($("div").hasClass("delete-item")) {
      $(".btn-del").on("click", function () {
        this.closest(".delete-item").remove();
      });
    }
  };
  /* check item
  -------------------------------------------------------------------------------- */
  var resetCheck = function () {
    $(".btn-reset").click(function () {
      $("input").prop("checked", false);
    });
  };

  /* back Page
  ------------------------------------------------------------------------------------- */
  var backPage = function () {
    $(".back-btn").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      window.history.go(-1);
    });
  };

 
  /* handle time
  ------------------------------------------------------------------------------------- */
  var handleTime = function () {
    var currentTime = new Date();
    var hours = currentTime.getHours() >= 12 ? "PM" : "AM";
    var realTime =
      (currentTime.getHours() % 12) +
      "." +
      currentTime.getMinutes() +
      " " +
      hours;
    $(".val-time").text(realTime);
  };

  /* Datepicker  
  -------------------------------------------------------------------------------------*/
  var datePicker = function () {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if ($("#datepicker1").length > 0) {
      $("#datepicker1").datepicker({
        firstDay: 1,
        dateFormat: "dd/mm/yy,",
        autoclose: true,
      });
      $("#datepicker1").datepicker("setDate", today);
    }
    if ($("#datepicker2").length > 0) {
      $("#datepicker2").datepicker({
        firstDay: 1,
        dateFormat: "dd/mm/yy",
      });
      $("#datepicker2").datepicker("setDate", today);
    }
    if ($("#datepicker3").length > 0) {
      $("#datepicker3").datepicker({
        firstDay: 1,
        dateFormat: "dd/mm/yy",
      });
      $("#datepicker3").datepicker("setDate", today);
    }
  };

  /* active Suggestions
  ------------------------------------------------------------------------------------- */
  var activeSuggest = function () {
    if ($(".check-list").length > 0) {
      $(".item").on("click", function () {
        $(this)
          .parents(".check-list")
          .find(".item.active")
          .removeClass("active");
        $(this).addClass("active");
      });
    }

    $(".act-suggest").click(function () {
      $(".act-suggest.active").removeClass("active");
      $(this).toggleClass("active");
    });
    $(".act-suggest2").click(function () {
      $(".act-suggest2.active").removeClass("active");
      $(this).toggleClass("active");
    });
    $(".act-suggest3").click(function () {
      $(".act-suggest3.active").removeClass("active");
      $(this).toggleClass("active");
    });
    $(".press-toggle").on("click", function () {
      $(this).toggleClass("active");
    });
  };

  if ($(".nice-select").length > 0) {
    $(".select_js").niceSelect();
  }
  /* change value
  ------------------------------------------------------------------------------------- */
  var changeValue = function () {
    $(".language-val").click(function () {
      $(".text-val-language").text($(this).text());
    });

    $(".val-drop").click(function (event) {
      $(".text-val-drop").text($(this).find(".title-drop").text());
      $(".desc-val-drop").text($(this).find(".desc-drop").text());
    });

    $(".val-drop-form").click(function (event) {
      $(".text-val-form").text($(this).find(".title-form").text());
    });
  };
  /* toggle theme
  ------------------------------------------------------------------------------------- */
  var toggleTheme = function () {
    $("body").toggleClass(localStorage.toggled);
    var toggle = $(".toggle-theme");

    toggle.on("click", function () {
      if (localStorage.toggled != "dark-theme") {
        $("body").toggleClass("dark-theme", true);
        localStorage.toggled = "dark-theme";
        toggle.prop("checked", true);
      } else {
        $("body").toggleClass("dark-theme", false);
        localStorage.toggled = "";
        toggle.prop("checked", false);
      }
    });
    if (localStorage.toggled === "dark-theme") {
      $("body").toggleClass("dark-theme", true);
      toggle.prop("checked", true);
    }
  };

  /* touch spin
  ----------------------------------------------------------------------------------------- */
  var touchSpin = function () {
    if ($(".stepper").length > 0) {
      $(".stepper").TouchSpin();
    }
  };

  /* preloader 
  ------------------------------------------------------------------------------------- */
  var preloader = function () {
    setTimeout(function () {
      $(".preload").fadeOut("slow", function () {
        $(this).remove();
      });
    }, 200);
  };

  /* modal click handle
  ------------------------------------------------------------------------------------- */
  var clickModalSecond = function () {
    $(".btn-choose-page").click(function () {
      $("#modalPage").modal("show");
    });
    $(".btn-choose-component").click(function () {
      $("#modalComponent").modal("show");
    });
  };

  /* Counter
  -------------------------------------------------------------------------------------*/
  var flatCounter = function () {
    if ($(document.body).hasClass("counter-scroll")) {
      var a = 0;
      $(window).scroll(function () {
        var oTop = $(".tf-counter").offset().top - window.innerHeight;
        if (a === 0 && $(window).scrollTop() > oTop) {
          if ($().countTo) {
            $(".tf-counter")
              .find(".number")
              .each(function () {
                var to = $(this).data("to"),
                  speed = $(this).data("speed"),
                  dec = $(this).data("dec");
                $(this).countTo({
                  to: to,
                  speed: speed,
                  decimals: dec,
                });
              });
          }
          a = 1;
        }
      });
    }
  };


  /* tab slide 
  ------------------------------------------------------------------------------------- */
  var tabSlide = function () {
    if ($(".tab-slide").length > 0) {
      var $1 = $(".tab-slide li.active").width();
      var $2 = $(".tab-slide li.active").position().left;
      $(".nav-item-slide").css({
        width: $1,
        transform: "translateX(" + $2 + "px)",
      });
      $(".tab-slide li").on("click", function () {
        var itemTab = $(this).parent().find("li");
        $(itemTab).removeClass("active");
        $(this).addClass("active");
        var $3 = $(this).width();
        var $4 = $(this).position().left;
        var sideEffect = $(this).parent().find(".item-slide-effect");
        $(sideEffect).css({ width: $3, transform: "translateX(" + $4 + "px)" });
      });
    }
  };

  /* Input file 
  -------------------------------------------------------------------------------------*/
  var inputUpload = function () {
    $("input[type=file]").change(function (e) {
      $(this)
        .parents(".boxuploadfile")
        .find(".file-name")
        .text(e.target.files[0].name);
    });
  };

  $(function () {
    showPass();
    otpInput();
    delItem();
    backPage();
    activeSuggest();
    touchSpin();
    changeValue();
    resetCheck();
    clickModalSecond();
    tabSlide();
    flatCounter();
    handleTime();
    datePicker();
    inputUpload();
    toggleTheme();
    preloader();
  });
})(jQuery);
