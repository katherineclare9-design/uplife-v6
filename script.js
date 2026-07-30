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



    addDiaryEntry(
        "achievement",
        "Profile Created",
        "Started your UpLift journey",
        10
    );



    saveUserData();


    checkBadges();


    showPage("profile");


}








// =====================
// XP SYSTEM
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






    addDiaryEntry(

        "workout",

        workoutName,

        "Completed workout",

        workout ? workout.xp : 0

    );






    saveUserData();



    checkBadges();



}
// =====================
// NUTRITION FUNCTIONS
// =====================


function addNutritionFood(){



    const food =
    document.getElementById("foodName").value;



    const calories =
    Number(document.getElementById("foodCalories").value) || 0;



    const meal =
    document.getElementById("foodMeal").value;



    const note =
    document.getElementById("foodNote").value;





    if(food === ""){

        return;

    }





    addNutritionEntry({



        food:food,

        calories:calories,

        meal:meal,

        note:note,

        date:new Date().toLocaleDateString()



    });






    showPage("nutrition");



}







function saveCurrentMeal(){



    const food =
    document.getElementById("foodName").value;



    const calories =
    Number(document.getElementById("foodCalories").value) || 0;



    const meal =
    document.getElementById("foodMeal").value;




    if(food === ""){

        return;

    }




    saveMeal({



        food:food,

        calories:calories,

        meal:meal



    });






    showPage("nutrition");



}







function addSavedMealToDay(index){



    addSavedMeal(index);



    showPage("nutrition");


}







function removeNutritionEntry(index){



    userData.nutritionEntries.splice(index,1);



    saveUserData();



    showPage("nutrition");



}







// =====================
// DIARY DATE SYSTEM
// =====================


function changeDiaryDate(amount){



    let current = new Date(

        userData.selectedDiaryDate || new Date()

    );



    current.setDate(

        current.getDate() + amount

    );



    userData.selectedDiaryDate =

    current.toLocaleDateString();



    saveUserData();



    showPage("diary");



}







function resetDiaryDate(){



    userData.selectedDiaryDate =

    new Date().toLocaleDateString();



    saveUserData();



    showPage("diary");


}







// =====================
// PAGE DISPLAY
// =====================


