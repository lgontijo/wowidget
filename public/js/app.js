// Declaring all global variables.
let bart_api_key;
let news_api_key;
let weather_api_id;
let weather_api_key;
let notas;
let notesWidget;
let remindersWidget;
let spotifyWidget;
let newsWidget;
let weatherWidget;
let transitWidget;
let none;
let v;

$(document).ready(() => {
  $(".modal").modal();
});

$(document).ready(() => {
  $(".tap-target").tapTarget();
});

document.addEventListener("DOMContentLoaded", () => {
  var elems = document.querySelectorAll(".fixed-action-btn");
  M.FloatingActionButton.init(elems, {
    direction: "left"
  });
});

$(document).ready(() => {
  $("select").formSelect();
});

// Firebase config.
var config = {
  apiKey: "AIzaSyCa8FeeJ3G6uinkNO7FnydAaB0FG5ycONY",
  authDomain: "widgets-3c5e0.firebaseapp.com",
  databaseURL: "https://widgets-3c5e0.firebaseio.com",
  projectId: "widgets-3c5e0",
  storageBucket: "",
  messagingSenderId: "803871080546"
};

firebase.initializeApp(config);

// Save user's notes when the save button is clicked.
saveNotes = () => {
  $("#save").on("click", element => {
    element.preventDefault();
    let userInput = $("#type").val();
    const key = firebase.database();
    const update = key.ref("notes");
    update.update({
      notes: userInput
    });
  });
};

// The following 6 functions returns the widgets value. Either 1 or 0.
getWidgetsValue = () => {
  const key = firebase.database();
  key.ref("state").on("value", r => {
    none = r.val();
    notesWidget = none.notes_value;
  });
};
getRemindersValue = () => {
  const key = firebase.database();
  key.ref("state").on("value", r => {
    none = r.val();
    remindersWidget = none.reminders_value;
  });
};
getSpotifyValue = () => {
  const key = firebase.database();
  key.ref("state").on("value", r => {
    none = r.val();
    spotifyWidget = none.spotify_value;
  });
};
getNewsValue = () => {
  const key = firebase.database();
  key.ref("state").on("value", r => {
    none = r.val();
    newsWidget = none.news_value;
  });
};
getWeatherValue = () => {
  const key = firebase.database();
  key.ref("state").on("value", r => {
    none = r.val();
    weatherWidget = none.weather_value;
  });
};
getTransitValue = () => {
  const key = firebase.database();
  key.ref("state").on("value", r => {
    none = r.val();
    transitWidget = none.transit_value;
  });
};

// This runs all of the functions below as soon as possible.
$(document).ready(() => {
  getWidgetsValue();
  getRemindersValue();
  getSpotifyValue();
  getNewsValue();
  getWeatherValue();
  getTransitValue();
});

// This function adds  1 to the data warehouse once the user creates a widget.
function addOne(widgetID) {
  const key = firebase.database();
  const update = key.ref("state");
  if (widgetID === "wid1") {
    update.update({
      notes_value: 1
    });
  } else if (widgetID === "wid2") {
    update.update({
      news_value: 1
    });
  } else if (widgetID === "wid3") {
    update.update({
      weather_value: 1
    });
  } else if (widgetID === "wid4") {
    update.update({
      spotify_value: 1
    });
  } else if (widgetID === "wid5") {
    update.update({
      reminders_value: 1
    });
  } else if (widgetID === "wid6") {
    update.update({
      transit_value: 1
    });
  }
}

// This function add 0 to tghe data warehouse once the user dismiss the widget by click on the "x".
function addZero(listID) {
  const key = firebase.database();
  const update = key.ref("state");
  if (listID === "#b1") {
    update.update({
      notes_value: 0
    });
  } else if (listID === "#a1") {
    update.update({
      news_value: 0
    });
  } else if (listID === "#c1") {
    update.update({
      weather_value: 0
    });
  } else if (listID === "#d1") {
    update.update({
      spotify_value: 0
    });
  } else if (listID === "#g1") {
    update.update({
      reminders_value: 0
    });
  } else if (listID === "#f1") {
    update.update({
      transit_value: 0
    });
  }
}

// Returns the stored user's input.
getUserNotes = () => {
  const key = firebase.database();
  key.ref("notes").on("value", results => {
    let noted = results.val();
    notas = noted.notes;
  });
};

