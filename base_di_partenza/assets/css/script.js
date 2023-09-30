// // ottieni l'elemento che contiene il testo
// const textElement = document.querySelector("g[aria-label] text[opacity='1']");

// // ottieni il testo completo
// const fullText = textElement.textContent;

// // dividi il testo in un array di singole lettere
// const letters = fullText.split(" ");

// const lettersToModify = 1;

// const randomLetters = () => {
//   console.log(textElement.children);
//   let modified = [];
//   let previous = undefined;
//   //   for (let i = 0; i < lettersToModify; i++) {
//   let randomLetter = 0;
//   console.log(
//     "RANDOM LETTER: ",
//     textElement.children[randomLetter].getAttribute("opacity")
//   );
//   let intervalCycleCount = 0;
//   const interval = setInterval(() => {
//     if (intervalCycleCount === lettersToModify) {
//       console.log("vero");
//       // Dopo 5 secondi, reimposta l'opacità a 1
//       let index = 0;
//       //   const interval2 = setInterval(() => {
//       console.log("INDEX", index);
//       const interval2 = setInterval(() => {
//         // for (let i = 0; i < modified.length; i++) {
//         if (index === modified.length) {
//           clearInterval(interval2);
//         } else {
//           modified[index].setAttribute("opacity", 1);
//           index++;
//           //   clearInterval(interval2);
//         }
//         console.log("modified[INDEX]", modified[0]);
//         // }
//       }, 1050);
//       //   }, 10);
//       clearInterval(interval);
//       return;
//     } else if (previous != undefined) {
//       do {
//         randomLetter = Math.floor(Math.random() * textElement.children.length);
//       } while (
//         randomLetter === previous &&
//         parseInt(textElement.children[randomLetter].getAttribute("opacity")) !==
//           1
//       );
//       previous = randomLetter;
//     } else {
//       randomLetter = Math.floor(Math.random() * textElement.children.length);
//     }
//     textElement.children[randomLetter].setAttribute("opacity", 0);
//     modified.push(textElement.children[randomLetter]);
//     console.log(
//       "MODIFIED: ",
//       modified.length,
//       modified,
//       previous,
//       randomLetter
//     );
//     intervalCycleCount++;
//   }, 10);
//   return;
//   //   }
//   //   setTimeout(() => {
//   //     for (let i = 0; i < modified.length; i++) {
//   //       if (i >= modified.length) {
//   //         clearInterval(interval2);
//   //       } else {
//   //         modified[i].setAttribute("opacity", 1);
//   //         index++;
//   //       }
//   //     }
//   //   }, 2000);
// };

// setInterval(() => {
//   randomLetters();
// }, 6000);

// // setInterval(() => {
// //   setTimeout(randomLetters, 6000);
// // }, 6000);

// const textElement = document.querySelectorAll("g[aria-label] *")[7];
// console.log(textElement);

// const textElementArr = Array.from(textElement);
// const finalArr = textElementArr.filter(
//   (obj) => obj.getAttribute("opacity") === "0"
// );
// console.log(finalArr);

// ottieni l'elemento del testo dall'SVG
// const textElement = document.querySelectorAll("g[aria-label] *");
// const textElementArr = Array.from(textElement);
// console.log(textElement[27].getAttribute("opacity"));

// for (i in textElement) {
//   if (textElement[i].hasAttribute("opacity")) {
//     console.log(textElement[i]);
//   }
// }
// const finalArr = textElementArr.filter(
//   (obj) =>
//     obj.innerHTML.includes('<g opacity="1" transform="matrix(1,0,0,1,0,0)') &&
//     obj.style.width > 15
// );

// // ottieni il testo dall'attributo aria-label
// // var textContent = textElement.getAttribute("aria-label");

// // rimuovi gli spazi e crea un array di lettere
// // var lettersArray = textContent.replace(/\s/g, "").split("");

// console.log(textElementArr, finalArr);

