export class StatusError extends Error {
  status: number | undefined;
}

type Sort = "createdat" | "-createdat";

export type WorkoutFilterParams = {
  mode?: string;
  equipment?: string;
  length?: number;
  sort?: Sort;
};

export type RecordFilterParams = {
  length?: number;
  sort?: Sort;
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
