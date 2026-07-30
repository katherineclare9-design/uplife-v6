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
// NUTRITION FUNCTIONS
// =====================


function addWater(){


    if(userData.waterToday < userData.waterGoal){


        userData.waterToday++;


        addXP(5);


    }



    saveUserData();


    showPage("nutrition");


}






function addMeal(){


    const name =
    document.getElementById("mealName").value;


    const calories =
    Number(document.getElementById("mealCalories").value) || 0;


    const protein =
    Number(document.getElementById("mealProtein").value) || 0;


    const carbs =
    Number(document.getElementById("mealCarbs").value) || 0;


    const fats =
    Number(document.getElementById("mealFats").value) || 0;




    if(name === ""){

        return;

    }





    userData.meals.push({


        name:name,


        calories:calories,


        protein:protein,


        carbs:carbs,


        fats:fats


    });





    userData.caloriesToday += calories;


    userData.proteinToday += protein;


    userData.carbsToday += carbs;


    userData.fatsToday += fats;





    addXP(10);





    saveUserData();


    showPage("nutrition");


}






function deleteMeal(index){



    const meal = userData.meals[index];



    userData.caloriesToday -= meal.calories;


    userData.proteinToday -= meal.protein;


    userData.carbsToday -= meal.carbs;


    userData.fatsToday -= meal.fats;



    userData.meals.splice(index,1);



    saveUserData();



    showPage("nutrition");



}






function addFood(type){



    const input =

    document.getElementById(type + "Input");



    if(input.value === ""){

        return;

    }



    userData[type].push(input.value);



    input.value = "";



    saveUserData();



    showPage("nutrition");



}







function saveNutritionNotes(){


    userData.nutritionNotes =

    document.getElementById("nutritionNotes").value;



    saveUserData();



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

<h3>⭐ Level ${userData.level}</h3>

<p>${userData.xp}/${userData.xpToNextLevel} XP</p>

</div>



<div class="card">

<h3>🔥 Workout Streak</h3>

<p>${userData.streak} Days</p>

</div>



<div class="card">

<h3>🥗 Nutrition Streak</h3>

<p>${userData.nutritionStreak} Days</p>

</div>


`;

}





// =====================
// TRAINING
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







// =====================
// NUTRITION
// =====================


if(page === "nutrition"){



const caloriePercent =
Math.min(
(userData.caloriesToday / userData.calorieGoal) * 100,
100
);


const proteinPercent =
Math.min(
(userData.proteinToday / userData.proteinGoal) * 100,
100
);


const carbPercent =
Math.min(
(userData.carbsToday / userData.carbGoal) * 100,
100
);


const fatPercent =
Math.min(
(userData.fatsToday / userData.fatGoal) * 100,
100
);


const waterPercent =
Math.min(
(userData.waterToday / userData.waterGoal) * 100,
100
);





content = `


<h1>🥗 Nutrition</h1>





${userData.arfidSupport ? `


<div class="card">


<h2>💚 Comfortable Eating Mode</h2>


<p>

Focus on fueling your body. Every step counts.

</p>


</div>


` : ""}





<div class="card">


<h2>🔥 Calories</h2>


<h3>

${userData.caloriesToday}

/

${userData.calorieGoal}

</h3>



<div class="progress-bar">

<div class="progress-fill"

style="width:${caloriePercent}%">

</div>

</div>


</div>







<div class="card">


<h2>💪 Protein</h2>


<p>

${userData.proteinToday}g /

${userData.proteinGoal}g

</p>


<div class="progress-bar">

<div class="progress-fill"

style="width:${proteinPercent}%">

</div>

</div>



<h2>🍞 Carbs</h2>


<p>

${userData.carbsToday}g /

${userData.carbGoal}g

</p>


<div class="progress-bar">

<div class="progress-fill"

style="width:${carbPercent}%">

</div>

</div>





<h2>🥑 Fats</h2>


<p>

${userData.fatsToday}g /

${userData.fatGoal}g

</p>


<div class="progress-bar">

<div class="progress-fill"

style="width:${fatPercent}%">

</div>

</div>



</div>







<div class="card">


<h2>💧 Water</h2>


<p>

${userData.waterToday}

/

${userData.waterGoal}

cups

</p>


<div class="progress-bar">

<div class="progress-fill"

style="width:${waterPercent}%">

</div>

</div>



<button onclick="addWater()">

💧 Add Water

</button>


</div>







<div class="card">


<h2>🍽️ Add Meal</h2>



<input id="mealName" placeholder="Food name">


<input id="mealCalories" placeholder="Calories" type="number">


<input id="mealProtein" placeholder="Protein (g)" type="number">


<input id="mealCarbs" placeholder="Carbs (g)" type="number">


<input id="mealFats" placeholder="Fats (g)" type="number">



<button onclick="addMeal()">

Save Meal

</button>


</div>
// CONTINUED FROM NUTRITION PAGE


content += `





<div class="card">


<h2>🍽️ Today's Meals</h2>



${
userData.meals.length === 0

?

"<p>No meals logged yet.</p>"

:

userData.meals.map((meal,index)=>`


<div class="card">


<h3>🍴 ${meal.name}</h3>


<p>

🔥 ${meal.calories} calories

</p>


<p>

💪 ${meal.protein}g protein

</p>


<p>

🍞 ${meal.carbs}g carbs

</p>


<p>

🥑 ${meal.fats}g fats

</p>



<button onclick="deleteMeal(${index})">

🗑️ Remove

</button>



</div>


`).join("")

}



</div>







<div class="card">


<h2>⭐ Favorite Foods</h2>


<input id="favoriteFoodsInput" placeholder="Add favorite food">


<button onclick="addFood('favoriteFoods')">

Add

</button>



${userData.favoriteFoods.map(food=>`

<p>⭐ ${food}</p>

`).join("")}


</div>







<div class="card">


<h2>🛡️ Safe Foods</h2>


<input id="safeFoodsInput" placeholder="Add safe food">


<button onclick="addFood('safeFoods')">

Add

</button>



${userData.safeFoods.map(food=>`

<p>🛡️ ${food}</p>

`).join("")}


</div>







<div class="card">


<h2>🌱 Foods To Try</h2>


<input id="foodsToTryInput" placeholder="Add food to try">


<button onclick="addFood('foodsToTry')">

Add

</button>



${userData.foodsToTry.map(food=>`

<p>🌱 ${food}</p>

`).join("")}


</div>







<div class="card">


<h2>📝 Notes</h2>


<textarea

id="nutritionNotes"

onchange="saveNutritionNotes()"

placeholder="Write anything about your nutrition today..."

>${userData.nutritionNotes}</textarea>


</div>



`;



}






