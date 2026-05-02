// app.js
// Requires:
//
//   hentaigana-map.js
//   index.html
//
// and the global function:
//
//   showGlyphInfo()


const map =
  window.hentaiganaMap || {};


const smallKanaMap = {

  "ぁ": "あ",
  "ぃ": "い",
  "ぅ": "う",
  "ぇ": "え",
  "ぉ": "お",

  "ゃ": "や",
  "ゅ": "ゆ",
  "ょ": "よ",

  "っ": "つ"
};



const input =
  document.getElementById(
    "input"
  );


const output =
  document.getElementById(
    "output"
  );


const status =
  document.getElementById(
    "status"
  );


const rerenderButton =
  document.getElementById(
    "rerender"
  );



function chooseRandom(
  array
) {

  return array[
    Math.floor(
      Math.random()
      *
      array.length
    )
  ];
}



function getBaseKana(
  char
) {

  const normalized =
    char.normalize(
      "NFD"
    );

  const base =
    normalized[0];

  return (
    smallKanaMap[
      base
    ]
    ||
    base
  );
}



function getMarks(
  char
) {

  return char
    .normalize(
      "NFD"
    )
    .slice(1);
}



function render() {

  output.innerHTML =
    "";



  for (
    const char
    of
    [...input.value]
  ) {

    const base =
      getBaseKana(
        char
      );


    const marks =
      getMarks(
        char
      );



    if (
      map[
        base
      ]
    ) {

      const choice =
        chooseRandom(
          map[
            base
          ]
        );



      const span =
        document
          .createElement(
            "span"
          );



      span.className =
        "glyph";



      span.textContent =
        choice.glyph
        +
        marks;



      span.addEventListener(

        "click",

        () => {

          showGlyphInfo(

            char,

            choice

          );
        }
      );



      output.appendChild(
        span
      );

    }

    else {

      output.appendChild(

        document
          .createTextNode(
            char
          )
      );
    }
  }
}



if (
  map
) {

  status.textContent =

    "Map loaded.";
}



input
  .addEventListener(

    "input",

    render
  );



rerenderButton
  .addEventListener(

    "click",

    render
  );



document
  .fonts
  .load(

    "32px HentaiganaFont"
  )

  .then(

    () => {

      status.textContent =

        "Font loaded. Map loaded.";
    }
  )

  .catch(

    () => {

      status.textContent =

        "Font failed to load.";
    }
  );