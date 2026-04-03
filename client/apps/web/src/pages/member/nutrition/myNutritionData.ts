export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
export type NutritionGoal = 'Muscle Gain' | 'Weight Loss' | 'Maintenance';

export interface FoodItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;  // grams
  carbs: number;
  fat: number;
}

export interface Meal {
  type: MealType;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  items: FoodItem[];
}

export interface DayPlan {
  day: DayOfWeek;
  meals: Meal[];
  totalCalories: number;
  waterGlasses: number;    // how many glasses consumed today
  waterTarget: number;     // target glasses
}

export interface NutritionPlan {
  name: string;
  goal: NutritionGoal;
  assignedBy: string;
  assignedByInitials: string;
  calorieTarget: number;
  macros: {
    protein: { grams: number; percentage: number; color: string };
    carbs:   { grams: number; percentage: number; color: string };
    fat:     { grams: number; percentage: number; color: string };
  };
  days: DayPlan[];
}

export const mealIcons: Record<MealType, string> = {
  Breakfast: '☀️',
  Lunch:     '🌤️',
  Dinner:    '🌙',
  Snacks:    '🍎',
};

export const mealTimeMap: Record<MealType, string> = {
  Breakfast: '7:00 – 8:00 AM',
  Lunch:     '12:00 – 1:00 PM',
  Dinner:    '6:00 – 7:00 PM',
  Snacks:    'Between meals',
};

export const goalColors: Record<NutritionGoal, {
  bg: string; border: string; text: string;
}> = {
  'Muscle Gain': { bg: 'bg-success/10', border: 'border-success', text: 'text-success'  },
  'Weight Loss': { bg: 'bg-error/10',   border: 'border-error',   text: 'text-error'    },
  'Maintenance': { bg: 'bg-blue-50',    border: 'border-blue-200',text: 'text-blue-700' },
};

const wednesdayMeals: Meal[] = [
  {
    type: 'Breakfast',
    totalCalories: 620, totalProtein: 42, totalCarbs: 68, totalFat: 18,
    items: [
      { id: 'b1', name: 'Oats',          portion: '100g',    calories: 389, protein: 17, carbs: 66, fat: 7  },
      { id: 'b2', name: 'Whole Milk',    portion: '250ml',   calories: 150, protein: 8,  carbs: 12, fat: 8  },
      { id: 'b3', name: 'Banana',        portion: '1 large', calories: 105, protein: 1,  carbs: 27, fat: 0  },
      { id: 'b4', name: 'Whey Protein',  portion: '30g',     calories: 120, protein: 24, carbs: 3,  fat: 2  },
      { id: 'b5', name: 'Peanut Butter', portion: '15g',     calories: 90,  protein: 4,  carbs: 3,  fat: 8  },
    ],
  },
  {
    type: 'Lunch',
    totalCalories: 750, totalProtein: 58, totalCarbs: 72, totalFat: 22,
    items: [
      { id: 'l1', name: 'Chicken Breast', portion: '200g',  calories: 330, protein: 62, carbs: 0,  fat: 7  },
      { id: 'l2', name: 'Brown Rice',     portion: '150g',  calories: 167, protein: 4,  carbs: 35, fat: 1  },
      { id: 'l3', name: 'Broccoli',       portion: '150g',  calories: 51,  protein: 4,  carbs: 10, fat: 1  },
      { id: 'l4', name: 'Olive Oil',      portion: '15ml',  calories: 132, protein: 0,  carbs: 0,  fat: 15 },
      { id: 'l5', name: 'Mixed Salad',    portion: '80g',   calories: 20,  protein: 1,  carbs: 3,  fat: 0  },
    ],
  },
  {
    type: 'Dinner',
    totalCalories: 680, totalProtein: 52, totalCarbs: 55, totalFat: 26,
    items: [
      { id: 'd1', name: 'Salmon Fillet',  portion: '180g',  calories: 330, protein: 40, carbs: 0,  fat: 18 },
      { id: 'd2', name: 'Sweet Potato',   portion: '200g',  calories: 172, protein: 3,  carbs: 40, fat: 0  },
      { id: 'd3', name: 'Asparagus',      portion: '100g',  calories: 20,  protein: 2,  carbs: 4,  fat: 0  },
      { id: 'd4', name: 'Avocado',        portion: '60g',   calories: 96,  protein: 1,  carbs: 5,  fat: 9  },
      { id: 'd5', name: 'Lemon Dressing', portion: '15ml',  calories: 45,  protein: 0,  carbs: 1,  fat: 5  },
    ],
  },
  {
    type: 'Snacks',
    totalCalories: 420, totalProtein: 34, totalCarbs: 32, totalFat: 16,
    items: [
      { id: 's1', name: 'Greek Yogurt', portion: '200g',  calories: 130, protein: 18, carbs: 9,  fat: 3  },
      { id: 's2', name: 'Mixed Nuts',   portion: '30g',   calories: 180, protein: 5,  carbs: 6,  fat: 16 },
      { id: 's3', name: 'Protein Bar',  portion: '1 bar', calories: 200, protein: 20, carbs: 22, fat: 6  },
    ],
  },
];

export const nutritionPlan: NutritionPlan = {
  name: 'Muscle Gain Plan',
  goal: 'Muscle Gain',
  assignedBy: 'James Carter',
  assignedByInitials: 'JC',
  calorieTarget: 3200,
  macros: {
    protein: { grams: 200, percentage: 25, color: 'bg-blue-500'  },
    carbs:   { grams: 380, percentage: 48, color: 'bg-warning'   },
    fat:     { grams: 89,  percentage: 25, color: 'bg-pink-500'  },
  },
  days: [
    { day: 'Mon', meals: wednesdayMeals, totalCalories: 2470, waterGlasses: 8, waterTarget: 8 },
    { day: 'Tue', meals: wednesdayMeals, totalCalories: 2470, waterGlasses: 6, waterTarget: 8 },
    { day: 'Wed', meals: wednesdayMeals, totalCalories: 2470, waterGlasses: 6, waterTarget: 8 },
    { day: 'Thu', meals: wednesdayMeals, totalCalories: 2470, waterGlasses: 4, waterTarget: 8 },
    { day: 'Fri', meals: wednesdayMeals, totalCalories: 2470, waterGlasses: 7, waterTarget: 8 },
    { day: 'Sat', meals: wednesdayMeals, totalCalories: 2470, waterGlasses: 8, waterTarget: 8 },
    { day: 'Sun', meals: wednesdayMeals, totalCalories: 2470, waterGlasses: 5, waterTarget: 8 },
  ],
};

export const DAYS: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const TODAY_DAY: DayOfWeek = 'Wed';
