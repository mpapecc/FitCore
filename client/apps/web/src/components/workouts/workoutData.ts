import type { WorkoutLog, WorkoutType } from "@fit-core/shared";

export const workoutTypeColors: Record<
  WorkoutType,
  {
    bg: string;
    border: string;
    text: string;
  }
> = {
  Strength: { bg: "bg-navy/10", border: "border-navy/20", text: "text-navy" },
  Cardio: { bg: "bg-error/10", border: "border-error/20", text: "text-error" },
  Flexibility: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  HIIT: {
    bg: "bg-warning/10",
    border: "border-warning/20",
    text: "text-warning",
  },
};

export const workoutLogs: WorkoutLog[] = [
  {
    id: "1",
    member: { id: "1", name: "Sarah Mitchell", avatarInitials: "SM" },
    workoutName: "Full Body HIIT",
    type: "HIIT",
    trainer: "James Carter",
    duration: 45,
    calories: 520,
    date: "Mar 22, 2026",
    exercises: [
      { name: "Burpees", sets: 4, reps: 15, weight: "Bodyweight" },
      { name: "Box Jumps", sets: 3, reps: 12, weight: "Bodyweight" },
      { name: "Mountain Climbers", sets: 4, reps: 20, weight: "Bodyweight" },
      { name: "Kettlebell Swings", sets: 3, reps: 15, weight: "16kg" },
    ],
    trainerNotes:
      "Sarah showed great improvement in endurance today. Increase kettlebell weight to 20kg next session.",
    memberRating: 5,
  },
  {
    id: "2",
    member: { id: "2", name: "John Carter", avatarInitials: "JC" },
    workoutName: "Upper Body Strength",
    type: "Strength",
    trainer: "James Carter",
    duration: 60,
    calories: 380,
    date: "Mar 22, 2026",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8, weight: "80kg" },
      { name: "Pull-Ups", sets: 3, reps: 10, weight: "Bodyweight" },
      { name: "Shoulder Press", sets: 3, reps: 10, weight: "50kg" },
      { name: "Tricep Dips", sets: 3, reps: 12, weight: "Bodyweight" },
      { name: "Bicep Curls", sets: 3, reps: 12, weight: "15kg" },
    ],
    trainerNotes:
      "Good form on bench press. Work on shoulder flexibility before next session.",
    memberRating: 4,
  },
  {
    id: "3",
    member: { id: "3", name: "Emma Davis", avatarInitials: "ED" },
    workoutName: "Yoga Flow",
    type: "Flexibility",
    trainer: "Coach Maria",
    duration: 50,
    calories: 210,
    date: "Mar 21, 2026",
    exercises: [
      { name: "Sun Salutation", sets: 3, reps: 5, weight: "Bodyweight" },
      { name: "Warrior Sequence", sets: 2, reps: 8, weight: "Bodyweight" },
      { name: "Child's Pose", sets: 1, reps: 3, weight: "Bodyweight" },
      { name: "Pigeon Pose", sets: 2, reps: 4, weight: "Bodyweight" },
    ],
    trainerNotes:
      "Excellent flexibility progress. Emma is ready to advance to intermediate poses.",
    memberRating: 5,
  },
  {
    id: "4",
    member: { id: "4", name: "Mike Torres", avatarInitials: "MT" },
    workoutName: "Cardio Blast",
    type: "Cardio",
    trainer: "Coach Ben",
    duration: 35,
    calories: 390,
    date: "Mar 21, 2026",
    exercises: [
      { name: "Treadmill Run", sets: 1, reps: 1, weight: "10km/h" },
      { name: "Rowing Machine", sets: 3, reps: 1, weight: "5 min" },
      { name: "Jump Rope", sets: 4, reps: 1, weight: "3 min" },
      { name: "Cycling", sets: 1, reps: 1, weight: "15 min" },
    ],
    trainerNotes:
      "Mike struggled with pacing. Focus on steady-state cardio before adding intervals.",
    memberRating: 3,
  },
  {
    id: "5",
    member: { id: "5", name: "Lisa Wong", avatarInitials: "LW" },
    workoutName: "Lower Body Strength",
    type: "Strength",
    trainer: "James Carter",
    duration: 55,
    calories: 420,
    date: "Mar 20, 2026",
    exercises: [
      { name: "Squats", sets: 4, reps: 10, weight: "60kg" },
      { name: "Romanian Deadlift", sets: 3, reps: 10, weight: "50kg" },
      { name: "Leg Press", sets: 3, reps: 12, weight: "80kg" },
      { name: "Calf Raises", sets: 4, reps: 15, weight: "40kg" },
    ],
    trainerNotes:
      "Lisa is progressing well. Increase squat weight to 65kg next session.",
    memberRating: 4,
  },
  {
    id: "6",
    member: { id: "6", name: "James Hill", avatarInitials: "JH" },
    workoutName: "Morning HIIT",
    type: "HIIT",
    trainer: "Coach Ben",
    duration: 40,
    calories: 460,
    date: "Mar 20, 2026",
    exercises: [
      { name: "Sprint Intervals", sets: 8, reps: 1, weight: "30 sec on/off" },
      { name: "Squat Jumps", sets: 4, reps: 12, weight: "Bodyweight" },
      { name: "Push-Ups", sets: 4, reps: 15, weight: "Bodyweight" },
    ],
    trainerNotes:
      "Solid effort. Heart rate stayed in target zone for 85% of session.",
    memberRating: 4,
  },
  {
    id: "7",
    member: { id: "7", name: "Anna Brooks", avatarInitials: "AB" },
    workoutName: "Pilates Core",
    type: "Flexibility",
    trainer: "Coach Maria",
    duration: 50,
    calories: 200,
    date: "Mar 19, 2026",
    exercises: [
      { name: "The Hundred", sets: 1, reps: 1, weight: "Bodyweight" },
      { name: "Roll Up", sets: 3, reps: 10, weight: "Bodyweight" },
      { name: "Leg Circles", sets: 2, reps: 10, weight: "Bodyweight" },
      { name: "Plank", sets: 3, reps: 1, weight: "60 sec" },
    ],
    trainerNotes:
      "Anna has significantly improved core stability. Great control throughout.",
    memberRating: 5,
  },
  {
    id: "8",
    member: { id: "8", name: "Carlos Mendez", avatarInitials: "CM" },
    workoutName: "Full Body Strength",
    type: "Strength",
    trainer: "James Carter",
    duration: 65,
    calories: 510,
    date: "Mar 18, 2026",
    exercises: [
      { name: "Deadlift", sets: 4, reps: 6, weight: "100kg" },
      { name: "Bench Press", sets: 4, reps: 8, weight: "75kg" },
      { name: "Barbell Row", sets: 3, reps: 10, weight: "60kg" },
      { name: "Overhead Press", sets: 3, reps: 8, weight: "45kg" },
      { name: "Face Pulls", sets: 3, reps: 15, weight: "20kg" },
    ],
    trainerNotes:
      "Carlos hit a new deadlift PR today — 100kg! Outstanding progress this month.",
    memberRating: 5,
  },
  {
    id: "9",
    member: { id: "9", name: "Rachel Green", avatarInitials: "RG" },
    workoutName: "Spin Class",
    type: "Cardio",
    trainer: "Coach Ben",
    duration: 45,
    calories: 480,
    date: "Mar 17, 2026",
    exercises: [
      { name: "Warm-up Cycle", sets: 1, reps: 1, weight: "5 min easy" },
      {
        name: "Sprint Intervals",
        sets: 6,
        reps: 1,
        weight: "2 min sprint / 1 min rest",
      },
      { name: "Hill Climbs", sets: 4, reps: 1, weight: "3 min" },
      { name: "Cool-down", sets: 1, reps: 1, weight: "5 min easy" },
    ],
    trainerNotes:
      "Rachel kept great cadence throughout. Ready to add resistance next class.",
    memberRating: 4,
  },
  {
    id: "10",
    member: { id: "10", name: "Tom Wilson", avatarInitials: "TW" },
    workoutName: "Strength & Conditioning",
    type: "Strength",
    trainer: "James Carter",
    duration: 60,
    calories: 440,
    date: "Mar 16, 2026",
    exercises: [
      { name: "Power Cleans", sets: 4, reps: 5, weight: "60kg" },
      { name: "Front Squats", sets: 4, reps: 8, weight: "70kg" },
      { name: "Push Press", sets: 3, reps: 8, weight: "50kg" },
      { name: "Pull-Ups", sets: 3, reps: 8, weight: "Bodyweight" },
    ],
    trainerNotes:
      "Tom needs to work on Olympic lift technique. Schedule a technique session.",
    memberRating: 3,
  },
];

export function getWorkoutSummary(logs: WorkoutLog[]) {
  const total = logs.length;
  const avgDuration = Math.round(
    logs.reduce((sum, l) => sum + l.duration, 0) / total,
  );
  const typeCounts = logs.reduce(
    (acc, l) => {
      acc[l.type] = (acc[l.type] || 0) + 1;
      return acc;
    },
    {} as Record<WorkoutType, number>,
  );
  const mostPopular = Object.entries(typeCounts).sort(
    (a, b) => b[1] - a[1],
  )[0][0] as WorkoutType;
  return { total, avgDuration, mostPopular };
}
