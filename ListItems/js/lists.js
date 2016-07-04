function initialize() {

// WRAP LIST TEXT IN A SPAN, AND APPLY FUNCTIONALITY TABS
$("#list li")
.wrapInner("<span>")
.append("<div class='draggertab tab'></div><div class='colortab tab'></div></div><div class='deletetab tab'></div><div class='donetab tab'></div>");
};

$("li").live("click", function() {
   alert("This is better");
});

$(".donetab").live("click", function() {
   alert("Inside donetab");
});

$(".colortab").live("click", function(){
  alert("Inside colortab");
});

$(".deletetab").live("click", function(){
  alert("Inside deletetab");
});

$("#list").sortable({
    handle   : ".draggertab",
    update   : function(event, ui){
       
        // Developer, this function fires after a list sort, commence list saving!

    },
    forcePlaceholderSize: true
});


$(".donetab").live("click", function() {

    if(!$(this).siblings('span').children('img.crossout').length) {
        $(this)
            .parent()
                .find("span")
                .append("<img src='/images/crossout.png' class='crossout' />")
                .find(".crossout")
                .animate({
                    width: "100%"
                })
                .end()
            .animate({
                opacity: "0.5"
            },
            "slow",
            "swing",
            function() {
                           
                // DEVELOPER, the user has marked this item as done, commence saving!

            })
    }
    else
    {
        $(this)
            .siblings('span')
                .find('img.crossout')
                    .remove()
                    .end()
                .animate({
                    opacity : 1
                },
                "slow",
                "swing",
                function() {
                           
                // DEVELOPER, the user has UNmarked this item as done, commence saving!

            })
            
    }
});

$(".colortab").live("click", function(){

    $(this).parent().nextColor();

    $.ajax({
       
        // DEVELOPER, the user has toggled the color on this list item, commence saving!

    });
});


$(".deletetab").live("click", function(){

    var thiscache = $(this);
            
    if (thiscache.data("readyToDelete") == "go for it") {
        $.ajax({
          
              // DEVELOPER, the user wants to delete this list item, commence deleting!

              success: function(r){
                    thiscache
                            .parent()
                                .hide("explode", 400, function(){$(this).remove()});

                    // Make sure to reorder list items after a delete!

              }

        });
    }
    else
    {
        thiscache.animate({
            width: "44px",
            right: "-64px"
        }, 200)
        .data("readyToDelete", "go for it");
    }
});


jQuery.fn.nextColor = function() {

    var curColor = $(this).attr("class");

    if (curColor == "colorBlue") {
        $(this).removeClass("colorBlue").addClass("colorYellow").attr("color","2");
    } else if (curColor == "colorYellow") {
        $(this).removeClass("colorYellow").addClass("colorRed").attr("color","3");
    } else if (curColor == "colorRed") {
        $(this).removeClass("colorRed").addClass("colorGreen").attr("color","4");
    } else {
        $(this).removeClass("colorGreen").addClass("colorBlue").attr("color","1");
    };

};

function bindAllTabs(editableTarget) {
   
    $(editableTarget).editable("/path/for/DEVELOPER/to/save.php", {
        id        : 'listItemID',
        indicator : 'Saving...',
        tooltip   : 'Double-click to edit...',
        event     : 'dblclick',
        submit    : 'Save',
        submitdata: {action : "update"}
    });
    
}

