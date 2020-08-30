export default todo;
//const author = "Cdc_429_laB";
function todo() {
  for (let i = 0; i < localStorage.length; i++) {
    $("ol.form_display_list").append(
      `<li class="form_display_list_todo" draggable="true">${localStorage.getItem(
        i
      )}<div class="task-del">x</div></li>`
    );
  }

  $("#progress_bar").attr("value", localStorage.length);

  //Show/Hide empty list message
  function emptyList(e) {
    if (localStorage.length === 0) {
      $(".empty").show("slow");
    } else {
      $(".empty").hide("slow");
    }
  }
  emptyList();

  //add a "TODO" element
  $("#add_btn").on("click", function (e) {
    e.preventDefault();
    const input = $("#add_input").val();
    if (localStorage.length < 10 && input !== "") {
      $("ol.form_display_list").append(
        `<li class="form_display_list_todo" draggable="true">${input}<div class="task-del">x</div></li>`
      );
      $("#add_input").val("");
      localStorage.setItem(localStorage.length, input);
    } else if (localStorage.length >= 10 && input !== "") {
      alert(
        "La liste contient déja le nombre maximum de taches.\nMerci d'en supprimer pour en ajouter une nouvelle"
      );
    }
    $("#progress_bar").attr("value", localStorage.length);
    emptyList();
  });

  //remove a "TODO" element
  $(".task-del").on("click", function (e) {
    let id = $(e.target).index();
    if (localStorage.length !== 0) {
      if (confirm("Voulez-vous supprimer cette tache?")) {
        $(".form_display_list_todo").eq(id).remove();
        if (id + 1 <= localStorage.length) {
          localStorage.removeItem(id);
          for (let i = id; i < localStorage.length; i++) {
            localStorage.setItem(i, localStorage.getItem(i + 1));
            localStorage.removeItem(i + 1);
          }
        } else {
          localStorage.removeItem(id);
        }
      }
      $("#progress_bar").attr("value", localStorage.length);
    }
    emptyList();
  });
}
