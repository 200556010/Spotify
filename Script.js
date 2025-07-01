// console.log("Let's write some JavaScript code here");

// let currentsong;
// let songs; // keep this global for next/prev buttons

// function formatTime(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
// }

// async function getsongs() {
//     let res = await fetch("http://127.0.0.1:5500/Music/");
//     let text = await res.text();

//     let parser = new DOMParser();
//     let doc = parser.parseFromString(text, "text/html");

//     let links = doc.getElementsByTagName("a");
//     let songs = [];

//     for (let link of links) {
//         if (link.href.endsWith(".mp3")) {
//             let parts = link.href.split("/");
//             songs.push(parts[parts.length - 1]);
//         }
//     }
//     return songs;
// }

// const playMusic = (track, pause = false) => {
//     if (!currentsong) currentsong = new Audio();

//     currentsong.src = "/Music/" + track;
//     if (!pause) currentsong.play();

//     document.querySelector(".songinfo").innerHTML = decodeURI(track);
//     document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

//     document.getElementById("playb").src = pause ? "./CSS/play2.svg" : "./CSS/pause.svg";
// };

// async function main() {
//     songs = await getsongs();  // assign to global variable
//     if (!songs.length) return;

//     playMusic(songs[0], true);

//     let songul = document.querySelector(".songlist ul");
//     for (const song of songs) {
//         let cleanName = decodeURIComponent(song);
//         songul.innerHTML += `
//             <li style="display: flex; flex-direction: row; align-items: center;">
//                 <img src="./CSS/play2.svg" width="25px" style="background-color: black; border-radius: 50%;">
//                 &nbsp;&nbsp;&nbsp;&nbsp;${cleanName}
//             </li>`;
//     }

//     document.querySelectorAll(".songlist li").forEach(item => {
//         item.addEventListener("click", () => {
//             playMusic(item.textContent.trim());
//         });
//     });

//     const playb = document.getElementById("playb");
//     playb.addEventListener("click", () => {
//         if (currentsong.paused) {
//             currentsong.play();
//             playb.src = "./CSS/pause.svg";
//         } else {
//             currentsong.pause();
//             playb.src = "./CSS/play2.svg";
//         }
//     });

//     currentsong.addEventListener("timeupdate", () => {
//         let current = currentsong.currentTime;
//         let duration = currentsong.duration;

//         if (!isNaN(duration)) {
//             document.querySelector(".songtime").innerHTML = `${formatTime(current)} / ${formatTime(duration)}`;
//             let percent = (current / duration) * 100;
//             document.getElementById("circlee").style.left = percent + "%";
//         }
//     });

//     document.querySelector(".seekbar").addEventListener("click", (e) => {
//         let seekbar = e.target.getBoundingClientRect();
//         let offsetX = e.clientX - seekbar.left;
//         let percent = (offsetX / seekbar.width) * 100;
//         document.getElementById("circlee").style.left = percent + "%";
//         if (currentsong.duration) {
//             currentsong.currentTime = (currentsong.duration * percent) / 100;
//         }
//     });

//     // Fix: Get prev and next elements, add null check
//     const prev = document.getElementById("prev");
//     const next = document.getElementById("next");

//     prev.addEventListener("click", () => {
//         let currentTrack = currentsong.src.split("/").pop();
//         let index = songs.indexOf(currentTrack);
//         if (index > 0) {
//             playMusic(songs[index - 1]);
//         }
//     });

//     next.addEventListener("click", () => {
//         let currentTrack = currentsong.src.split("/").pop();
//         let index = songs.indexOf(currentTrack);
//         if (index < songs.length - 1) {
//             playMusic(songs[index + 1]);
//         }
//     });

//     // Image modal open
//     document.querySelectorAll(".card").forEach(card => {
//         card.addEventListener("click", () => {
//             const img = card.querySelector("img[src$='.jpg'], img[src$='.png']");
//             const modal = document.getElementById("imgModal");
//             const modalImg = document.getElementById("modalImg");

//             if (img) {
//                 modalImg.src = img.src;
//                 modal.style.display = "flex";
//             }
//         });
//     });

//     // Close modal when clicking outside image or modal background
//     document.getElementById("imgModal").addEventListener("click", (e) => {
//         if (e.target.id === "imgModal") {  // only if background clicked
//             document.getElementById("imgModal").style.display = "none";
//         }
//     });