// This function is responsible for the persistent state of the widgets. It checks the whether the widget value is 1 or 0, if the value is 1 then the widgets are displayed.
displaying = () => {
  if (notesWidget === 1) {
    n();
    sorts();
    saveNotes();
  }
  if (remindersWidget === 1) {
    r();
    sorts();
    btn();
  }
  if (spotifyWidget === 1) {
    s();
  }
  if (newsWidget === 1) {
    nw();
    sorts();
    update();
  }
  if (weatherWidget === 1) {
    w();
    sorts();
  }
  if (transitWidget === 1) {
    t();
    sorts();
  }
};

// This returns the API key value from the database and assign them to some local variables. This function runs with a setTimeout in all of the other JS files.
fire = () => {
  const key = firebase.database();
  key.ref("api").on("value", results => {
    allKeys = results.val();
    bart_api_key = allKeys.bart_api_key;
    news_api_key = allKeys.news_api_key;
    weather_api_id = allKeys.weather_api_id;
    weather_api_key = allKeys.weather_api_key;
    getUserNotes();
  });
};

// This removes the widget from the main view and updates the widgets value to 0.
close = (xid, divid) => {
  $(xid).on("click", () => {
    addZero(divid);
    $(divid).remove();
  });
};

//
btn = () => {
  $("#new-thing-button").on("click", element => {
    element.preventDefault();
    let template = `
    <div id='aqui'>
      <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter"><span>${v}</span>
    </div>
    `;
    $("#here").append(template);
    $("#new-thing").val("");
  });
};

function update() {
  for (var i = 0; i < theNewApiTitles.length; i++) {
    let newsTemplate = `
    <article class='article'>
    <a id='a' href='${theNewApiUrls[0]}'</a>
      <h4 class='title'>${theNewApiTitles[0]}</h4>
      <p id='source'>-${theNewApiSource[0]}</p>
    </article>
    `;
    $("#attach").append(newsTemplate);
  }
}

function sorts() {
  $("#sortable").sortable();
  $("#sortable").disableSelection();
}

function nw() {
  let template = `
  <li id='a1' class="ui-state-default">
    <div id='attach' class="mydiv">
      <div class="mydivheader">News<span id='x1' class='x' href='#'>x</div>
    </div>
  </li>
  `;
  $("#sortable").append(template);
  close("#x1", "#a1");
}

function n() {
  let template = `
  <li id='b1' class="ui-state-default">
    <div class="mydiv">
      <div class="mydivheader">Notes<span id='x2' class='x' href='#'>x</div>
       <button id='save'>Save</button>
      <textarea id='type'>${notas}</textarea>
    </div>
  </li>
  `;
  $("#sortable").append(template);
  close("#x2", "#b1");
}

function w() {
  let template = `
  <li id='c1' class="ui-state-default">
    <div class="mydiv">
      <div class="mydivheader">Weather<span id='x3' class='x' href='#'>x</div>
      <h3 padding="60px">${
        celciusTemp.currentTemp
      }°C <span id='e'>${weatherDescription}</span></h3>
    </div>
  </li>
  `;
  $("#sortable").append(template);
  close("#x3", "#c1");
}

function s(type) {
  let url;
  if (type === 1) {
    url =
      "https://embed.spotify.com/?uri=spotify%3Auser%3Aspotifycharts%3Aplaylist%3A37i9dQZEVXbMDoHDwVN2tF";
  }
  if (type === 2) {
    url =
      "https://embed.spotify.com/?uri=spotify%3Auser%3Aspotifycharts%3Aplaylist%3A37i9dQZEVXbLRQDuF5jeBp";
  }
  if (type === 3) {
    url =
      "https://embed.spotify.com/?uri=spotify%3Auser%3Aspotifycharts%3Aplaylist%3A37i9dQZEVXbMXbN3EUUhlg";
  }
  let template = `
  <li id='d1' class="ui-state-default">
    <div class="mydiv">
      <div class="mydivheader">Spotify<span id='x4' class='x' href='#'>x</div>
      <iframe src="${url}" margin-top="60px" width="400" height="480" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
  </li>
  `;
  $("#sortable").append(template);
  close("#x4", "#d1");
}

