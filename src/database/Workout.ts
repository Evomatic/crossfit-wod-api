import db from "./db.json";

type Workout = {
  id: string;
  name: string;
  mode: string;
  equipment: string[];
  exercises: string[];
  createdAt: string;
  updatedAt: string;
  trainerTips: string[];
};

type Workouts = Workout[];

const workouts = db.workouts as Workouts;

export const getAllWorkouts = () => {
  return workouts;
};
