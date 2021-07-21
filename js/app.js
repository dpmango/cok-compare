"use strict";function ownKeys(t,e){var i,n=Object.keys(t);return Object.getOwnPropertySymbols&&(i=Object.getOwnPropertySymbols(t),e&&(i=i.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,i)),n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(i),!0).forEach(function(e){_defineProperty(t,e,i[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):ownKeys(Object(i)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))})}return t}function _defineProperty(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var APP=window.APP||{};APP.Dev=APP.Dev||{},APP.Browser=APP.Browser||{},APP.Plugins=APP.Plugins||{},APP.Components=APP.Components||{},window.onbeforeunload=function(){window.scrollTo(0,0)};var _window=$(window),_document=$(document),easingSwing=[.02,.01,.47,1];function normalize(e,t,i,n,a){t=(e-t)/(i-t)*(a-n)+n;return a<t?a:t<n?n:t}function getWindowWidth(){return window.innerWidth}function triggerBody(){$(window).scroll(),$(window).resize()}function formatNumberWithSpaces(e){return e.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function hasCrossedBreakpoint(e,t,i){return i<=t&&e<=i||t<=i&&i<=e}function Plurize(e,t,i,n){e=Math.abs(e);return 5<=(e%=100)&&e<=20?n:1===(e%=10)?t:2<=e&&e<=4?i:n}function rgba(e,t){var i=parseInt(e.slice(1,3),16),n=parseInt(e.slice(3,5),16),e=parseInt(e.slice(5,7),16);return t?"rgba("+i+", "+n+", "+e+", "+t+")":"rgb("+i+", "+n+", "+e+")"}function mediaCondition(e){var t,i=e.substring(1),e=e.substring(0,1);return"<"===e?t=getWindowWidth()<i:">"===e&&(t=getWindowWidth()>i),t}!function(e,t){t.Initilizer=function(){var e={init:function(){e.initGlobalPlugins(),e.initPlugins(),e.initComponents()},destroy:function(){},initGlobalPlugins:function(){t.Dev.Breakpoint.listenResize(),t.Browser().methods.setBodyTags(),t.Plugins.LegacySupport.init(),t.Plugins.ScrollBlock.listenScroll(),t.Plugins.Clicks.init()},initPlugins:function(){t.Plugins.Teleport.init(),t.Plugins.MicroModal.init(),t.Plugins.Sliders.init(),t.Plugins.Masks.init(),t.Plugins.Choises.init(),t.Plugins.TextareaAutoExpand.init(),t.Plugins.Validations.init(),t.Plugins.LAYOUT.init(),t.Plugins.Tabs.init(),t.Plugins.Table.init(),t.Plugins.Upload.init(),t.Plugins.LegacySupport.fixImages(),t.Plugins.Ymaps.init()},initComponents:function(){t.Components.Header.init()}};return e},e(function(){t.Initilizer().init()})}(jQuery,window.APP),function(t){window.APP.Browser=function(){var e={isRetinaDisplay:function(){if(window.matchMedia){var e=window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");return e&&e.matches||1<window.devicePixelRatio}},isMobile:function(){return!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},isIosDevice:function(){return!(!/iPad|iPhone|iPod/.test(navigator.userAgent)||window.MSStream)},msieversion:function(){return!!(0<window.navigator.userAgent.indexOf("MSIE ")||navigator.userAgent.match(/Trident.*rv:11\./))},setBodyTags:function(){t("body").addClass("is-ready"),e.msieversion()&&t("body").addClass("is-ie"),e.isMobile()&&t("body").addClass("is-mobile"),e.isIosDevice()&&t("html").addClass("is-ios")}};return{data:{isIe:e.msieversion(),isMobile:e.isMobile(),isIosDevice:e.isIosDevice(),isRetinaDisplay:e.isRetinaDisplay()},methods:e}}}(jQuery),function(n){window.APP.Plugins.Clicks={init:function(){n(document).on("click",'[href="#"]',function(e){e.preventDefault()}).on("click",".js-link",function(e){var t=n(this).data("href");t&&"#"!==t&&(e.preventDefault(),e.stopPropagation(),Barba.Pjax.goTo(t))}).on("click","a, .js-link",function(e){var t=n(this).data("href")||n(this).attr("href"),i=window.location.pathname;t===i.slice(1,i.length)&&(e.preventDefault(),e.stopPropagation())}).on("click",'a[href^="#section"]',function(){var e=n(this).attr("href"),e=n(e).offset().top;return n("body, html").animate({scrollTop:e},1e3),!1})},destroy:function(){}}}(jQuery),Number.prototype.pad=function(e){for(var t=String(this);t.length<(e||2);)t="0"+t;return t},function(r){r.Plugins.LAYOUT={data:{stickToWindow:void 0,containerAlign:void 0,swiperOffset:void 0},init:function(e){this.getData(),this.applyLayout(),e||this.listenResize()},getData:function(){this.data.stickToWindow=$(".js-stick-to-window"),this.data.containerAlign=$(".js-container-align"),this.data.swiperOffset=$(".js-swiper-offset")},getOffset:function(e){var t=void 0;try{t=$(e)}catch(e){}var i="string"==typeof e;return t||i&&parseInt(i)},listenResize:function(){window.addEventListener("resize",debounce(this.applyLayout.bind(this),100))},applyLayout:function(t){var s=this;function e(e){return void 0===t||"string"!=typeof t||t===e}s.data.stickToWindow&&e("stickToWindow")&&[].forEach.call(s.data.stickToWindow,function(e){var t,i,n=e.getAttribute("data-position"),a=e.getAttribute("data-stop")?mediaCondition(e.getAttribute("data-stop")):null,o=0;null!==a&&a?e.setAttribute("style",""):(e.style.marginLeft=0,e.style.marginRight=0,i=e.getBoundingClientRect().left,t=e.getAttribute("data-keep-container"),a=e.getAttribute("data-offset-right"),"both"===n&&t&&(e.style.paddingLeft=0,e.style.paddingRight=0),e.style.marginRight=s.getOffset(a),"left"===n?(o=-1*i,e.style.marginLeft="".concat(o,"px"),t&&(e.style.paddingLeft="".concat(-1*o,"px"))):"right"===n?(o=-1*(window.innerWidth-i-($(e).width()-Math.abs(parseInt(e.style.marginLeft)))),e.style.marginRight="".concat(o,"px"),t&&(e.style.paddingRight="".concat(-1*o,"px"))):"both"===n&&(n=-1*i,i=-1*(window.innerWidth-i-($(e).width()-Math.abs(parseInt(e.style.marginLeft)))),$(e).css({"margin-left":"".concat(n,"px"),"margin-right":"".concat(i,"px")}),t&&$(e).css({"padding-left":"".concat(-1*n,"px"),"padding-right":"".concat(-1*i,"px")})))}),s.data.containerAlign&&e("containerAlign")&&[].forEach.call(s.data.containerAlign,function(e){var t,i=e.getAttribute("data-stop")?mediaCondition(e.getAttribute("data-stop")):null,n=e.getAttribute("data-type"),a=e.getAttribute("data-position"),o=e.getAttribute("data-selector");null!==i&&i?e.setAttribute("style",""):(t=(t=e.closest(".container"))||document.querySelector(".container"),o&&(t=$(o)),i=window.innerWidth,o=t.getBoundingClientRect(),t=window.innerWidth<768?20:40,"right"===a?(e.setAttribute("style",""),a=e.getBoundingClientRect(),a=i-(o.left+o.width)-(i-(a.left+a.width)),n&&"padding"===n?e.style.paddingRight="".concat(a+t,"px"):e.style.marginRight="".concat(a,"px")):n&&"padding"===n?e.style.paddingLeft="".concat(o.left+t,"px"):n&&"slider"===n?((n=e.closest(".swiper-container")).setAttribute("data-offset-before",o.left+t),n&&n.swiper&&(n.swiper.params.slidesOffsetBefore=o.left+t,r.Plugins.Sliders.update())):e.style.marginLeft="".concat(o.left,"px"))}),s.data.swiperOffset&&e("swiperOffset")&&[].forEach.call(s.data.swiperOffset,function(e){var t=e.getAttribute("data-stop")?mediaCondition(e.getAttribute("data-stop")):null,i=e.getAttribute("data-position"),n=e.getAttribute("data-selector"),a=e.closest(".swiper-container");null!==t&&t?a&&a.swiper&&(a.setAttribute("data-offset-before",null),a.setAttribute("data-offset-after",null),a.swiper.params.slidesOffsetBefore=0,a.swiper.params.slidesOffsetAfter=0,r.Plugins.Sliders.update()):(t=e.closest(".container"),n&&(t=$(n)),n=window.innerWidth<768?20:40,t=t.getBoundingClientRect(),e=e.getAttribute("data-percent"),e=Math.round((t.width-2*n)*(parseFloat(e)/100)),"right"===i&&(a.setAttribute("data-offset-after",e),a&&a.swiper&&(a.swiper.params.slidesOffsetAfter=e,r.Plugins.Sliders.update())),"left"===i&&(a.setAttribute("data-offset-before",e),a&&a.swiper&&(a.swiper.params.slidesOffsetBefore=e,r.Plugins.Sliders.update())))})}}}(window.APP),function(e){e.Plugins.LegacySupport={init:function(){svg4everybody(),e.Browser().data.isIe},fixImages:function(){e.Browser().data.isIe&&(picturefill(),objectFitImages())}}}((jQuery,window.APP)),function(t,i){i.Plugins.ScrollBlock={data:{y:_window.scrollTop(),blocked:!1,direction:void 0,lastForScrollDir:0,lastForBodyLock:0,fillGapMethod:"padding",scrolllDisabled:!1},getData:function(){return this.data},fillScrollbarGap:function(){this.fillGapTarget(t(".header").get(0)),this.fillGapTarget(document.body)},unfillScrollbarGap:function(){this.unfillGapTarget(t(".header").get(0)),this.unfillGapTarget(document.body)},disableScroll:function(){var e;t("body").is(".body-lock")||t("body").is(".body-m-lock")||this.data.scrolllDisabled||(i.Browser().data.isMobile?0<(e=t(".blocker, .mobile-navi__menu")).length&&(e.each(function(e,t){disablePageScroll(t)}),this.data.scrolllDisabled=!0,this.data.blocked=!0,t("body").addClass("body-m-lock")):(this.data.lastForBodyLock=_window.scrollTop(),this.data.blocked=!0,t(".page__content").css({"margin-top":"-"+this.data.lastForBodyLock+"px"}),this.fillScrollbarGap(),t("body").addClass("body-lock")))},enableScroll:function(e){t(".blocker").length||(i.Browser().data.isMobile?(clearQueueScrollLocks(),enablePageScroll(),this.data.scrolllDisabled=!1,this.data.blocked=!1,this.data.direction="up",t("body").removeClass("body-m-lock")):(this.data.blocked=!1,this.data.direction="up",t(".page__content").css({"margin-top":"-0px"}),this.unfillScrollbarGap(),t("body").removeClass("body-lock"),_window.scrollTop(this.data.lastForBodyLock)))},getWindowScroll:function(){var e;this.data.blocked||(e=_window.scrollTop(),this.data.y=e,this.data.direction=e>this.data.lastForScrollDir?"down":"up",this.data.lastForScrollDir=e<=0?0:e,this.data.lastForBodyLock=e)},listenScroll:function(){_window.on("scroll",this.getWindowScroll.bind(this))},fillGapTarget:function(e){var t,i,n,a;e instanceof Node&&(t=this.getScrollBarWidth(e,!0),a=window.getComputedStyle(e),"margin"===(i=this.data.fillGapMethod)?(n=parseFloat(a.marginRight),e.style.marginRight="".concat(n+t,"px")):"width"===i?e.style.width="calc(100% - ".concat(t,"px)"):"max-width"===i?e.style.maxWidth="calc(100% - ".concat(t,"px)"):"padding"===i&&(a=parseFloat(a.paddingRight),e.style.paddingRight="".concat(a+t,"px")))},unfillGapTarget:function(e){var t;e instanceof Node&&("margin"===(t=this.data.fillGapMethod)?e.style.marginRight="":"width"===t?e.style.width="":"max-width"===t?e.style.maxWidth="":"padding"===t&&(e.style.paddingRight=""))},getScrollBarWidth:function(e){if(e instanceof Node){e=document.documentElement.clientWidth;return window.innerWidth-e}return 0}}}(jQuery,window.APP),function(s){window.APP.Plugins.Teleport={data:{teleports:[]},init:function(){this.getElements(),this.teleport(),this.listenResize()},getElements:function(){var o=this,e=s(".js-teleport");o.data.teleports=[],0!==e.length&&e.each(function(e,t){var i=s(t),n=s("[data-teleport-target="+i.data("teleport-to")+"]"),a=i.data("teleport-condition").substring(1),t=i.data("teleport-condition").substring(0,1);o.data.teleports.push({el:i,html:i.html(),target:n,conditionMedia:a,conditionPosition:t})})},listenResize:function(){_window.on("resize",debounce(this.teleport.bind(this),100))},teleport:function(){0!==this.data.teleports.length&&s.each(this.data.teleports,function(e,t){var i;t.target&&t.html&&t.conditionPosition&&("<"===t.conditionPosition?i=window.innerWidth<=t.conditionMedia:">"===t.conditionPosition&&(i=window.innerWidth>=t.conditionMedia),i?(t.target.html(t.html),t.el.html("")):(t.el.html(t.html),t.target.html("")))})}}}(jQuery),function(n){window.APP.Plugins.Ymaps={data:{scriptsCreated:!1,ymapsLoaded:!1},init:function(){0<n(".js-ymap").length&&(this.data.ymapsLoaded?ymaps.ready(this.initMaps.bind(this)):this.tryLoadScripts())},createScripts:function(){var e=document.createElement("script");e.type="text/javascript",e.src="https://api-maps.yandex.ru/2.1/?apikey=112877c7-6deb-47d5-8107-8f9b28545f15&lang=ru_RU",n("head").append(e),this.data.scriptsCreated=!0},tryLoadScripts:function(){var e=this;e.data.scriptsCreated||e.createScripts();var t=setInterval(function(){if(!e.data.ymapsLoaded)try{ymaps.ready()&&(e.data.ymapsLoaded=!0,e.init(),clearInterval(t))}catch(e){}},250)},initMaps:function(){var i=this;n(".js-ymap").each(function(e,t){i.drawMap(t)})},drawMap:function(e){var t=n(e);0===t.length||(t={center:this.geoStringToArr(t.data("center")),zoom:t.data("zoom")||10,placeholder:{geodata:this.geoStringToArr(t.data("placeholder")),caption:t.data("placeholder-caption"),balloon:t.data("placeholder-balloon"),icon:t.data("placeholder-icon")}}).center&&((e=new ymaps.Map(e,{center:t.center,zoom:t.zoom})).controls.remove("trafficControl"),e.controls.remove("searchControl"),e.controls.remove("fullscreenControl"),e.controls.remove("rulerControl"),e.controls.remove("geolocationControl"),e.controls.remove("routeEditor"),e.controls.remove("typeSelector"),t.placeholder.geodata&&(t=new ymaps.Placemark(t.placeholder.geodata,{balloonContent:t.placeholder.balloon,iconCaption:t.placeholder.caption},{preset:t.placeholder.icon||"islands#redIcon"}),e.geoObjects.add(t)))},geoStringToArr:function(e){e=e.split(",");return 2===e.length&&[parseFloat(e[0]),parseFloat(e[1])]}}}(jQuery),function(t){window.APP.Dev.Breakpoint={setBreakpoint:function(){var e=window.location.host.toLowerCase();(0<=e.indexOf("localhost")||0<=e.indexOf("surge")||0<=e.indexOf("netlify"))&&(e="<div class='dev-bp-debug'>"+window.innerWidth+" x "+_window.height()+"</div>",t(".page").append(e),setTimeout(function(){t(".dev-bp-debug").fadeOut()},1e3),setTimeout(function(){t(".dev-bp-debug").remove()},1500))},listenResize:function(){t(window).on("resize",debounce(this.setBreakpoint,200))}}}(jQuery),function(a){window.APP.Plugins.Choises={init:function(){var e=a(".js-choices");0!==e.length&&e.each(function(e,t){var i=!!a(t).data("searchable"),n=!!a(t).data("sort");new Choices(t,{silent:!1,searchEnabled:i,searchChoices:i,searchResultLimit:5,searchFields:["label","value"],shouldSort:n,shouldSortItems:n,loadingText:"Загрузка...",noResultsText:"Не найдено",noChoicesText:"Нет доступных опций",itemSelectText:""})})}}}(jQuery),function(t,i){i.Plugins.MicroModal={init:function(e){e||this.eventListeners(),MicroModal.init({onShow:function(e){i.Plugins.ScrollBlock.disableScroll()},onClose:function(e){i.Plugins.ScrollBlock.enableScroll()},openClass:"is-open",disableScroll:!1,disableFocus:!1,awaitOpenAnimation:!1,awaitCloseAnimation:!1,debugMode:!1})},eventListeners:function(){_document.on("click","[data-micromodal-close]",function(){var e=t(this).closest(".modal").attr("id");MicroModal.close(e)}),_document.on("click",".modal__container",function(e){e.stopPropagation()})}}}(jQuery,window.APP),function(a,o){o.Plugins.Sliders={data:{swipers:{hero:void 0,partners:void 0,programs:void 0,events:void 0,news:void 0},responsiveSwipers:{backstageSwiper:{instances:[],enableOn:768}}},init:function(e){e||(this.initSwipers(),this.initSwiperDataTree(),this.initResponsiveSwipers()),this.listenResize()},utils:{buildProps:function(e,t,i){var n={};t&&t.pagination&&(n={pagination:{el:".swiper-".concat(e,"-pagination"),type:"bullets",clickable:!0}}),t&&t.navigation&&(n=_objectSpread(_objectSpread({},n),{},{navigation:{nextEl:".swiper-".concat(e,"-next"),prevEl:".swiper-".concat(e,"-prev")}}));t={},e=i.data("offset-before"),i=i.data("offset-after");return e&&(t={slidesOffsetBefore:e}),i&&(t=_objectSpread(_objectSpread({},t),{},{slidesOffsetAfter:i})),_objectSpread(_objectSpread(_objectSpread({},{watchOverflow:!0,setWrapperSize:!1,slidesPerView:"auto",normalizeSlideIndex:!0,slideToClickedSlide:!0,touchEventsTarget:"wrapper",threshold:10}),n),t)},buildSwiper:function(e,t,i){var n=a(".page").last().find(".js-swiper-".concat(e));if(0!==n.length){n=o.Plugins.Sliders.utils.buildProps(e,i,n);return new Swiper(".js-swiper-".concat(e,":not(.swiper-container-initialized)"),_objectSpread(_objectSpread({},n),t))}}},update:function(e){e=a(e?"".concat(e,".swiper-container-initialized"):".swiper-container-initialized");0<e.length&&e.each(function(e,t){a(t)[0].swiper.update()})},listenResize:function(){_window.on("resize",debounce(this.initResponsiveSwipers.bind(this),200))},initSwipers:function(){var e=this;this.data.swipers.hero=e.utils.buildSwiper("hero",{loop:!0,spaceBetween:0,slidesPerView:1,pagination:{el:".swiper-hero-pagination",type:"fraction"}},{navigation:!0}),this.data.swipers.programs=e.utils.buildSwiper("programs",{loop:!1,spaceBetween:20,slidesPerView:1,slidesPerColumn:2,slidesPerColumnFill:"row",breakpoints:{576:{spaceBetween:20,slidesPerView:2,slidesPerColumn:2,slidesPerColumnFill:"row"},992:{spaceBetween:34,slidesPerView:3,slidesPerColumn:2,slidesPerColumnFill:"row"}}},{navigation:!0,pagination:!0}),this.data.swipers.partners=e.utils.buildSwiper("partners",{loop:!1,spaceBetween:20,slidesPerView:"auto",breakpoints:{576:{spaceBetween:20,slidesPerView:2},992:{spaceBetween:34,slidesPerView:3}}},{navigation:!0,pagination:!0}),this.data.swipers.events=e.utils.buildSwiper("events",{loop:!0,spaceBetween:20,slidesPerView:"auto",breakpoints:{576:{spaceBetween:20,slidesPerView:2},992:{spaceBetween:64,slidesPerView:2}}},{navigation:!0,pagination:!0}),this.data.swipers.news=e.utils.buildSwiper("news",{loop:!0,spaceBetween:20,slidesPerView:"auto",breakpoints:{576:{spaceBetween:20,slidesPerView:2},992:{spaceBetween:64,slidesPerView:2}}},{navigation:!0,pagination:!0})},initSwiperDataTree:function(){var e=".js-swiper-backstage";0<a(e).length&&this.initSwiperTree(e,"backstageSwiper")},initResponsiveSwipers:function(){var e=".js-swiper-backstage";0<a(e).length&&this.responsiveSwiperConstructor(e,"backstageSwiper",{watchOverflow:!0,setWrapperSize:!1,spaceBetween:0,slidesPerView:"auto",freeMode:!0,freeModeSticky:!1,on:{reachEnd:function(e){o.Components.Backstage.data.isFetching||(o.Components.Backstage.getNewBackstageItems(),e.setTranslate(0))}}})},initSwiperTree:function(e,i){var n=this;n.data.responsiveSwipers[i].instances=[],a(e).each(function(e,t){n.data.responsiveSwipers[i].instances.push(void 0)})},responsiveSwiperConstructor:function(e,t,i){var n=this.data.responsiveSwipers[t];a(e).each(function(e,t){window.innerWidth<=n.enableOn?void 0===n.instances[e]&&(n.instances[e]=new Swiper(t,i)):void 0!==n.instances[e]&&(n.instances[e].destroy(!0,!0),n.instances[e]=void 0)}),this.data.responsiveSwipers[t]=n},destroy:function(){}}}(jQuery,window.APP),function($,APP){APP.Plugins.Validations={init:function(){this.localize(),this.customMethods(),this.validateFormsConstructor(),this.validateFormsCustom()},data:{validateErrorPlacement:function(e,t){e.addClass("ui-input__validation"),t.is("select")?e.appendTo(t.closest(".selectric-wrapper")):t.is('input[type="radio"]')||t.is('input[type="checkbox"]')?e.appendTo(t.closest(".ui-group")):e.appendTo(t.parent("div"))},validateHighlight:function(e){var t=$(e);(t.is("select")?t.closest(".selectric-wrapper"):$(e)).addClass("has-error")},validateUnhighlight:function(e){var t=$(e);(t.is("select")?t.closest(".selectric-wrapper"):$(e)).removeClass("has-error")},validateSubmitHandler:function validateSubmitHandler(form){$(form).addClass("loading");var formData=$(form).serialize(),sucessFunction=$(form).data("success-function"),x;void 0!==sucessFunction&&(x=eval(sucessFunction),"function"==typeof x&&x(formData))},masks:{phone:{required:!0,normalizer:function(e){return e&&"+X (XXX) XXX-XXXX"!==e?e.replace(/[^\d]/g,""):e},minlength:11,digits:!0}}},customMethods:function(){$.validator.addMethod("laxEmail",function(e,t){return this.optional(t)||/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)},"Email format must be like name@site.com")},localize:function(){$.extend($.validator.messages,{required:"Это поле необходимо заполнить.",remote:"Пожалуйста, введите правильное значение.",email:"Пожалуйста, введите корректный адрес электронной почты.",url:"Пожалуйста, введите корректный URL.",date:"Пожалуйста, введите корректную дату.",dateISO:"Пожалуйста, введите корректную дату в формате ISO.",number:"Пожалуйста, введите число.",digits:"Пожалуйста, вводите только цифры.",creditcard:"Пожалуйста, введите правильный номер кредитной карты.",equalTo:"Пожалуйста, введите такое же значение ещё раз.",extension:"Пожалуйста, выберите файл с правильным расширением.",maxlength:$.validator.format("Пожалуйста, введите не больше {0} символов."),minlength:$.validator.format("Пожалуйста, введите не меньше {0} символов."),rangelength:$.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),range:$.validator.format("Пожалуйста, введите число от {0} до {1}."),max:$.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),min:$.validator.format("Пожалуйста, введите число, большее или равное {0}.")})},validateFormsConstructor:function(){var n=this,e=$(".js-validate-form:not(.is-validation-attached)");0!==e.length&&e.each(function(e,t){var i=$(t),t={errorPlacement:n.data.validateErrorPlacement,highlight:n.data.validateHighlight,unhighlight:n.data.validateUnhighlight,submitHandler:n.data.validateSubmitHandler,rules:{email:{required:!0,email:!0,laxEmail:!0},phone:n.data.masks.phone},messages:{email:{required:"Please enter email",email:"Email format must be like name@site.com"},phone:{minlength:"Phome form is invalid"}}};i.validate(t),i.addClass("is-validation-attached")})},validateFormsCustom:function(){var e=this,e={errorPlacement:e.data.validateErrorPlacement,highlight:e.data.validateHighlight,unhighlight:e.data.validateUnhighlight,submitHandler:e.data.validateSubmitHandler,rules:{phone:e.data.masks.phone},messages:{phone:{required:"Заполните это поле",minlength:"Введите корректный телефон"}}};$("[js-validate-request]").validate(e)}}}(jQuery,window.APP),function(e){window.APP.Plugins.Masks={init:function(){e(".js-datepicker").mask("9999.99.99",{placeholder:"дд.мм.гггг"}),e("[js-dateMask]").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"}),e("input[type='tel']").mask("+7 (000) 000-0000",{placeholder:"+7 (___) ___-____"})}}}(jQuery),function(n){window.APP.Plugins.Table={init:function(e){e||(this.eventListeners(),this.listenResize()),this.checkScrollbars()},eventListeners:function(){},listenResize:function(){_window.on("resize",debounce(this.checkScrollbars.bind(this),100))},checkScrollbars:function(){var e=n(".table-scroller, .dash__nav-scroller");0!==e.length&&e.each(function(e,t){var i=n(t);({x:(t=i).find("table, ul").width()>t.width(),y:t.find("table, ul").height()>t.height()}).x?i.addClass("has-scrollbar"):i.removeClass("has-scrollbar")})}}}(jQuery),function(o){window.APP.Plugins.Tabs={init:function(e){e||this.eventListeners(),this.checkHighlighters(),this.checkHash()},changeActiveTab:function(e){var t,i,n,a=o('.js-tabs-nav a[href="#'+e+'"]');0!==a.length&&(t=a.closest(".js-tabs"),(i=a.closest("li")).addClass("is-active"),i.siblings().removeClass("is-active"),this.setHighlighterPosition(a,!0),n=t.find('.js-tab[data-tab="'+e+'"]'),t.find('.js-tab:not([data-tab="'+e+'"])').hide(),n.fadeIn(250,function(){n.addClass("is-active")}))},eventListeners:function(){var t=this;_document.on("click",".js-tabs-nav a",function(){var e=o(this),e=e.attr("href").slice(1,e.attr("href").length);t.changeActiveTab(e)}).on("mouseenter",".js-tabs-nav a",function(){var e=o(this);t.setHighlighterPosition(e)}).on("mouseleave",".js-tabs-nav",function(){var e=o(this).find("li.is-active a");t.setHighlighterPosition(e)})},checkHash:function(){var e=window.location.hash;0!==e.length&&this.changeActiveTab(e.slice(1,e.length))},checkHighlighters:function(){var n=this,e=o(".js-nav-highlighter");0!==e.length&&e.each(function(e,t){var i=o(t),t=i.parent().find("li.is-active a");n.setHighlighterPosition(t,i)})},setHighlighterPosition:function(e,t){var i=e.width(),n=e.position().left,e=e.closest(".js-tabs-nav");e.find(".js-nav-highlighter").css({width:i,left:n+5});e=e.closest(".dash__nav-scroller");t&&0<e.length&&e.animate({scrollLeft:n},300)}}}(jQuery),jQuery,window.APP.Plugins.TextareaAutoExpand={init:function(){_document.one("focus.autoExpand",".ui-group textarea",function(){var e=this.value;this.value="",this.baseScrollHeight=this.scrollHeight,this.value=e}).on("input.autoExpand",".ui-group textarea",function(){var e,t=0|this.getAttribute("data-min-rows");this.rows=t,e=Math.ceil((this.scrollHeight-this.baseScrollHeight)/17),this.rows=t+e})}},function(o){window.APP.Plugins.Upload={init:function(e){e||this.eventListeners()},eventListeners:function(){var i=this;_document.on("change",".js-ui-upload",function(e){var t=o(this),e=i.handleUpload(e,t);i.setInfoPlugin(e,t)}).on("click",".js-upload-close",function(){var e=o(this).closest(".js-ui-upload");i.resetUploader(e)}).on("click",".ui-upload.have-error",function(){var e=o(this).closest(".js-ui-upload");i.resetUploader(e)})},setFileReaderValue:function(e){console.log({resReader:e})},setInfoPlugin:function(e,t,i){var n=t.find(".ui-upload__trigger"),a=t.find(".ui-upload__info").find(".ui-upload__name");n.hide(),e.error?(t.addClass("have-error"),a.text(e.error)):(t.addClass("have-file"),a.text(e.file.name))},resetUploader:function(e){var t=e.find(".ui-upload__trigger"),i=e.find(".ui-upload__info").find(".ui-upload__name"),n=e.find("input"),a=!!e.data("upload-btn")&&o(e.data("upload-btn"));t.fadeIn(),e.removeClass("have-file").removeClass("have-error"),i.text(""),n.val(""),a.attr("disabled",!0)},handleUpload:function(e,t){var i=this,e=e.target.files,n={error:void 0,file:void 0},t={mime:t.data("allowed-mime"),maxSize:t.data("max-size"),includeReader:t.data("include-reader"),uploadBtn:t.data("upload-btn")};if(e&&e[0]){e=e[0];if(n.file=e,t.mime){var a=e.type?e.type.split("/")[0]:void 0;if(-1===t.mime.split(", ").indexOf(a))return n.error="Неверный формат файла",n}if(t.maxSize)if(function(e){if(0===e)return null;return Math.round(e/1048576*100)/100}(e.size)>parseInt(t.maxSize,10))return n.error="Файл привышает допустимый лимит",n;return t.includeReader&&((a=new FileReader).onload=function(e){return i.setFileReaderValue(e.target.result),n},a.readAsDataURL(e)),!t.uploadBtn||0<(t=o(t.uploadBtn)).length&&(n.error?t.attr("disabled",!0):t.attr("disabled",!1)),n}}}}(jQuery),function(a,o){o.Components.Header={data:{classes:{fixedClass:"is-fixed",visibleClass:"is-fixed-visible",bodyFixedVisible:"is-header-fixed-visible"},cursor:{x:0,y:0,target:void 0},header:{container:void 0,bottomPoint:void 0}},init:function(e){e||(this.getHeaderParams(),this.eventListeners(),this.listenScroll(),this.listenResize(),this.listenCursor()),this.closeMobileMenu(),this.closeMegaMenu()},getHeaderParams:function(){var e=a(".header"),t=e.outerHeight()+0;this.data.header={container:e,bottomPoint:t}},closeMobileMenu:function(){a(".js-hamburger").removeClass("is-active"),a(".mobile-navi").removeClass("is-active"),o.Plugins.ScrollBlock.enableScroll()},closeMegaMenu:function(e){0!==a(".js-megamenu.is-active").length&&(e&&o.Browser().data.isMobile&&o.Plugins.ScrollBlock.enableScroll(),a(".js-megamenu-trigger a").removeClass("is-active"),a(".js-megamenu").removeClass("is-active"))},closeMegaMenuByTarget:function(e){var t=0===e.closest(".megamenu__scroller").length,i=0===e.closest(".header__menu").length,e=0===e.closest(".header__search").length;t&&i&&e&&this.closeMegaMenu(!0)},openMegaMenu:function(e,t){var i,t=t?(i=null,t):(i=a(this)).data("for"),n=a('.js-megamenu[data-id="'+t+'"]');o.Components.Header.clickOrHoverTimeoutRouter(e,function(){o.Components.Header.closeMegaMenu(),0<n.length&&(i&&i.addClass("is-active"),n.addClass("is-active"),n.find(".megamenu__scroller").animate({scrollTop:0},"fast"),o.Browser().data.isMobile&&o.Plugins.ScrollBlock.disableScroll())})},eventListeners:function(){var i=this;_document.on("click",".js-hamburger",function(){a(this).toggleClass("is-active"),a(".mobile-navi").toggleClass("is-active"),a(this).is(".is-active")?o.Plugins.ScrollBlock.disableScroll():o.Plugins.ScrollBlock.enableScroll()}),_document.on("click",function(e){var t=a(e.target),e=0===t.closest(".mobile-navi__wrapper").length,t=0===t.closest(".header").length;e&&t&&i.closeMobileMenu()}),_document.on("click",".js-mobile-navi-menu li.have-ul > a",function(e){var t=a(this).closest("li"),i=t.find("ul");t.toggleClass("is-active"),i.slideToggle()}),_document.on("click mouseenter",".js-megamenu-trigger a",i.openMegaMenu),_document.on("mouseleave",".js-megamenu-trigger a",function(){clearTimeout(o.Components.Header.data.timer)}),_document.on("mouseleave",".megamenu__scroller",debounce(function(){var e;o.Browser().data.isMobile||(e=a(i.data.cursor.target),i.closeMegaMenuByTarget(e))},300,{leading:!1,trailing:!0})).on("mouseleave",".header-global",debounce(function(){var e;o.Browser().data.isMobile||(e=a(i.data.cursor.target),i.closeMegaMenuByTarget(e))},300,{leading:!1,trailing:!0})).on("click",function(e){e=a(e.target);i.closeMegaMenuByTarget(e)}),_document.on("click",".header__search",function(e){i.openMegaMenu(e,"search")})},listenScroll:function(){_window.on("scroll",this.scrollHeader.bind(this)),_window.on("scroll",debounce(this.scrollHeaderDebouce.bind(this),1250,{trailing:!0}))},listenResize:function(){_window.on("resize",debounce(this.getHeaderParams.bind(this),100))},listenCursor:function(){document.onmousemove=function(e){o.Components.Header.data.cursor={x:e.pageX,y:e.pageY,target:e.target}}},makeHeaderVisible:function(){this.data.header.container.addClass(this.data.classes.visibleClass),a("body").addClass(this.data.classes.bodyFixedVisible),this.data.header.isFixedVisible=!0},makeHeaderHidden:function(){this.data.header.container.removeClass(this.data.classes.visibleClass),a("body").removeClass(this.data.classes.bodyFixedVisible),this.data.header.isFixedVisible=!1},scrollHeaderDebouce:function(){void 0!==this.data.header.container&&this.makeHeaderVisible()},scrollHeader:function(){var e,t;void 0!==this.data.header.container&&(e="is-fixed",(t=o.Plugins.ScrollBlock.getData()).blocked||(t.y>this.data.header.bottomPoint?(this.data.header.container.addClass(e),a("body").addClass("is-header-fixed"),t.y>2*this.data.header.bottomPoint&&"up"===t.direction?this.makeHeaderVisible():this.makeHeaderHidden()):(t=-1*(100-Math.floor(normalize(t.y,this.data.header.bottomPoint,0,0,100))),this.data.header.container.css({transform:"translate3d(0,"+t+"%,0)"}),this.data.header.container.removeClass(e),a("body").removeClass("is-header-fixed"))))},clickOrHoverTimeoutRouter:function(e,t){var i=e.type,e=o.Browser().data.isMobile;("mouseenter"===i||"mouseover"===i)&&!e?o.Components.Header.data.timer=setTimeout(t,50):t()},headerSeachSubmited:function(){var e=a(".js-header-search").find("input").val().trim();2<e.length&&(window.location.pathname="/search.html?query=".concat(e))}}}(jQuery,window.APP);