function t() {
  let template = `
  <li id='f1' class="ui-state-default">
    <div class="mydiv">
      <div class="mydivheader">Bart Times (Powell)<span id='x5' class='x' href='#'>x</div>
      <article class='article'>
      <h4 class='title'>Departing from Powell to ${destinationA1}</h4>
      <h5>Departs in ${minutesA1}, ${minutesA2}.</h5>
      </article>
      <article class='article'>
      <h4 class='title'>Departing from Powell to ${destinationB2}</h4>
      <h5>Departs in ${minutesB1}, ${minutesB2}.</h5>
      </article>
      <article class='article'>
      <h4 class='title'>Departing from Powell to ${destinationC3}</h4>
      <h5>Departs in ${minutesC1}, ${minutesC2}.</h5>
      </article>
      <article class='article'>
      <h4 class='title'>Departing from Powell to ${destinationD4}</h4>
      <h5>Departs in ${minutesD1}, ${minutesD2}.</h5>
      </article>
    </div>
  </li>
  `;
  $("#sortable").append(template);
  close("#x5", "#f1");
}

function r() {
  let template = `
  <li id='g1' class="ui-state-default">
    <div class="mydiv">
      <div class="mydivheader">Reminders<span id='x6' class='x' href='#'>x</div>
        <form>
          <input id="new-thing" />
          <input id="new-thing-button" type="submit" value="Create new thing"></submit>
          <div id='here'>
          </div>
        </form>
    </div>
  </li>
  `;
  $("#sortable").append(template);
  close("#x6", "#g1");
}

$("#news").on("click", function() {
  nw();
  sorts();
  update();
  addOne("wid2");
});

$("#notes").on("click", function() {
  n();
  sorts();
  saveNotes();
  addOne("wid1");
});

$("#weather").on("click", function() {
  w();
  sorts();
  addOne("wid3");
});

$("#spotify").on("click", function() {
  s();
  sorts();
  addOne("wid4");
});

$("#transit").on("click", function() {
  t();
  sorts();
  addOne("wid6");
});

$("#reminders").on("click", function() {
  r();
  sorts();
  btn();
  addOne("wid5");
});

$("#open").on("click", function() {
  openNav();
});

$(".closebtn").on("click", function(element) {
  element.preventDefault();
});

$("#next").on("click", function() {
  let picked = $("#which").val();
  console.log(picked);
  updateViewer(picked);
});

preventMultipleWidget = widgetName => {
  if (widgetName) {
    alert(
      "Sorry, you can only create one widget at the time. This feature is coming up next!"
    );
    return true;
  }
};

function updateViewer(picked) {
  let template;
  if (picked == 1) {
    template = `
		<form action="#">
		<p>
		<label>
		  <input id="global" type="checkbox" />
		  <span>Top 50 - Global</span>
		</label>
	  </p>
	  <p>
	  <p>
		<label>
		  <input id="usa" type="checkbox" />
		  <span>Top 50 - USA</span>
		</label>
	  </p>
	  <p>
	  <p>
		<label>
		  <input id="brasil" type="checkbox" />
		  <span>Top 50 - Brasil</span>
		</label>
	  </p>
	  <p>
	  	</form>
		`;
    $("#create_widget").append(template);
    // $('#next').css('display', 'none')
  }
  if (picked == 2) {
  }
  if (picked == 3) {
    template = `<form action="#">
		<p>
		<label>
		  <input id="currentLocation" type="checkbox" />
		  <span>Current Weather</span>
		</label>
	  </p>
	  <p>
	  <p>
		<label>
		  <input id="otherCity" type="checkbox" />
		  <span>Pick your City</span>
		</label>
	  </p>
	  	</form>
		`;
    $("#create_widget").append(template);
    // $('#next').css('display', 'none')
  }
  if (picked === 4) {
  }
  if (picked === 5) {
  }
  if (picked === null) {
    console.log("Something went wrong");
  }
  if (picked == "clear") {
    console.log(picked);
    template = `<form action="#">
	  	</form>
		`;
    $("#create_widget").append(template);
  }
}

$("#create").on("click", () => {
  if (document.getElementById("currentLocation")) {
    w();
    addOne("wid3");
  }
  if (document.getElementById("global").checked) {
    s(1);
    sorts();
    addOne("wid4");
  }
  if (document.getElementById("usa").checked) {
    s(2);
    sorts();
    addOne("wid4");
  }
  if (document.getElementById("brasil").checked) {
    if (preventMultipleWidget(none.spotify_value)) {
      return;
    } else {
      s(3);
      sorts();
      addOne("wid4");
    }
  }
});