// document.querySelectorAll(".card").forEach(card => {
//   card.addEventListener("click", () => {
//     let id = card.id;
//     let songIndex = cardIdToSongIndex[id];

//     if (songIndex !== undefined && songs[songIndex]) {
//       playMusic(songs[songIndex]);
//     }

//     // your existing modal code here...
//     const img = card.querySelector("img[src$='.jpg'], img[src$='.png']");
//     const modal = document.getElementById("imgModal");
//     const modalImg = document.getElementById("modalImg");
//     if (img) {
//       modalImg.src = img.src;
//       modal.style.display = "flex";
//     }
//   });
// });









console.log("Let's write some JavaScript code here");

let currentsong;
let songs; // global for next/prev buttons

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

async function getsongs() {
  let res = await fetch("http://127.0.0.1:5500/Music/");
  let text = await res.text();

  let parser = new DOMParser();
  let doc = parser.parseFromString(text, "text/html");

  let links = doc.getElementsByTagName("a");
  let songs = [];

  for (let link of links) {
    if (link.href.endsWith(".mp3")) {
      let parts = link.href.split("/");
      songs.push(parts[parts.length - 1]);
    }
  }
  return songs;
}

const playMusic = (track, pause = false) => {
  if (!currentsong) currentsong = new Audio();

  currentsong.src = "/Music/" + track;
  if (!pause) currentsong.play();

  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

  document.getElementById("playb").src = pause ? "./CSS/play2.svg" : "./CSS/pause.svg";
};

async function main() {
  songs = await getsongs();
  if (!songs.length) return;

  playMusic(songs[0], true);

  let songul = document.querySelector(".songlist ul");
  for (const song of songs) {
    let cleanName = decodeURIComponent(song);
    songul.innerHTML += `
      <li style="display: flex; flex-direction: row; align-items: center;">
          <img src="./CSS/play2.svg" width="25px" style="background-color: black; border-radius: 50%;">
          &nbsp;&nbsp;&nbsp;&nbsp;${cleanName}
      </li>`;
  }

  // Play music when clicking a song in the sidebar list
  document.querySelectorAll(".songlist li").forEach(item => {
    item.addEventListener("click", () => {
      playMusic(item.textContent.trim());
    });
  });

  const playb = document.getElementById("playb");
  playb.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play();
      playb.src = "./CSS/pause.svg";
    } else {
      currentsong.pause();
      playb.src = "./CSS/play2.svg";
    }
  });

  currentsong.addEventListener("timeupdate", () => {
    let current = currentsong.currentTime;
    let duration = currentsong.duration;

    if (!isNaN(duration)) {
      document.querySelector(".songtime").innerHTML = `${formatTime(current)} / ${formatTime(duration)}`;
      let percent = (current / duration) * 100;
      document.getElementById("circlee").style.left = percent + "%";
    }
  });

  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let seekbar = e.target.getBoundingClientRect();
    let offsetX = e.clientX - seekbar.left;
    let percent = (offsetX / seekbar.width) * 100;
    document.getElementById("circlee").style.left = percent + "%";
    if (currentsong.duration) {
      currentsong.currentTime = (currentsong.duration * percent) / 100;
    }
  });

  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  prev.addEventListener("click", () => {
    let currentTrack = currentsong.src.split("/").pop();
    let index = songs.indexOf(currentTrack);
    if (index > 0) {
      playMusic(songs[index - 1]);
    }
  });

  next.addEventListener("click", () => {
    let currentTrack = currentsong.src.split("/").pop();
    let index = songs.indexOf(currentTrack);
    if (index < songs.length - 1) {
      playMusic(songs[index + 1]);
    }
  });

  // CARD CLICK TO PLAY SONG + OPEN MODAL IMAGE
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      // Get data-song-index attribute (make sure your HTML has this!)
      let index = card.getAttribute("data-song-index");
      if (index !== null && songs[index]) {
        playMusic(songs[index]);
      }

      // Modal image logic
      const img = card.querySelector("img[src$='.jpg'], img[src$='.png']");
      const modal = document.getElementById("imgModal");
      const modalImg = document.getElementById("modalImg");
      if (img) {
        modalImg.src = img.src;
        modal.style.display = "flex";
      }
    });
  });

  // Close modal when clicking outside the image (on background)
  document.getElementById("imgModal").addEventListener("click", (e) => {
    if (e.target.id === "imgModal") {
      document.getElementById("imgModal").style.display = "none";
    }
  });
}

main();






// }

// main();  