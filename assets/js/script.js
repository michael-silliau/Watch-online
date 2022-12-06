// définir un petit point rouge au-dessus de la navigation des icônes
window.addEventListener("load", () => {
  let checkbox = document.getElementsByTagName("input");
  let notif = document.getElementById("nav-not");

  // vérifier si au moins une des cases à cocher sur le DOM est cochée , on boucle sur tout les inputs pour savoir si check
  const checkboxCheck = () => {
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        return true;
      }
    }
    return false;
  };

  // définir un point rouge si true point rouge
  const setNotif = () => {
    if (checkboxCheck()) {
      // console.log('true');
      notif.style.visibility = "visible";
      notif.style.opacity = "1";
    } else {
      // console.log('false');
      notif.style.visibility = "hidden";
      notif.style.opacity = "0";
    }
  };

  // vérifier une fois si un point rouge est nécessaire
  setNotif();

  // regarder tout changement
  document.addEventListener("click", setNotif);
});
