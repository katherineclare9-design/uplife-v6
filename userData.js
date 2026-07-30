// =====================
// UpLift User Data v3.0
// =====================


const defaultUserData = {



// =====================
// PROFILE
// =====================


profileCreated:false,

profileName:"",

athleteType:"",

goal:"",

profileDate:"",





// =====================
// SETTINGS
// =====================


mode:"Regular",

arfidSupport:false,





// =====================
// PROGRESS
// =====================


xp:0,

level:1,

xpToNextLevel:100,

streak:0,


workoutsCompleted:0,





// =====================
// DAILY WORKOUTS
// =====================


completedToday:[],

completedDate:"",





// =====================
// BADGES
// =====================


unlockedBadges:[],

badgeDates:{},





// =====================
// WORKOUT STATS
// =====================


coreWorkouts:0,

strengthWorkouts:0,

backspotWorkouts:0,

flexibilitySessions:0,

lowerBodyWorkouts:0,

upperBodyWorkouts:0,

jumpSessions:0,





// =====================
// NUTRITION
// =====================


calorieGoal:2000,


proteinGoal:120,


carbGoal:250,


fatGoal:70,


waterGoal:8,





caloriesToday:0,


proteinToday:0,


carbsToday:0,


fatsToday:0,


waterToday:0,





// meals logged today

meals:[],





// saved foods

safeFoods:[],


favoriteFoods:[],


foodsToTry:[],





// nutrition notes

nutritionNotes:"",




// nutrition tracking

nutritionDate:"",


nutritionStreak:0,


nutritionXP:0,



// history

nutritionHistory:[]


};
// =====================
// LOAD USER DATA
// =====================


let userData = JSON.parse(

    localStorage.getItem("upliftData")

) || {};






// =====================
// ADD MISSING FIELDS
// Keeps old saves working
// =====================


for(const key in defaultUserData){


    if(!(key in userData)){


        userData[key] = defaultUserData[key];


    }


}






// =====================
// DAILY WORKOUT RESET
// =====================


const today = new Date().toLocaleDateString();



if(userData.completedDate !== today){


    userData.completedToday = [];


    userData.completedDate = today;


}







// =====================
// DAILY NUTRITION RESET
// =====================


function checkNutritionDay(){



    const today = new Date().toLocaleDateString();




    if(userData.nutritionDate !== today){



        // save yesterday's nutrition if food was logged

        if(

            userData.caloriesToday > 0 ||

            userData.meals.length > 0

        ){



            userData.nutritionHistory.push({


                date:userData.nutritionDate,


                calories:userData.caloriesToday,


                protein:userData.proteinToday,


                carbs:userData.carbsToday,


                fats:userData.fatsToday,


                water:userData.waterToday,


                meals:userData.meals



            });



        }






        userData.caloriesToday = 0;


        userData.proteinToday = 0;


        userData.carbsToday = 0;


        userData.fatsToday = 0;


        userData.waterToday = 0;


        userData.meals = [];




        userData.nutritionDate = today;




        saveUserData();


    }



}







checkNutritionDay();







// =====================
// SAVE DATA
// =====================


function saveUserData(){


    localStorage.setItem(

        "upliftData",

        JSON.stringify(userData)

    );


}






// =====================
// NUTRITION HELPERS
// =====================


function addNutritionXP(amount){


    userData.nutritionXP += amount;


    userData.xp += amount;



    while(userData.xp >= userData.xpToNextLevel){



        userData.xp -= userData.xpToNextLevel;


        userData.level++;


        userData.xpToNextLevel += 100;



    }


}






function completeNutritionDay(){



    if(

        userData.caloriesToday >= userData.calorieGoal

        &&

        userData.waterToday >= userData.waterGoal

    ){



        userData.nutritionStreak++;


        addNutritionXP(50);



    }



    else{


        userData.nutritionStreak = 0;


    }



    saveUserData();



}
// =====================
// RESET PROGRESS
// =====================


function resetProgress(){


    if(!confirm(

        "Reset ALL progress? Your profile and settings will stay."

    )){


        return;


    }





    // XP

    userData.xp = 0;

    userData.level = 1;

    userData.xpToNextLevel = 100;

    userData.streak = 0;





    // Workouts

    userData.workoutsCompleted = 0;


    userData.completedToday = [];


    userData.completedDate = "";





    // Badges

    userData.unlockedBadges = [];


    userData.badgeDates = {};





    // Workout categories

    userData.coreWorkouts = 0;


    userData.strengthWorkouts = 0;


    userData.backspotWorkouts = 0;


    userData.flexibilitySessions = 0;


    userData.lowerBodyWorkouts = 0;


    userData.upperBodyWorkouts = 0;


    userData.jumpSessions = 0;






    // Nutrition totals

    userData.caloriesToday = 0;


    userData.proteinToday = 0;


    userData.carbsToday = 0;


    userData.fatsToday = 0;


    userData.waterToday = 0;





    // Meals

    userData.meals = [];





    // Nutrition progress

    userData.nutritionXP = 0;


    userData.nutritionStreak = 0;


    userData.nutritionHistory = [];






    saveUserData();



    location.reload();



}
