import todo from "/javascript/todo.mjs";
import insertCalendar from "/javascript/calendar.mjs";

$(document).ready(function () {
  insertCalendar();
  todo();
  $(".form").hide();

  $(".menu").on("click", function () {
    $(".menu-btn").toggleClass("open");
    $(".form").toggle("slow");
  });

  $(function () {
    $(".form_display_list_todo").draggable({
      opacity: 0.7,
      //helper: "clone",
      revert: true,
      /*start: function () {
        $(".form").css({
          "z-index": "-1",
          opacity: "0",
        });
      },
      stop: function () {
        $(".form").css({ "z-index": "1", opacity: "1" });
      },*/
    });
    $(".on-drop").droppable({
      accept: ".form_display_list_todo",
      classes: {
        "ui-droppable-active": "ui-state-default",
      },
      drop: function (event, ui) {
        $(this).addClass("ui-state-highlight").find("td").html("Dropped!");
      },
    });
  });
});
