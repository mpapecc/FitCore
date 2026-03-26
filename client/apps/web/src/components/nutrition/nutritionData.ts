import type { NutritionGoal, NutritionPlan } from "@fit-core/shared";

export type { NutritionGoal, NutritionPlan, Meal, FoodItem, AssignedMember } from "@fit-core/shared";

// ─── Goal Colors ──────────────────────────────────────────────────────────────

export const goalColors: Record<NutritionGoal, { bg: string; border: string; text: string }> = {
  "Weight Loss": { bg: "bg-error/10",  border: "border-error",   text: "text-error"   },
  "Muscle Gain": { bg: "bg-success/10",border: "border-success", text: "text-success" },
  "Maintenance": { bg: "bg-blue-50",   border: "border-blue-200",text: "text-blue-700"},
};

// ─── Macro Colors ─────────────────────────────────────────────────────────────

export const macroColors = {
  protein: { bar: "bg-success", label: "text-success" },
  carbs:   { bar: "bg-warning", label: "text-warning" },
  fat:     { bar: "bg-error",   label: "text-error"   },
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────

export const nutritionPlans: NutritionPlan[] = [
  {
    id: "1",
    name: "Lean Cut Program",
    goal: "Weight Loss",
    trainer: "James Carter",
    calorieTarget: 1800,
    macros: {
      protein: { grams: 150, percentage: 33 },
      carbs:   { grams: 180, percentage: 40 },
      fat:     { grams: 60,  percentage: 27 },
    },
    membersCount: 8,
    meals: [
      {
        name: "Breakfast",
        totalCalories: 420,
        items: [
          { name: "Greek Yogurt",  portion: "200g",     calories: 130 },
          { name: "Blueberries",   portion: "100g",     calories: 57  },
          { name: "Oats",          portion: "50g",      calories: 189 },
          { name: "Almonds",       portion: "15g",      calories: 87  },
        ],
      },
      {
        name: "Lunch",
        totalCalories: 550,
        items: [
          { name: "Grilled Chicken Breast", portion: "180g",  calories: 297 },
          { name: "Brown Rice",             portion: "100g",  calories: 111 },
          { name: "Steamed Broccoli",       portion: "150g",  calories: 51  },
          { name: "Olive Oil",              portion: "10ml",  calories: 88  },
        ],
      },
      {
        name: "Dinner",
        totalCalories: 580,
        items: [
          { name: "Salmon Fillet", portion: "200g",  calories: 367 },
          { name: "Sweet Potato",  portion: "150g",  calories: 129 },
          { name: "Mixed Salad",   portion: "100g",  calories: 25  },
          { name: "Lemon Dressing",portion: "15ml",  calories: 60  },
        ],
      },
      {
        name: "Snacks",
        totalCalories: 250,
        items: [
          { name: "Protein Shake", portion: "300ml",    calories: 150 },
          { name: "Apple",         portion: "1 medium", calories: 72  },
          { name: "Rice Cake",     portion: "2 pieces", calories: 70  },
        ],
      },
    ],
    assignedMembers: [
      { id: "1", name: "Sarah Mitchell", avatarInitials: "SM" },
      { id: "2", name: "Emma Davis",     avatarInitials: "ED" },
      { id: "3", name: "Lisa Wong",      avatarInitials: "LW" },
      { id: "4", name: "Tom Wilson",     avatarInitials: "TW" },
    ],
  },
  {
    id: "2",
    name: "Muscle Builder Elite",
    goal: "Muscle Gain",
    trainer: "James Carter",
    calorieTarget: 3200,
    macros: {
      protein: { grams: 220, percentage: 28 },
      carbs:   { grams: 400, percentage: 50 },
      fat:     { grams: 89,  percentage: 25 },
    },
    membersCount: 5,
    meals: [],
    assignedMembers: [
      { id: "5", name: "John Carter", avatarInitials: "JC" },
      { id: "6", name: "Mike Torres", avatarInitials: "MT" },
    ],
  },
  {
    id: "3",
    name: "Balanced Lifestyle",
    goal: "Maintenance",
    trainer: "Coach Maria",
    calorieTarget: 2200,
    macros: {
      protein: { grams: 165, percentage: 30 },
      carbs:   { grams: 275, percentage: 50 },
      fat:     { grams: 49,  percentage: 20 },
    },
    membersCount: 12,
    meals: [],
    assignedMembers: [
      { id: "7",  name: "Anna Brooks",   avatarInitials: "AB" },
      { id: "8",  name: "Carlos Mendez", avatarInitials: "CM" },
      { id: "9",  name: "Rachel Green",  avatarInitials: "RG" },
    ],
  },
  {
    id: "4",
    name: "Student Shred",
    goal: "Weight Loss",
    trainer: "Coach Ben",
    calorieTarget: 1600,
    macros: {
      protein: { grams: 130, percentage: 33 },
      carbs:   { grams: 160, percentage: 40 },
      fat:     { grams: 53,  percentage: 30 },
    },
    membersCount: 3,
    meals: [],
    assignedMembers: [
      { id: "10", name: "James Hill", avatarInitials: "JH" },
    ],
  },
];
