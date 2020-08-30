export default inserCalendar;

function inserCalendar() {
  class calendar {
    constructor(date, jour, premierJour, mois, annee, moisActuel) {
      this.date = date;
      this.jour = jour;
      this.premierJour = premierJour;
      this.mois = mois;
      this.annee = annee + 1900;
      this.moisActuel = moisActuel;
      this.anneeActuelle = anneeActuelle;
    }

    nomMois = [
      "janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Decembre",
    ];

    nomJours = {
      complets: [
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
        "dimanche",
      ],
      raccourcis: ["lu", "ma", "me", "je", "ve", "sa", "di"],
    };

    joursParMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    bissextile = () => {
      if (this.annee % 4 === 0) {
        if (this.annee % 100 !== 0) {
          this.joursParMois[1] = 29;
        }
      } else if (this.annee % 400 === 0) {
        this.joursParMois[1] = 29;
      }
    };

    semIndex = ["S0", "S1", "S2", "S3", "S4", "S5"];

    createMonthTable = () => {
      // Table lengend
      $(".calendar-month-name").text(
        `${this.nomMois[this.mois]} ${this.annee}`
      );
      $(".calendar>div.create").append(
        '<table class="calendar-table"></table>'
      );
      $(".calendar-table").append(
        '<thead class="calendar-table-head"></thead>'
      );
      $(".calendar-table-head").append(
        `<tr class="calendar-table-head-date"></tr>`
      );
      $(".calendar-table-head").append(
        '<tr class="calendar-table-head-row"></tr>'
      );

      for (let i = 0; i < 7; i++) {
        $(".calendar-table-head-row").append(
          `<th class="calendar-table-head-row-name">${this.nomJours.raccourcis[i]}</th>`
        );
      }

      $(".calendar-table").append(
        '<tbody class="calendar-table-body"></tbody>'
      );

      for (let i = 0; i < 6; i++) {
        $(".calendar-table-body").append(
          `<tr class="calendar-table-body-row ${this.semIndex[i]}"></tr>`
        );
      }

      let jourIndex = 1;
      let semaineIndex = 1;

      /* /!\/!\ SUNDAY IS THE FIRST DAY ;) /!\/!\  */

      // Premiere ligne (S0)
      /*--------------------------------*/
      if (this.premierJour === 1) {
        // Si le mois commence le lundi
        for (let i = 1; i <= 7; i++) {
          $(".S0").append(
            `<td class="calendar-table-body-ceil on-drop" id="${jourIndex}-${this.mois}-${this.annee}">${jourIndex}</td>`
          );
          jourIndex++;
        }
      } else if (this.premierJour === 0) {
        // Si le mois commence un dimanche
        if (this.mois === 0) {
          // Si debut de l'année
          for (let i = 5; i >= 0; i--) {
            let jourAffiche = this.joursParMois[11] - i;
            $(".S0").append(
              `<td class="calendar-table-body-ceil on-drop notThisMonth" id="${jourAffiche}-${
                this.mois
              }-${this.annee - 1}">${jourAffiche}</td>`
            );
          }
          $(".S0").append(
            `<td class="calendar-table-body-ceil on-drop" id="${jourIndex}-${
              this.mois
            }-${this.annee - 1}">${jourIndex}</td>`
          );
          jourIndex++;
        } else {
          // Si toujours dans l'année en cours
          for (let i = 5; i >= 0; i--) {
            let jourAffiche = this.joursParMois[this.mois - 1] - i;
            $(".S0").append(
              `<td class="calendar-table-body-ceil on-drop notThisMonth" id="${jourAffiche}-${this.mois}-${this.annee}">${jourAffiche}</td>`
            );
          }
          $(".S0").append(
            `<td class="calendar-table-body-ceil on-drop" id="${jourIndex}-${this.mois}-${this.annee}">${jourIndex}</td>`
          );
          jourIndex++;
        }
      } else {
        // Si le mois commence en semaine
        if (this.mois === 0) {
          // Si debut d'année (mois de janvier)
          for (let i = 1; i < this.premierJour; i++) {
            let jourAffiche = this.joursParMois[11] - this.premierJour + 1 + i;
            $(".S0").append(
              `<td class="calendar-table-body-ceil on-drop notThisMonth" id="${jourAffiche}-${
                this.mois
              }-${this.annee - 1}">${jourAffiche}</td>`
            );
          }
          if (this.premierJour <= 6) {
            for (let i = 7; i > this.premierJour - 1; i--) {
              $(".S0").append(
                `<td class="calendar-table-body-ceil on-drop" id="${jourIndex}-${
                  this.mois + 1
                }-${this.annee - 1}">${8 - i}</td>`
              );
              jourIndex++;
            }
          }
        } else {
          // Si toujours dans l'année en cours
          for (let i = 1; i < this.premierJour; i++) {
            let jourAffiche =
              this.joursParMois[this.mois - 1] - this.premierJour + 1 + i;
            $(".S0").append(
              `<td class="calendar-table-body-ceil on-drop notThisMonth" id="${jourAffiche}-${this.mois}-${this.annee}">${jourAffiche}</td>`
            );
          }
          if (this.premierJour <= 6) {
            for (let i = 7; i > this.premierJour - 1; i--) {
              $(".S0").append(
                `<td class="calendar-table-body-ceil on-drop" id="${jourIndex}-${
                  this.mois + 1
                }-${this.annee}">${8 - i}</td>`
              );
              jourIndex++;
            }
          }
        }
      }
      // Seconde ligne (S1) à derniere -1
      /*--------------------------------*/
      while (jourIndex + 7 < this.joursParMois[this.mois]) {
        for (let i = 0; i < 7; i++) {
          $(`.S${semaineIndex}`).append(
            `<td class="calendar-table-body-ceil on-drop" id="${jourIndex}-${
              this.mois + 1
            }-${this.annee}">${jourIndex}</td>`
          );
          jourIndex++;
        }
        semaineIndex++;
      }

      // Derniere ligne du mois en cours
      /*--------------------------------*/
      let moisSuivant = 1;
      for (let i = 0; i < 7; i++) {
        if (jourIndex <= this.joursParMois[this.mois]) {
          $(`.S${semaineIndex}`).append(
            `<td class="calendar-table-body-ceil on-drop" id="${jourIndex}-${
              this.mois + 1
            }-${this.annee}">${jourIndex}</td>`
          );
          jourIndex++;
        } else {
          $(`.S${semaineIndex}`).append(
            `<td class="calendar-table-body-ceil on-drop notThisMonth" id="${moisSuivant}-${
              this.mois + 2
            }-${this.annee}">${moisSuivant}</td>`
          );
          moisSuivant++;
        }
      }

      // Si il reste une ligne
      /*--------------------------------*/
      if (semaineIndex < 5) {
        semaineIndex++;
        for (let i = 0; i < 7; i++) {
          if (jourIndex <= this.joursParMois[this.mois]) {
            $(`.S${semaineIndex}`).append(
              `<td class="calendar-table-body-ceil on-drop" id="${jourIndex}-${
                this.mois + 1
              }-${this.annee}">${jourIndex}</td>`
            );
            jourIndex++;
          } else {
            $(`.S${semaineIndex}`).append(
              `<td class="calendar-table-body-ceil on-drop notThisMonth" id="${moisSuivant}-${
                this.mois + 2
              }-${this.annee}">${moisSuivant}</td>`
            );
            moisSuivant++;
          }
        }
      }
      $(`#${this.jour}-${this.moisActuel + 1}-${this.anneeActuelle}`).addClass(
        "isThisDay"
      );
    };
  }

  let date, jour, premierJour, mois, annee, newCalendar;
  let dateActuelle = new Date();
  const moisActuel = dateActuelle.getMonth();
  const anneeActuelle = dateActuelle.getYear() + 1900;

  function createNewCalendar() {
    newCalendar = new calendar(
      date,
      jour,
      premierJour,
      mois,
      annee,
      moisActuel,
      anneeActuelle
    );
    newCalendar.bissextile();
    newCalendar.createMonthTable();
  }

  function dateGen(prevOrNext) {
    date = new Date();
    if (prevOrNext == "init") {
      // mois initial
      mois = date.getMonth();
      annee = date.getYear();
    } else if (prevOrNext == "prev") {
      // click du bouton "prev"
      mois--;
      if (mois < 0) {
        mois = 11;
        annee--;
      }
    } else if (prevOrNext == "next") {
      // click du bouton "next"
      mois++;
      if (mois > 11) {
        mois = 0;
        annee++;
      }
    }
    date.setMonth(mois);
    date.setYear(annee + 1900);
    jour = date.getDate();
    premierJour = date;
    premierJour.setDate(1);
    premierJour = premierJour.getDay();
  }

  dateGen("init");
  createNewCalendar();

  $(".prev").on("click", function () {
    $(".calendar>div.create").empty();
    dateGen("prev");
    createNewCalendar();
  });

  $(".next").on("click", function () {
    $(".calendar>div.create").empty();
    dateGen("next");
    createNewCalendar();
  });

  /*
  console.log("Full Date : " + newCalendar.date);
  console.log("jours : " + newCalendar.joursParMois[mois]);
  console.log("Day : " + newCalendar.jour);
  console.log("premier jour : " + premierJour);
  console.log("mois : " + newCalendar.nomMois[mois]);
  console.log("annee : " + annee);
  */
}
