$(document).ready(function () {
  $('.itg_search_icon').click(function () {
    $('.itg_search_popup').slideToggle('active');
  });

  //Featured collection slider
  $('.popular-items.owl-carousel').owlCarousel({
    loop: false,
    margin: 15,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  });

  //inner pages tab script
  $(".itg_tab_list span").click(function (e) {
    var tabName = $(this).attr('data-id');
    $(this).addClass('active_tabs').siblings().removeClass('active_tabs');
    $('.itg_tab_details .itg_tab_content').each(function () {
      var tabName_box = $(this).attr('data-id');
      if (tabName_box == tabName) {
        $(this).addClass('itg_active_content');
      } else {
        $(this).removeClass('itg_active_content');
      }
    })
  });



  $(".tab_faq_btn button").click(function () {
    $(this).addClass('active_btn').siblings().removeClass('active_btn');
    var faq_btn = $(this).attr('data-id');
    //alert(faq_btn);
    $(".tab_faq_alldata .fqs_div").each(function () {
      var faq_content = $(this).attr('data-id');
      //alert(faq_content);
      if (faq_btn == faq_content) {
        $(this).fadeIn();
      }
      else {
        $(this).fadeOut();
      }
    });
  });

  //product page tab 
  // Show the first tab and hide the rest
  $('#tabs-nav li:first-child').addClass('active');
  $('.tab-content').hide();
  $('.tab-content:first-child').show();

  // Click function
  $('#tabs-nav li').click(function () {
    $('#tabs-nav li').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').hide();

    var activeTab = $(this).find('a').attr('href');
    $(activeTab).fadeIn();
    return false;
  });

  //product title change according variant

  // var altHandle = $('.product-form__input--dropdown select').find(":selected").attr('data-value');
  //  //alert(altHandle);
  //    if(altHandle != undefined){
  //        $(".itg_slider_desktop .product__media-item").addClass("hide").removeClass("is-active").removeClass("cvariant-image cvariant-item");
  //        $(".itg_slider_desktop .product__media-item").each(function () {
  //          $(this).hasClass("alt_" + altHandle) && $(this).removeClass("hide").addClass("cvariant-image cvariant-item");
  //        });
  //        $(".itg_slider_desktop .product__media-item.alt_" + altHandle).eq(0).addClass("is-active");
  //        $(".itg_thumbnail li.thumbnail-list__item").addClass("hide");
  //        $(".itg_thumbnail li.thumbnail-list__item .global-media-settings").removeAttr('aria-current');
  //         $(".itg_thumbnail li.thumbnail-list__item").each(function () {
  //           $(this).hasClass("alt_" + altHandle) && $(this).removeClass("hide");
  //         });
  //         $(".itg_thumbnail li.thumbnail-list__item.alt_" + altHandle).eq(0).find(".global-media-settings").attr("aria-current","true").click();
  //         var variant_title = $('.product-form__input--dropdown select').find(":selected").attr("value").split("(")[0];     
  //         var varinat_sku = $('.product-form__input--dropdown select').find(":selected").attr("var_sku");
  //          $('.product__title h1 span').text(variant_title);
  //          $('.product__title p span').text(varinat_sku);
  //          $('.itg_variant_sku p').text(varinat_sku);
  //     }
  //product page selected variant content
  // $(document).on('change', '.product-form__input .select__select', function(){
  //  // alert()
  //   var selected_variant = $(this).find('option:selected').attr('var_sku');
  //   //alert(selected_variant);
  //   var html1 = $(document).find('#data_1.itg_tab_data[data="'+selected_variant+'"]').html();
  //   var html2 = $(document).find('#data_2.itg_tab_data[data="'+selected_variant+'"]').html();
  //    $(document).find('#tab1.tab-content.tab1').html(html1);
  //    $(document).find('#tab2.tab-content.tab2').html(html2);
  //   // console.log(html1);
  //   // console.log(html2);
  // });
  // product page varinat change title and sku  
  //  $('.select__select').change(function() {
  //    var option_name = $(this).val().split("(")[0];
  //    var option_sku = $(this).find('option:selected').attr('var_sku');
  // //alert(option_name);
  //  //  alert(option_sku);
  //   $('.product__title h1 span').text(option_name);
  //    $('.product__title p span').text(option_sku);
  //    $('.itg_variant_sku p').text(option_sku);
  //  });

  //product page image zoom
  $(".img_producto_container").on("mouseover", function () {
    $(this).find(".img_producto").css({ transform: "scale(" + $(this).attr("data-scale") + ")" });
  })
  $(".img_producto_container").on("mouseover", function () {
    $(this).find(".img_producto").css({ transform: "scale(" + $(this).attr("data-scale") + ")" });
  })
  $(".img_producto_container").on("mouseout", function () {
    $(this).find(".img_producto").css({ transform: "scale(1)" });
  })
  $(".img_producto_container").on("mousemove", function (e) {
    $(this).find(".img_producto").css({ "transform-origin": ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + "% " + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 + "%" });
  });

  //mobile filter
  var windowsize = $(window).width();
  if (windowsize < 768) {
    $('.pt-mobile-header .pt-nav-toggle').click(function () {
      $('.itg_coll_filter').slideToggle('slow');
    });
  }

  //bottom popup cookie setup
  $("#cookieconsent-modal").removeClass('hide');
  $(".cookieconsent-dismiss").click(function () {
    $.cookie('cookieconsent', 'accepted', { expires: 365 });
    $("#cookieconsent-modal").slideUp(function () {
      $(this).addClass("hide")
    });
  });
  var cookieshowhide = $.cookie('cookieconsent');
  if (cookieshowhide == 'accepted') {
    $("#cookieconsent-modal").slideUp(function () {
      $(this).addClass("hide")
    });
  }


  /** Disable old functionality *
  //preductive search 
  $('form[action="/search"]').css('position', 'relative').each(function () {

    var input = $(this).find('input[name="q"]');
    var offSet = input.position().top + input.innerHeight();
    $('<ul class="search-results"></ul>').css({ 'position': 'absolute', 'left': '0px', 'top': offSet }).appendTo($(this)).hide();

    input.attr('autocomplete', 'off').bind('keyup change', function () {
      var term = $(this).val();
      var form = $(this).closest('form');
      var resultsList = form.find('.search-results');

      jQuery.getJSON("/search/suggest.json", {
        "q": term,
        "resources": {
          "type": "product",
          "limit": 4,
          "options": {
            "unavailable_products": "hide",
            "fields": "title,product_type,variants.title,tag,variants.sku"
          }
        }
      }).done(function (response) {
        console.log("Response: " + JSON.stringify(response, null, 2));
        resultsList.empty();

        var productSuggestions = response.resources.results.products;

        if (productSuggestions.length > 0) {

          $.each(productSuggestions, function (index, item) {
            var link = $('<a></a>').attr('href', item.url);
            link.append('<div class="itg_thumbnail"><img src="' + item.image + '" /></div>');
            link.append('<div class="itg_prouct_data"><h3 class="title">' + item.title + '</h3> <span class="price">' + '$' + item.price + '</span></div>');
            //link.append('<span class="price">' +'$'+item.price + '</span>');
            //link.wrap('<div class="itg_prouct_data"></div>');
            link.wrap('<li></li>');
            resultsList.append(link.parent());
          });
          resultsList.fadeIn(100);
        } else {
          resultsList.html('<li><span class="title">No results.</span></li>');
        }
      });

    });
  });
  $('body').bind('click', function () {
    $('.search-results').hide();
  });

  **/

  //menu open on hover
  let items = document.querySelector(".header__inline-menu")?.querySelectorAll("details");
  let timeout;

  items.forEach(item => {
    item.addEventListener("mouseover", (event) => {
      clearTimeout(timeout);  // Clear any existing timeouts to prevent conflicts

      // Close all other top-level dropdowns
      items.forEach(otherItem => {
        if (otherItem !== item && !item.contains(event.relatedTarget)) {
          otherItem.removeAttribute("open");
        }
      });

      item.setAttribute("open", true);
    });

    item.addEventListener("mouseleave", () => {
      timeout = setTimeout(() => {  // Introduce a delay
        item.removeAttribute("open");
      }, 300);  // 300 milliseconds delay
    });

    item.querySelector("ul").addEventListener("mouseover", () => {
      clearTimeout(timeout);  // Clear the timeout if the user moves back to the dropdown
    });

    item.querySelector("ul").addEventListener("mouseleave", () => {
      timeout = setTimeout(() => {  // Introduce a delay
        item.removeAttribute("open");
      }, 300);  // 300 milliseconds delay
    });
  });



  // variant description change
  //     var selectedALt = $('.product-form__input input[type=radio]:checked+label img').attr('alt');
  //     var imglen = $('.product  .product__media-item[alt="'+selectedALt+'"]').length;
  //  if(imglen >= 1){
  //     $('.product  .itg_mergeVariant  .thumbnail-list__item').hide();
  //     $('.product  .itg_mergeVariant  .product__media-item').removeClass('is-active');
  //    $('.product  .itg_mergeVariant  .product__media-item[alt="'+selectedALt+'"]').first().addClass('is-active');
  //     $('.product  .itg_mergeVariant  .thumbnail-list__item[alt="'+selectedALt+'"]').first().attr('aria-current',true)
  //     $('.product  .itg_mergeVariant  .thumbnail-list__item[alt="'+selectedALt+'"]').show();
  //  }else{
  //     $('.product  .itg_mergeVariant  .thumbnail-list__item').show();
  //     $('.product  .itg_mergeVariant  .product__media-item').first().addClass('is-active');
  //  }

  //   $(document).on('change','.select__select',function(){
  //  var selectedVariant = $(this).val();
  //    // alert(selectedVariant);
  //   // $('.itg_more_variant').css("opacity","0").css("right", "-500px").css("visibility", "hidden");
  //  //var selectedALt = $(this).closest('.product-form__input').find('input[type=radio]:checked+label img').attr('alt');

  //   //$('.variantDescription').hide();
  //   //$('.variantDescription[title="'+selectedVariant+'"]').show();
  //   var imglen = $('.template-product .itg_mergeVariant  .product__media-item[alt="'+selectedALt+'"]').length;
  //   if(imglen >= 1){
  //   $('.template-product .itg_mergeVariant  .thumbnail-list__item').hide();
  //   $('.template-product .itg_mergeVariant .product__media-item').removeClass('is-active');
  //   $('.template-product .itg_mergeVariant  .product__media-item[alt="'+selectedALt+'"]').first().addClass('is-active');
  //   $('.template-product .itg_mergeVariant .thumbnail-list__item[alt="'+selectedALt+'"]').first().attr('aria-current',true)
  //   $('.template-product .itg_mergeVariant .thumbnail-list__item[alt="'+selectedALt+'"]').show();
  //   }else{
  //     $('.template-product .itg_mergeVariant  .thumbnail-list__item').show();
  //     $('.template-product .itg_mergeVariant  .product__media-item').first().addClass('is-active');
  //   }
  // });



  //   var altHandle = $('.product-form__input--dropdown select').find(":selected").attr('data-value');
  //    if(altHandle != undefined){
  //        $(".itg_slider_desktop .product__media-item").addClass("hide").removeClass("is-active").removeClass("cvariant-image cvariant-item");
  //        $(".itg_slider_desktop .product__media-item").each(function () {
  //          $(this).hasClass("alt_" + altHandle) && $(this).removeClass("hide").addClass("cvariant-image cvariant-item").addClass("is-active");
  //        });
  //        $(".itg_slider_desktop .product__media-item.alt_" + altHandle).eq(0).addClass("is-active");
  //        $(".itg_thumbnail li.thumbnail-list__item").addClass("hide");
  //        $(".itg_thumbnail li.thumbnail-list__item .global-media-settings").removeAttr('aria-current');
  //         $(".itg_thumbnail li.thumbnail-list__item").each(function () {
  //           $(this).hasClass("alt_" + altHandle) && $(this).removeClass("hide");
  //         });
  //         $(".itg_thumbnail li.thumbnail-list__item.alt_" + altHandle).eq(0).find(".global-media-settings").attr("aria-current","true").click();
  //         var variant_title = $('.product-form__input--dropdown select').find(":selected").attr("value").split("(")[0];
  //         var varinat_sku = $('.product-form__input--dropdown select').find(":selected").attr("var_sku");
  //          $('.product__title h1 span').text(variant_title);
  //          $('.product__title p span').text(varinat_sku);
  //          $('.itg_variant_sku p').text(varinat_sku);
  //     }
});


$(document).ready(function () {
  $('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });
});

