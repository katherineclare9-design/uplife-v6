const app = document.getElementById("app");


// =====================
// SETTINGS
// =====================

function changeMode(mode){

    userData.mode = mode;

    saveUserData();

    applyTheme();

    showPage("settings");

}



function toggleARFID(){

    userData.arfidSupport = !userData.arfidSupport;

    saveUserData();

    showPage("settings");

}



function applyTheme(){

    document.body.className = "";

    if(userData.mode === "Regular"){
        document.body.classList.add("regular-theme");
    }

    if(userData.mode === "Vacation"){
        document.body.classList.add("vacation-theme");
    }

    if(userData.mode === "Period"){
        document.body.classList.add("period-theme");
    }

}




// =====================
// PROFILE
// =====================


function createProfile(){


    userData.profileName =
    document.getElementById("profileName").value;


    userData.athleteType =
    document.getElementById("athleteType").value;


    userData.goal =
    document.getElementById("goal").value;



    userData.profileDate =
    new Date().toLocaleDateString();



    userData.profileCreated = true;


    saveUserData();


    checkBadges();


    showPage("profile");


}





// =====================
// XP
// =====================


function addXP(amount){


    userData.xp += amount;



    while(userData.xp >= userData.xpToNextLevel){


        userData.xp -= userData.xpToNextLevel;


        userData.level++;


        userData.xpToNextLevel += 100;


    }


}





// =====================
// WORKOUT COMPLETION
// =====================


function completeWorkout(workoutName){


    if(userData.completedToday.includes(workoutName)){

        return;

    }



    userData.completedToday.push(workoutName);



    userData.workoutsCompleted++;



    const workout = workoutTypes[workoutName];



    if(workout){


        addXP(workout.xp);



        switch(workout.category){


            case "core":
                userData.coreWorkouts++;
                break;


            case "strength":
                userData.strengthWorkouts++;
                break;


            case "backspot":
                userData.backspotWorkouts++;
                break;


            case "flexibility":
                userData.flexibilitySessions++;
                break;


            case "lowerBody":
                userData.lowerBodyWorkouts++;
                break;


            case "upperBody":
                userData.upperBodyWorkouts++;
                break;


            case "jump":
                userData.jumpSessions++;
                break;


        }


    }



    saveUserData();


    checkBadges();


}

// =====================
// PAGE DISPLAY
// =====================


function showPage(page){


let content = "";





// HOME

if(page === "home"){


content = `


<h1>💖 FULL OUT</h1>


<div class="card">

<h3>⭐ Level ${userData.level}</h3>

<p>${userData.xp}/${userData.xpToNextLevel} XP</p>

</div>



<div class="card">

<h3>🔥 Streak</h3>

<p>${userData.streak} Days</p>

</div>


`;


}







// TRAINING

if(page === "training"){



const days = [

"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"

];


const today = days[new Date().getDay()];



if(userData.mode === "Vacation"){


content = `


<h1>🤍 Vacation Workout</h1>


<div class="card">


${vacationWorkouts.workout.map(item => `


<label class="workout-item">


<input

type="checkbox"

${userData.completedToday.includes(item) ? "checked" : ""}

onchange="completeWorkout('${item}')"

>


<span>${item}</span>


</label>


`).join("")}



</div>


`;



}



else{


const workout = dailyWorkouts[today];



content = `


<h1>💪 Today's Workout</h1>


<h2>${today}</h2>





<div class="card">


<h3>🌅 Morning</h3>



${workout.morning.map(item => `


<label class="workout-item">


<input

type="checkbox"

${userData.completedToday.includes(item) ? "checked" : ""}

onchange="completeWorkout('${item}')"

>


<span>${item}</span>


</label>


`).join("")}


</div>






<div class="card">


<h3>

🌙 Nighttime

${userData.mode === "Period" ? "(Optional)" : ""}

</h3>




${workout.nighttime.map(item => `


<label class="workout-item">


<input

type="checkbox"

${userData.completedToday.includes(item) ? "checked" : ""}

onchange="completeWorkout('${item}')"

>


<span>${item}</span>


</label>


`).join("")}



</div>


`;



}


}







// PROFILE

if(page === "profile"){


if(!userData.profileCreated){


content = `


<h1>👤 Create Profile</h1>


<div class="card">


<input id="profileName" placeholder="Name">


<br><br>


<select id="athleteType">


<option>Cheer Athlete</option>

<option>Strength Athlete</option>

<option>Flexibility Athlete</option>


</select>


<br><br>


<input id="goal" placeholder="Goal">


<br><br>


<button onclick="createProfile()">

Save Profile

</button>


</div>


`;



}



else{


content = `


<h1>👤 Profile</h1>



<div class="card">


<h2>${userData.profileName}</h2>


<p>🤸 ${userData.athleteType}</p>


<p>🎯 ${userData.goal}</p>


<p>📅 Joined ${userData.profileDate}</p>


</div>





<div class="card">


<h3>📊 Training Stats</h3>


<p>🔥 Core: ${userData.coreWorkouts}</p>

<p>💪 Strength: ${userData.strengthWorkouts}</p>

<p>🏋️ Upper Body: ${userData.upperBodyWorkouts}</p>

<p>🦵 Lower Body: ${userData.lowerBodyWorkouts}</p>

<p>🤸 Backspot: ${userData.backspotWorkouts}</p>

<p>🩰 Flexibility: ${userData.flexibilitySessions}</p>


<hr>


<p>⭐ Level: ${userData.level}</p>

<p>XP: ${userData.xp}</p>

<p>💪 Workouts: ${userData.workoutsCompleted}</p>


</div>


`;

}


}








// BADGES

if(page === "badges"){


content = `


<h1>🏅 Badge Gallery</h1>


<div class="badge-gallery">


${Object.keys(badges).map(badge => `


<div class="badge-card">


<h2>${badges[badge].icon}</h2>


<h3>${badges[badge].name}</h3>


<p>${badges[badge].description}</p>


</div>


`).join("")}



</div>


`;



}







// SETTINGS

if(page === "settings"){


content = `


<h1>⚙️ Settings</h1>



<div class="card">


<h3>🌈 App Mode</h3>


<button onclick="changeMode('Regular')">

💖 Regular

</button>


<button onclick="changeMode('Vacation')">

🤍 Vacation

</button>


<button onclick="changeMode('Period')">

❤️ Period

</button>


</div>






<div class="card">


<h3>🥗 Nutrition</h3>



<label class="arfid-toggle">


<input

type="checkbox"

${userData.arfidSupport ? "checked" : ""}

onclick="toggleARFID()"

>


<span>

ARFID Support Feature

</span>


</label>



</div>







<div class="card">


<button onclick="resetProgress()">

Reset Progress

</button>


</div>



`;



}






app.innerHTML = content + `


<div class="bottom-nav">


<button onclick="showPage('home')">

🏠

</button>


<button onclick="showPage('training')">

💪

</button>


<button onclick="showPage('badges')">

🏅

</button>


<button onclick="showPage('profile')">

👤

</button>


<button onclick="showPage('settings')">

⚙️

</button>


</div>


`;



}






applyTheme();

showPage("home");
