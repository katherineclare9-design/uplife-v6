// =====================
// UpLift Badge System v2
// =====================

const badges = {

    // =====================
    // Getting Started
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

    fiveWorkouts: {
        name: "Building Momentum",
        icon: "🚀",
        description: "Complete 5 workouts.",
        category: "Getting Started",
        rarity: "Common",
        goal: 5,
        progress: () => userData.workoutsCompleted,
        requirement: () => userData.workoutsCompleted >= 5
    },

    tenWorkouts: {
        name: "Committed Athlete",
        icon: "🏅",
        description: "Complete 10 workouts.",
        category: "Getting Started",
        rarity: "Rare",
        goal: 10,
        progress: () => userData.workoutsCompleted,
        requirement: () => userData.workoutsCompleted >= 10
    },

    // =====================
    // Core
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
        description: "Complete 25 core workouts.",
        category: "Core",
        rarity: "Rare",
        goal: 25,
        progress: () => userData.coreWorkouts,
        requirement: () => userData.coreWorkouts >= 25
    },

    // =====================
    // Strength
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
    // Flexibility
    // =====================

    flexibilityFlow: {
        name: "Flexibility Flow",
        icon: "🩰",
        description: "Complete 10 flexibility sessions.",
        category: "Flexibility",
        rarity: "Rare",
        goal: 10,
        progress: () => userData.flexibilitySessions,
        requirement: () => userData.flexibilitySessions >= 10
    },

    // =====================
    // Backspot
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

    // =====================
    // Legendary
    // =====================

    dedicatedAthlete: {
        name: "Dedicated Athlete",
        icon: "🏆",
        description: "Complete 50 workouts.",
        category: "Legendary",
        rarity: "Legendary",
        goal: 50,
        progress: () => userData.workoutsCompleted,
        requirement: () => userData.workoutsCompleted >= 50
    }

};

function checkBadges() {

    Object.keys(badges).forEach(id => {

        const badge = badges[id];

        if (
            badge.requirement() &&
            !userData.unlockedBadges.includes(id)
        ) {

            userData.unlockedBadges.push(id);

            alert(
                "🎉 Badge Unlocked!\n\n" +
                badge.icon +
                " " +
                badge.name
            );

        }

    });

    saveUserData();

}
