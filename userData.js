// =====================
// UpLift User Data v2.0
// =====================

const defaultUserData = {

    // =====================
    // PROFILE
    // =====================

    profileCreated: false,
    profileName: "",
    athleteType: "",
    goal: "",
    profileDate: "",

    // =====================
    // SETTINGS
    // =====================

    mode: "Regular",
    arfidSupport: false,

    // =====================
    // PROGRESS
    // =====================

    xp: 0,
    level: 1,
    xpToNextLevel: 100,
    streak: 0,

    workoutsCompleted: 0,

nutrition: {

    calories: 0,

    protein: 0,

    carbs: 0,

    fat: 0,

    water: 0,

    breakfast: [],

    lunch: [],

    dinner: [],

    snacks: []

}

    // =====================
    // DAILY WORKOUTS
    // =====================

    completedToday: [],
    completedDate: "",

    // =====================
    // BADGES
    // =====================

    unlockedBadges: [],
    badgeDates: {},

    // =====================
    // WORKOUT STATS
    // =====================

    coreWorkouts: 0,
    strengthWorkouts: 0,
    backspotWorkouts: 0,
    flexibilitySessions: 0,
    lowerBodyWorkouts: 0,
    upperBodyWorkouts: 0,
    jumpSessions: 0,

    // =====================
    // NUTRITION
    // =====================

    calorieGoal: 2000,

    caloriesToday: 0,

    proteinToday: 0,

    carbsToday: 0,

    fatsToday: 0,

    meals: [],

    waterToday: 0,

    safeFoods: [],

    favoriteFoods: [],

    foodsToTry: [],

    nutritionNotes: ""

};



// =====================
// LOAD USER DATA
// =====================

let userData = JSON.parse(localStorage.getItem("upliftData")) || {};



// =====================
// ADD MISSING FIELDS
// (Keeps old saves working)
// =====================

for (const key in defaultUserData) {

    if (!(key in userData)) {

        userData[key] = defaultUserData[key];

    }

}



// =====================
// RESET DAILY CHECKBOXES
// =====================

const today = new Date().toLocaleDateString();

if (userData.completedDate !== today) {

    userData.completedToday = [];

    userData.completedDate = today;

}



// =====================
// SAVE
// =====================

function saveUserData() {

    localStorage.setItem(

        "upliftData",

        JSON.stringify(userData)

    );

}



// =====================
// RESET PROGRESS
// =====================

function resetProgress() {

    if (!confirm("Reset ALL progress? Your profile and settings will stay.")) {

        return;

    }

    userData.xp = 0;

    userData.level = 1;

    userData.xpToNextLevel = 100;

    userData.streak = 0;

    userData.workoutsCompleted = 0;

    userData.completedToday = [];

    userData.completedDate = "";

    userData.unlockedBadges = [];

    userData.badgeDates = {};

    userData.coreWorkouts = 0;

    userData.strengthWorkouts = 0;

    userData.backspotWorkouts = 0;

    userData.flexibilitySessions = 0;

    userData.lowerBodyWorkouts = 0;

    userData.upperBodyWorkouts = 0;

    userData.jumpSessions = 0;

    userData.caloriesToday = 0;

    userData.proteinToday = 0;

    userData.carbsToday = 0;

    userData.fatsToday = 0;

    userData.meals = [];

    userData.waterToday = 0;

    saveUserData();

    location.reload();

}
