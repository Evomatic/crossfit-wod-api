export type FilterParams = {
  mode?: string;
  equipment?: string;
};

export type Workout = {
  [key: string]: string | string[] | undefined;
  id?: string;
  name?: string;
  mode?: string;
  equipment?: string[];
  exercises?: string[];
  createdAt?: string;
  updatedAt?: string;
  trainerTips?: string[];
};

export type Workouts = Workout[];
