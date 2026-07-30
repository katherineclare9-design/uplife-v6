// =====================
// UpLift Nutrition System
// =====================

// Food Database
const foods = {

    "Chicken Breast": {
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3
    },

    "Egg": {
        calories: 70,
        protein: 6,
        carbs: 0,
        fat: 5
    },

    "Rice": {
        calories: 205,
        protein: 4,
        carbs: 45,
        fat: 0
    },

    "Banana": {
        calories: 105,
        protein: 1,
        carbs: 27,
        fat: 0
    },

    "Greek Yogurt": {
        calories: 100,
        protein: 17,
        carbs: 6,
        fat: 0
    },

    "Protein Shake": {
        calories: 160,
        protein: 30,
        carbs: 4,
        fat: 3
    },

    "Apple": {
        calories: 95,
        protein: 0,
        carbs: 25,
        fat: 0
    },

    "Peanut Butter": {
        calories: 190,
        protein: 7,
        carbs: 7,
        fat: 16
    }

};


// =====================
// Add Food
// =====================

function addFood(foodName, meal){

    const food = foods[foodName];

    if(!food) return;

    userData.nutrition.calories += food.calories;
    userData.nutrition.protein += food.protein;
    userData.nutrition.carbs += food.carbs;
    userData.nutrition.fat += food.fat;

    userData.nutrition[meal].push(foodName);

    saveUserData();

    showPage("nutrition");

}


// =====================
// Water
// =====================

function addWater(){

    if(userData.nutrition.water < 8){

        userData.nutrition.water++;

    }

    saveUserData();

    showPage("nutrition");

}


function removeWater(){

    if(userData.nutrition.water > 0){

        userData.nutrition.water--;

    }

    saveUserData();

    showPage("nutrition");

}


// =====================
// Reset Nutrition
// =====================

function resetNutrition(){

    userData.nutrition = {

        calories:0,

        protein:0,

        carbs:0,

        fat:0,

        water:0,

        breakfast:[],

        lunch:[],

        dinner:[],

        snacks:[]

    };

    saveUserData();

    showPage("nutrition");

}
