 // =====================
// UpLift User Data v5.0
// Nutrition + Athlete Diary Upgrade
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
// XP + LEVEL SYSTEM
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






coreWorkouts:0,


strengthWorkouts:0,


backspotWorkouts:0,


flexibilitySessions:0,


lowerBodyWorkouts:0,


upperBodyWorkouts:0,


jumpSessions:0,








// =====================
// BADGES
// =====================


unlockedBadges:[],


badgeDates:{},









// =====================
// NUTRITION SYSTEM
// =====================


// calories logged today

caloriesToday:0,



// water tracking

waterToday:0,

waterGoal:8,



// every food entry

nutritionEntries:[],



// quick add meals

savedMeals:[],



// ARFID support lists

safeFoods:[],

favoriteFoods:[],

foodsToTry:[],



// notes

nutritionNotes:"",







// =====================
// ATHLETE DIARY
// =====================


// Every important action goes here
//
// Example:
//
// {
//   date:"7/29/2026",
//   type:"nutrition",
//   title:"Chicken Bowl",
//   details:"600 calories",
//   xp:10
// }


diaryEntries:[],



// Allows date selection later

selectedDiaryDate:"",







// =====================
// NUTRITION XP
// =====================


nutritionXP:0,


nutritionStreak:0,


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
// DAILY RESET CHECK
// =====================


const today = new Date().toLocaleDateString();






// Reset workout checklist


if(userData.completedDate !== today){



    userData.completedToday = [];


    userData.completedDate = today;



}







// Reset nutrition totals


if(userData.lastNutritionDate !== today){



    userData.caloriesToday = 0;



    userData.waterToday = 0;



    userData.lastNutritionDate = today;



}








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
// DIARY DATA FORMAT
// =====================
//
// Every entry uses:
//
// {
//   date:"7/29/2026",
//   type:"nutrition",
//   title:"Chicken Bowl",
//   details:"600 calories",
//   xp:10
// }
//
// Types:
// nutrition
// workout
// achievement
// note
//
// =====================
// =====================
// DIARY SYSTEM
// =====================


function addDiaryEntry(
    type,
    title,
    details,
    xp = 0
){



    userData.diaryEntries.push({


        date:new Date().toLocaleDateString(),


        type:type,


        title:title,


        details:details,


        xp:xp



    });



    saveUserData();



}







function getDiaryByDate(date){



    return userData.diaryEntries.filter(entry =>

        entry.date === date

    );



}







function getAvailableDiaryDates(){



    return [

        ...new Set(

            userData.diaryEntries.map(entry => entry.date)

        )

    ];



}








// =====================
// NUTRITION SYSTEM
// =====================


function addNutritionXP(amount){



    userData.nutritionXP += amount;


    addXP(amount);



}








function addNutritionEntry(entry){



    userData.nutritionEntries.push(entry);



    userData.caloriesToday += entry.calories || 0;





    addDiaryEntry(


        "nutrition",


        entry.food,


        `${entry.calories} calories${

            entry.note

            ?

            " - " + entry.note

            :

            ""

        }`,


        10


    );





    addNutritionXP(10);



    updateNutritionStreak();



    saveUserData();



}








function addWater(){



    if(userData.waterToday < userData.waterGoal){



        userData.waterToday++;



        addDiaryEntry(


            "nutrition",


            "Water Added",


            "Drank 1 cup of water",


            5


        );



        addNutritionXP(5);



    }




    saveUserData();



}







// =====================
// SAVED MEALS
// =====================


function saveMeal(meal){



    userData.savedMeals.push(meal);



    addDiaryEntry(


        "achievement",


        "Saved Meal Created",


        meal.food,


        15


    );



    addNutritionXP(15);



    saveUserData();



}







function addSavedMeal(index){



    const meal = userData.savedMeals[index];



    if(!meal){

        return;

    }





    addNutritionEntry({



        food:meal.food,


        calories:meal.calories,


        meal:meal.meal || "Saved Meal",


        note:"Added from saved meals"



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






    userData.xp = 0;


    userData.level = 1;


    userData.xpToNextLevel = 100;


    userData.streak = 0;






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







    userData.unlockedBadges = [];


    userData.badgeDates = {};







    userData.caloriesToday = 0;


    userData.waterToday = 0;


    userData.nutritionEntries = [];


    userData.savedMeals = [];


    userData.nutritionXP = 0;


    userData.nutritionStreak = 0;







    userData.diaryEntries = [];


    userData.selectedDiaryDate = "";






    saveUserData();



    location.reload();



}
