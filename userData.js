// =====================
// UpLift User Data v4.0
// Nutrition + Diary Update
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
// XP + LEVEL
// =====================


xp:0,

level:1,

xpToNextLevel:100,


streak:0,





// =====================
// WORKOUT PROGRESS
// =====================


workoutsCompleted:0,


completedToday:[],


completedDate:"",





// =====================
// BADGES
// =====================


unlockedBadges:[],


badgeDates:{},





// =====================
// WORKOUT TYPES
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


// today's calories

caloriesToday:0,



// water

waterToday:0,

waterGoal:8,



// all food logs

nutritionEntries:[],



// saved quick meals

savedMeals:[],



// foods

safeFoods:[],

favoriteFoods:[],

foodsToTry:[],



// notes

nutritionNotes:"",





// =====================
// DIARY
// =====================


diaryEntries:[],



// nutrition progress

nutritionStreak:0,


nutritionXP:0,


lastNutritionDate:""

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




    if(userData.lastNutritionDate !== today){



        userData.caloriesToday = 0;



        userData.waterToday = 0;




        userData.lastNutritionDate = today;




        saveUserData();



    }



}







checkNutritionDay();







// =====================
// SAVE USER DATA
// =====================


function saveUserData(){



    localStorage.setItem(

        "upliftData",

        JSON.stringify(userData)

    );


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
// NUTRITION XP
// =====================


function addNutritionXP(amount){



    userData.nutritionXP += amount;



    addXP(amount);



    saveUserData();



}







// =====================
// ADD DIARY ENTRY
// =====================


function addDiaryEntry(type, content){



    userData.diaryEntries.push({


        type:type,


        content:content,


        date:new Date().toLocaleDateString()


    });



    saveUserData();



}







// =====================
// ADD NUTRITION ENTRY
// =====================


function addNutritionEntry(entry){



    userData.nutritionEntries.push(entry);



    userData.caloriesToday += entry.calories;



    addDiaryEntry(

        "nutrition",

        entry.food + " - " + entry.calories + " calories"

    );



    addNutritionXP(10);



}







// =====================
// WATER XP
// =====================


function addWater(){



    if(userData.waterToday < userData.waterGoal){



        userData.waterToday++;



        addNutritionXP(5);



    }



    saveUserData();



}
// =====================
// SAVE QUICK MEAL
// =====================


function saveMeal(meal){



    userData.savedMeals.push(meal);



    addNutritionXP(15);



    saveUserData();



}







// =====================
// ADD SAVED MEAL
// =====================


function addSavedMeal(index){



    const meal = userData.savedMeals[index];



    if(!meal){

        return;

    }




    addNutritionEntry({


        food:meal.food,


        calories:meal.calories,


        meal:meal.meal || "Meal",


        note:"Saved meal"


    });



}







// =====================
// NUTRITION STREAK
// =====================


function updateNutritionStreak(){



    const today = new Date().toLocaleDateString();



    if(userData.lastNutritionDate !== today){



        userData.nutritionStreak++;



        userData.lastNutritionDate = today;



        addNutritionXP(5);



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






    // Workout progress

    userData.workoutsCompleted = 0;


    userData.completedToday = [];


    userData.completedDate = "";



    userData.coreWorkouts = 0;


    userData.strengthWorkouts = 0;


    userData.backspotWorkouts = 0;


    userData.flexibilitySessions = 0;


    userData.lowerBodyWorkouts = 0;


    userData.upperBodyWorkouts = 0;


    userData.jumpSessions = 0;






    // Badges

    userData.unlockedBadges = [];


    userData.badgeDates = {};







    // Nutrition

    userData.caloriesToday = 0;


    userData.waterToday = 0;


    userData.nutritionEntries = [];


    userData.savedMeals = [];


    userData.nutritionXP = 0;


    userData.nutritionStreak = 0;


    userData.lastNutritionDate = "";







    // Diary

    userData.diaryEntries = [];







    saveUserData();



    location.reload();



}
