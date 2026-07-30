// =====================
// UpLift Trophy System v2
// =====================

const badges = {

    // =====================
    // GETTING STARTED
    // =====================

    firstStep: {
        name: "First Step",
        icon: "🌱",
        description: "Complete your first workout.",
        category: "Getting Started",
        rarity: "Common",
        goal: 1,
        progress: () => userData.workoutsCompleted,
        requirement: () => userData.workoutsCompleted >= 1
    },

    buildingMomentum: {
        name: "Building Momentum",
        icon: "🚀",
        description: "Complete 5 workouts.",
        category: "Getting Started",
        rarity: "Common",
        goal: 5,
        progress: () => userData.workoutsCompleted,
        requirement: () => userData.workoutsCompleted >= 5
    },

    committedAthlete: {
        name: "Committed Athlete",
        icon: "🏅",
        description: "Complete 10 workouts.",
        category: "Getting Started",
        rarity: "Rare",
        goal: 10,
        progress: () => userData.workoutsCompleted,
        requirement: () => userData.workoutsCompleted >= 10
    },

    dedicatedAthlete: {
        name: "Dedicated Athlete",
        icon: "🏆",
        description: "Complete 50 workouts.",
        category: "Getting Started",
        rarity: "Epic",
        goal: 50,
        progress: () => userData.workoutsCompleted,
        requirement: () => userData.workoutsCompleted >= 50
    },

    // =====================
    // CORE
    // =====================

    coreStarter: {
        name: "Core Starter",
        icon: "🔥",
        description: "Complete 5 core workouts.",
        category: "Core",
        rarity: "Common",
        goal: 5,
        progress: () => userData.coreWorkouts,
        requirement: () => userData.coreWorkouts >= 5
    },

    coreCrusher: {
        name: "Core Crusher",
        icon: "💥",
        description: "Complete 15 core workouts.",
        category: "Core",
        rarity: "Rare",
        goal: 15,
        progress: () => userData.coreWorkouts,
        requirement: () => userData.coreWorkouts >= 15
    },

    coreLegend: {
        name: "Core Legend",
        icon: "🌋",
        description: "Complete 50 core workouts.",
        category: "Core",
        rarity: "Legendary",
        goal: 50,
        progress: () => userData.coreWorkouts,
        requirement: () => userData.coreWorkouts >= 50
    },

    // =====================
    // STRENGTH
    // =====================

    strengthStarter: {
        name: "Strength Starter",
        icon: "💪",
        description: "Complete 5 strength workouts.",
        category: "Strength",
        rarity: "Common",
        goal: 5,
        progress: () => userData.strengthWorkouts,
        requirement: () => userData.strengthWorkouts >= 5
    },

    strengthMaster: {
        name: "Strength Master",
        icon: "🏋️",
        description: "Complete 25 strength workouts.",
        category: "Strength",
        rarity: "Epic",
        goal: 25,
        progress: () => userData.strengthWorkouts,
        requirement: () => userData.strengthWorkouts >= 25
    },

    // =====================
    // BACKSPOT
    // =====================

    backspotPower: {
        name: "Backspot Power",
        icon: "🤸",
        description: "Complete 10 backspot workouts.",
        category: "Backspot",
        rarity: "Rare",
        goal: 10,
        progress: () => userData.backspotWorkouts,
        requirement: () => userData.backspotWorkouts >= 10
    },

    backspotElite: {
        name: "Backspot Elite",
        icon: "⭐",
        description: "Complete 25 backspot workouts.",
        category: "Backspot",
        rarity: "Epic",
        goal: 25,
        progress: () => userData.backspotWorkouts,
        requirement: () => userData.backspotWorkouts >= 25
    },

    // =====================
    // FLEXIBILITY
    // =====================

    flexibilityFlow: {
        name: "Flexibility Flow",
        icon: "🩰",
        description: "Complete 10 flexibility workouts.",
        category: "Flexibility",
        rarity: "Rare",
        goal: 10,
        progress: () => userData.flexibilitySessions,
        requirement: () => userData.flexibilitySessions >= 10
    },

    flexibilityMaster: {
        name: "Flexibility Master",
        icon: "🤍",
        description: "Complete 30 flexibility workouts.",
        category: "Flexibility",
        rarity: "Epic",
        goal: 30,
        progress: () => userData.flexibilitySessions,
        requirement: () => userData.flexibilitySessions >= 30
    },

    // =====================
    // LOWER BODY
    // =====================

    lowerBodyStarter: {
        name: "Lower Body Builder",
        icon: "🦵",
        description: "Complete 10 lower body workouts.",
        category: "Lower Body",
        rarity: "Common",
        goal: 10,
        progress: () => userData.lowerBodyWorkouts,
        requirement: () => userData.lowerBodyWorkouts >= 10
    },

    // =====================
    // UPPER BODY
    // =====================

    upperBodyStarter: {
        name: "Upper Body Builder",
        icon: "💪",
        description: "Complete 10 upper body workouts.",
        category: "Upper Body",
        rarity: "Common",
        goal: 10,
        progress: () => userData.upperBodyWorkouts,
        requirement: () => userData.upperBodyWorkouts >= 10
    },

    // =====================
    // JUMPS
    // =====================

    jumpStarter: {
        name: "Jump Starter",
        icon: "⭐",
        description: "Complete 10 jump sessions.",
        category: "Jumps",
        rarity: "Common",
        goal: 10,
        progress: () => userData.jumpSessions,
        requirement: () => userData.jumpSessions >= 10
    }

};


// =====================
// Unlock System
// =====================

function checkBadges(){

    Object.keys(badges).forEach(id=>{

        const badge = badges[id];

        if(
            badge.requirement() &&
            !userData.unlockedBadges.includes(id)
        ){

            userData.unlockedBadges.push(id);

            alert(
                `🏆 Badge Unlocked!\n\n${badge.icon} ${badge.name}`
            );

        }

    });

    saveUserData();

}