function showPage(page){


let content = "";








// =====================
// HOME
// =====================


if(page === "home"){



content = `



<h1>💖 FULL OUT</h1>





<div class="card">


<h2>⭐ Level ${userData.level}</h2>


<p>

${userData.xp}/${userData.xpToNextLevel} XP

</p>


</div>







<div class="card">


<h2>🔥 Streak</h2>


<p>

${userData.streak} Days

</p>


</div>







<div class="card">


<h2>🥗 Nutrition XP</h2>


<p>

${userData.nutritionXP} XP

</p>


</div>



`;



}









// =====================
// NUTRITION PAGE
// =====================


if(page === "nutrition"){



content = `



<h1>🥗 Nutrition</h1>





<div class="card">


<h2>🔥 Calories Today</h2>


<h1>

${userData.caloriesToday}

</h1>


</div>







<div class="card">


<h2>💧 Water</h2>


<p>

${userData.waterToday}/${userData.waterGoal} cups

</p>



<button onclick="addWater()">

💧 Add Water

</button>


</div>







<div class="card">


<h2>🍽️ Log Food</h2>



<input id="foodName" placeholder="Food">



<input id="foodCalories" type="number" placeholder="Calories">





<select id="foodMeal">


<option>Breakfast</option>


<option>Lunch</option>


<option>Dinner</option>


<option>Snack</option>


</select>





<textarea id="foodNote" placeholder="Notes"></textarea>






<button onclick="addNutritionFood()">


➕ Add Food

</button>






<button onclick="saveCurrentMeal()">


⭐ Save Meal

</button>




</div>






<div class="card">


<h2>📋 Today's Food</h2>



${


userData.nutritionEntries.length === 0


?


"<p>No food logged yet.</p>"


:


userData.nutritionEntries.map((item,index)=>`



<div>


<h3>${item.food}</h3>


<p>

${item.calories} calories

</p>


<p>

${item.meal}

</p>


<button onclick="removeNutritionEntry(${index})">

🗑️

</button>


</div>



`).join("")

}



</div>



`;



}








// =====================
// DIARY PAGE
// =====================


if(page === "diary"){



const selected =

userData.selectedDiaryDate ||

new Date().toLocaleDateString();





const entries =

getDiaryByDate(selected);






content = `



<h1>📖 Athlete Diary</h1>





<div class="card">



<button onclick="changeDiaryDate(-1)">

⬅ Previous

</button>



<button onclick="resetDiaryDate()">

Today

</button>



<button onclick="changeDiaryDate(1)">

Next ➡

</button>



<h2>

${selected}

</h2>



</div>







<div class="card">


${


entries.length === 0


?


"<p>No entries for this day.</p>"


:


entries.map(entry=>`



<div class="diary-entry">


<h3>

${

entry.type === "nutrition"

?

"🥗"

:

entry.type === "workout"

?

"💪"

:

"⭐"

}

${entry.title}

</h3>



<p>

${entry.details}

</p>



<p>

⭐ +${entry.xp} XP

</p>



</div>



`).join("")

}



</div>



`;



}
    // =====================
// TRAINING PAGE
// =====================


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


${vacationWorkouts.workout.map(item=>`



<label class="workout-item">


<input

type="checkbox"

${userData.completedToday.includes(item) ? "checked":""}

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



${workout.morning.map(item=>`



<label class="workout-item">


<input

type="checkbox"

${userData.completedToday.includes(item) ? "checked":""}

onchange="completeWorkout('${item}')"

>



<span>${item}</span>



</label>



`).join("")}



</div>








<div class="card">


<h3>🌙 Nighttime</h3>



${workout.nighttime.map(item=>`



<label class="workout-item">


<input

type="checkbox"

${userData.completedToday.includes(item) ? "checked":""}

onchange="completeWorkout('${item}')"

>



<span>${item}</span>



</label>



`).join("")}



</div>



`;



}



}









// =====================
// PROFILE PAGE
// =====================


if(page === "profile"){



if(!userData.profileCreated){



content = `



<h1>👤 Create Profile</h1>




<div class="card">


<input

id="profileName"

placeholder="Name"

>




<select id="athleteType">


<option>Cheer Athlete</option>


<option>Strength Athlete</option>


<option>Flexibility Athlete</option>


</select>




<input

id="goal"

placeholder="Goal"

>




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


<h2>

${userData.profileName}

</h2>



<p>

🤸 ${userData.athleteType}

</p>



<p>

🎯 ${userData.goal}

</p>



<p>

📅 Joined ${userData.profileDate}

</p>



</div>







<div class="card">


<h2>

📊 Stats

</h2>



<p>

💪 Workouts:

${userData.workoutsCompleted}

</p>



<p>

⭐ Level:

${userData.level}

</p>



<p>

🥗 Nutrition XP:

${userData.nutritionXP}

</p>



<p>

🏆 Badges:

${userData.unlockedBadges.length}

</p>



</div>



`;



}



}









// =====================
// TROPHY ROOM
// =====================


if(page === "badges"){



content = `



<h1>🏆 Trophy Room</h1>





<div class="card">


<h2>

🏅 ${userData.unlockedBadges.length}

/

${Object.keys(badges).length}

</h2>


<p>

Badges Earned

</p>


</div>






<div class="badge-gallery">



${Object.keys(badges).map(id=>{


const badge = badges[id];


const earned =

userData.unlockedBadges.includes(id);




return `



<div class="badge-card ${earned ? "unlocked":"locked"}">


<h2>

${earned ? badge.icon:"🔒"}

</h2>



<h3>

${earned ? badge.name:"Locked"}

</h3>



<p>

${badge.description}

</p>



<p>

⭐ ${badge.rarity}

</p>



</div>



`;



}).join("")}



</div>



`;



}









// =====================
// SETTINGS PAGE
// =====================


if(page === "settings"){



content = `



<h1>⚙️ Settings</h1>





<div class="card">


<h2>🌈 App Mode</h2>



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


<h2>🥗 Nutrition Support</h2>



<label>


<input

type="checkbox"

${userData.arfidSupport ? "checked":""}

onclick="toggleARFID()"

>



ARFID Support Mode


</label>



</div>








<div class="card">


<button onclick="resetProgress()">


Reset Progress


</button>


</div>



`;



}









// =====================
// BOTTOM NAVIGATION
// =====================


app.innerHTML = content + `



<div class="bottom-nav">



<button onclick="showPage('home')">

🏠

</button>





<button onclick="showPage('training')">

💪

</button>





<button onclick="showPage('nutrition')">

🥗

</button>





<button onclick="showPage('diary')">

📖

</button>





<button onclick="showPage('badges')">

🏆

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








// =====================
// START APP
// =====================


applyTheme();


showPage("home");