// QUESTA È LA VERSIONE FUNZIONANTE:
/* SPIEGAZIONE:
  non riuscivo a capire come funzionava l'svg.
  dopo secoli di ricerche, ho trovato questo modo poco convenzionale di
  trovare tutte le lettere effettivamente visibili.
  nell'algoritmo precedente, che ho reso inutilizzabile a furia di fare tentativi,
  inizialmente funzionava tutto.
  prendeva tutto il testo con un queryselector, selezionava tot
  caratteri casuali e ne cambiama l'opacità.
  il problema era che selezionava anche lettere con opacità 0 nell'svg.
  ho provato a filtrarle usando getAttribute('opacity'), ma per qualche motivo
  anche elementi che avevano la opacity ad 1, non erano visualizzati.
  dopo aver guardato per qualche ora l'svg e aver fatto svariate prove,
  mi sono reso conto che trovando tutti gli elementi 'g[aria-label] *[style*="display: block"],
  se si saliva di due "parenti", si aveva l'opacità EFFETTIVA del carattere.
  ma cosa più importante, usando [style*="display: block"]
  filtro e trovo solo le lettere che effettivamente sono "reali",
  e non quelle con width: 0.
  
  un altro metodo sarebbe potuto essere assegnare una classe manualmente ad
  ogni  lettera nell'svg, ma sarebbe stato difficile.
  
  non sono propriamente 'soddisfatto' del risultato,
  soprattutto perchè ancora non ho compreso a pieno come funzionano gli svg,
  specialmente questo. sono comunque felice di averlo fatto funzionare in qualche modo.'*/

const letterGroups = document.querySelectorAll(
  'g[aria-label] *[style*="display: block"]'
);

const visibleLetterGroups = Array.from(letterGroups).filter((group) => {
  const opacity = group.getAttribute("opacity");
  return opacity > 0;
});

const visiblePaths = visibleLetterGroups.map((group) => {
  if (group.parentElement.parentElement.getAttribute("opacity") === "1") {
    return group.parentElement.parentElement;
  }
});

console.log("visible PATHS PRIMA DEL FOR!", visiblePaths);

for (let i = visiblePaths.length; i >= 0; i--) {
  if (visiblePaths[i] === undefined) {
    console.log(visiblePaths.splice(i, 1));
  } else {
    console.log("visible PATHS", visiblePaths[i]);
  }
  console.log("FINITO IL FOR:", visiblePaths[i]);
}

console.log("visible PATHS DOPO IL FOR", visiblePaths);
console.log(visiblePaths, visibleLetterGroups);

const lettersToModify = 30;

const randomLetters = () => {
  let modified = [];
  let previous = undefined;

  let randomLetter = 0;

  let intervalCycleCount = 0;
  let index = 0;
  const interval = setInterval(() => {
    if (intervalCycleCount === lettersToModify) {
      const interval2 = setInterval(() => {
        if (index === modified.length) {
          clearInterval(interval2);
          return;
        } else {
          modified[index].setAttribute("opacity", 1);
          index++;
        }
      }, 100);
      clearInterval(interval);
    } else if (previous === undefined) {
      do {
        randomLetter = Math.floor(Math.random() * visiblePaths.length);
      } while (
        randomLetter === previous &&
        parseInt(visiblePaths[randomLetter].getAttribute("opacity")) !== 1
      );
    } else {
      randomLetter = Math.floor(Math.random() * visiblePaths.length);
    }
    previous = randomLetter;

    visiblePaths[randomLetter].setAttribute("opacity", 0);
    modified.push(visiblePaths[randomLetter]);
    intervalCycleCount++;
  }, 100);
};

setInterval(() => {
  randomLetters();
}, 6000);

// questa parte gestisce il cambio di colore allo scroll
const scrollHeader = () => {
  const header = document.querySelector("header");
  const hero = document.querySelector(".hero-section");

  const btn = document.querySelector("header nav ul button.btn");

  window.addEventListener("scroll", function () {
    console.log(hero.offsetHeight * 0.85, window.scrollY);
    if (window.scrollY >= hero.offsetHeight * 0.85) {
      header.style.backgroundColor = "rgba(255, 255, 255, 1)";
      btn.classList.add("scrolled");
    } else {
      header.style.backgroundColor = "rgb(255, 192, 23)";
      btn.classList.remove("scrolled");
    }
  });
};

scrollHeader();