// =====================
// PROFILE
// =====================


if(page === "profile"){


if(!userData.profileCreated){


content = `


<h1>👤 Create Profile</h1>


<div class="card">


<input id="profileName" placeholder="Name">


<select id="athleteType">

<option>Cheer Athlete</option>

<option>Strength Athlete</option>

<option>Flexibility Athlete</option>

</select>


<input id="goal" placeholder="Goal">



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

<p>🤸 Backspot: ${userData.backspotWorkouts}</p>

<p>🩰 Flexibility: ${userData.flexibilitySessions}</p>

<p>💪 Workouts: ${userData.workoutsCompleted}</p>


<hr>


<p>⭐ Level ${userData.level}</p>


</div>


`;

}


}







// =====================
// TROPHY ROOM
// =====================


if(page === "badges"){


const total = Object.keys(badges).length;


const unlocked = userData.unlockedBadges.length;



content = `


<h1>🏆 Trophy Room</h1>


<div class="card">


<h2>

🏅 ${unlocked}/${total} Badges

</h2>


</div>





<div class="badge-gallery">


${Object.keys(badges).map(id=>{


const badge = badges[id];


const earned =
userData.unlockedBadges.includes(id);



return `


<div class="badge-card

${earned ? "unlocked":"locked"}

${badge.rarity.toLowerCase()}">


<h2>

${earned ? badge.icon:"🔒"}

</h2>


<h3>

${earned ? badge.name:"Locked Badge"}

</h3>


<p>

${badge.description}

</p>


<span class="rarity">

⭐ ${badge.rarity}

</span>


</div>


`;

}).join("")}


</div>


`;



}







// =====================
// SETTINGS
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


<label class="arfid-toggle">


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
// NAVIGATION
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
