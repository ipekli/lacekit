    /**
     *   LACEKIT GOODIES - LEAVE ALONE 
     *   v. 0.1
     */


   
    function updateSessionVar(type, varname, val){
        $.get('core/updateSessionVar.php?type=' + type + '&varname=' + varname + '&val=' + val, function(data){
            return;
        });
    }

    function countDown(target){
        var number = Number($("#"+target).html());
        number = Math.ceil(number*0.89);
        $("#"+target).html(number);
    }

    function showTooltip(target, text){
         $(target).attr('data-toggle','tooltip');
         $(target).attr('data-placement','top');
         $(target).attr('data-trigger','click');
         $(target).attr('title', text);


        //and finally show the popover
        $(target).tooltip('show');
        var that = target;
        setTimeout( function(){
                 $(that).tooltip('hide')}, 1500);
    }

    function getUrlParameter(parameter){
        var parameter = parameter;
        var value = false;
        var pageURL = window.location.search.substring(1);
        var variables = pageURL.split('&');
        $.each( variables, function( key, val ) {
            var parameterName = val.split('=');
            if(parameterName[0] == parameter){
                value = parameterName[1];
            }
        });
        return(value);
    }

    // Read a page's GET URL variables and return them as an associative array.
    function getAllUrlParameters()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        if(hashes ==  window.location.href){
            return false;
        }
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }


    $(function(){

        // 
        $(".fakeReload").on("click",function() {
            var spinnerMarkup = "<div class=\" align-center\">";
            spinnerMarkup += "    ";
            spinnerMarkup += "    <sl-spinner></sl-spinner>";
            spinnerMarkup += "    ";
            spinnerMarkup += "</div>";
            var target = $(this).data("target");
            var tmpContent = $("#"+target).html();
            $("#"+target).html(spinnerMarkup);
            setTimeout(function(){
                $("#"+target).html(tmpContent);
            },1000);
        });


        $(".trigger").on("click",function() {
            var group = $(this).data("group");
            var item = $(this).data("item");
            $("."+group).addClass("hide");
            $("."+group+"-" + item).removeClass("hide");
        });



        $(".copyToClipboard").on("click",function() {
            var target = $(this).data("target");
            var text = $("#"+target).html();
            $('<div style="opacity:0"><textarea id="textarea'+target+'">'+text+'</textarea></div>').appendTo("body");
            $("#textarea"+target).select();
            document.execCommand('copy');
            $("#textarea"+target).remove();
            showTooltip(this, "Copied to Clipboard");
        });

        $(".showHide").on("click",function() {
            if($("#"+$(this).data("show")).hasClass("hide")){
                $("#"+$(this).data("show")).css("display", "none").removeClass("hide");
            }
            $("#"+$(this).data("show")).toggle("slow");
            $("#"+$(this).data("hide")).toggle("slow");
        });


        // Affix if there is any
        if($('#breadcrumbwrapper').length > 0){
            $('#breadcrumbwrapper ul li').each(function (id, element) {
                totalWidth += $(element).outerWidth(true);
            });
            $('#breadcrumbwrapper ul').css('width', totalWidth + 'px');

            myScroll = new iScroll('breadcrumbwrapper', { hScrollbar: false, vScrollbar: false, hScroll: true, vScroll: false });
            myScroll.scrollToElement('li.active');
        }

        // Manage checkbox handling for session data
        $('.sessionCheckbox').on("click",function(){

            if(this.checked){

                $("#hidden" + this.id ).val($(this).attr('data-checked'));
            } else {


                $("#hidden" + this.id ).val($(this).attr('data-unchecked'));

            }
          });

        $(".filterSearch").on("keyup",function(){

            jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function (arg) {
                return function (elem) {
                    return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                };
            });


            filtertable = false;
            tmpTable = $(this).parent();
            while(filtertable == false){
                if($(tmpTable).hasClass("filterTable")){
                    filtertable = tmpTable;
                }
                tmpTable = $(tmpTable).parent();
            }

            //hide all the rows
            $(filtertable).find("tr.filterme").hide();

            // Concatenate all Searchterms
            var concat = "";
            $(".filterSearch").each(function (it, elem) {
                if($(elem).val().length > 0 ){
                    concat = $(elem).val() + " " + concat;
                }
            });

            //split the current value of searchInput
            var data = concat.split(" ");

            //create a jquery object of the rows
            var jo = $(filtertable).find("tr.filterme");

            //Recusively filter the jquery object to get results.
            anzahlRows = 0;
            $.each(data, function(i, v){
                jo = jo.filter("*:Contains('"+v+"')");
                anzahlRows = jo.length;
            });
            //show the rows that match.
            jo.show();
            $(".filtersearchCount").html(anzahlRows);
            //

        });

        // select Users to for easy Login
        $(".loginUser").on("click",function() {
            $('#login').val($(this).attr("data-key"));
            $('#loginform').submit();
        });

        $(".loginFirstUser").on("click",function() {
            if($('#login').val().length == 0 ){
                $('#login').val($(this).attr("data-key"));
            }
            $('#loginform').submit();
        });

        $(".checkall").on("click",function() {
                $("." + $(this).data("class")).prop('checked',$(this).prop('checked'));
        });


        $(".selectOnFocus").on("focus",function() {
            $(this).select();
        });

        $(".stepper .btn-next").on("click",function() {
            var nextId = $(this).attr("data-nextid");
            var thisId = parseInt(nextId) - 1;

            // Tabs
            $("#step-tab-" + thisId).removeClass("active");
            $("#step-tab-" + thisId).addClass("complete");
            $("#step-tab-" + nextId).addClass("active");
            //Badge in Tabs
            $("#badge" + thisId).removeClass("label-info");
            $("#badge" + thisId).addClass("label-success");
            $("#badge" + nextId).removeClass("label-default");
            $("#badge" + nextId).addClass("label-info");
            // Panes
            $("#step" + thisId).removeClass("active");
            $("#step" + nextId).addClass("active");

       });

       $(".stepper .btn-prev").on("click",function() {
            var prevId = parseInt($(this).attr("data-previd"));
            var thisId = prevId + 1;



            if(prevId == 1){
                $(".complete").removeClass("complete");
                $(".label-success").removeClass("label-success");
                $("#step-tab-6" + thisId).removeClass("active");
                $("#step6").removeClass("active");

            }

            // Tabs
            $("#step-tab-" + thisId).removeClass("active");
            $("#step-tab-" + prevId).removeClass("complete");
            $("#step-tab-" + prevId).addClass("active");
            //Badge in Tabs
            $("#badge" + thisId).removeClass("label-info");
            $("#badge" + thisId).addClass("label-default");
            $("#badge" + prevId).removeClass("label-success");
            $("#badge" + prevId).addClass("label-info");
            // Panes
            $("#step" + thisId).removeClass("active");
            $("#step" + prevId).addClass("active");
       });

       $("body").on("click", ".stepper ul.steps li.complete", function() {
            $(this).parent().find("li").removeClass("active").find("span.label-info").removeClass("label-info").addClass("label-default");
            $(this).removeClass("complete");
            $(this).addClass("active").find("span.label").addClass("label-info").removeClass("label-default").removeClass("label-success");
            var stepper = $(this).parent().parent();
            $(stepper).find(".step-pane").removeClass("active");
            $($(this).data("target")).addClass("active");
       });

        $(document).on('keydown','alt+r', function(){
            var url = window.location.href;
            var get = "session_renew=true";
            var start = "?";
            if (url.indexOf("?") >= 0){
                start = "&";
            }
            window.location.href = url+start+get;
        });


        $(".countDown").on("click",function() {
            var target = $(this).data("target");
            countDown(target);
        });


        $(".scrollTo").on("click",function() {
            var scrollTo = $(this);
            var offset = 10;

            if($(this).data("scrollto") != undefined){
                scrollTo = $("#"+$(this).data("scrollto"));
            }
            if($(this).data("offset") != undefined){
                offset = $(this).data("offset")
            }
            $('html, body').animate({
                scrollTop: $(scrollTo).offset().top-offset
            }, 600);
            event.preventDefault();
        });

        // FORM BEHAVIOR
        $(".checkform").on(function() {
            checkform(this);
        });

        function checkform(el){
            var container = $(el).parent();
            var hasErrors = false;
            // Input fields
            $(container).find(".required").each(function (it, elem) {
                if($(elem).val() == ""){
                    hasErrors = true;
                    $(elem).closest(".form-group").addClass("has-error has-feedback");
                } else {
                    $(elem).closest(".form-group").removeClass("has-error has-feedback");
                }
            });
            // radio boxes
            $(container).find(".requiredFromGroup").each(function (it, elem) {
                // console.log('drin');
                var selected = false ;
                var radio = $(elem).find("input[type='radio']").first();
                var group = $(radio).attr("name");

                if (!$("input[name='"+group+"']:checked").val()) {
                   // console.log('Nothing is checked!');
                   hasErrors = true;
                } else {
                    selected = true;
                }

                if(selected == false){
                    $(this).addClass("has-error has-feedback");
                } else {
                    $(this).removeClass("has-error has-feedback");
                }
            });
            if(hasErrors == false ){

                formCollapse();
                setTimeout(function(){
                    $(".submitfeedback").toggleClass("hide");
                }, 800);
                $(".feedback-error-message").addClass("hide");
            } else {
                $(".feedback-error-message").removeClass("hide");
            }
            return hasErrors;
        }

        function formCollapse(){
            $('.collapseForm').collapse('toggle');
        }

        $(".formCollapse").on("click",function() {
            formCollapse();
            $(".submitfeedback").toggleClass("hide");
        });


        // Sends a key value pair to be set
        // Example Usecase is logging in over ajax

        $(".sendval").on("click",function() {
            let varname = $(this).data("varname");
            let val = $(this).data("val");
            updateSessionVar("set", varname, val);
        });

        $(".toggleIcons").on("click",function() {
            let icons = $(this).data("icons").split(",");
            $(this).find("i").toggleClass(icons[0]).toggleClass(icons[1]);
        });

        $(".toggleChevron").on("click",function() {
            $(this).find("i").toggleClass("icons8-chevron-down").toggleClass("icons8-chevron-down");
        });

    })
