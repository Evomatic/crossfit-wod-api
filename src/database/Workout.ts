import db from "./db.json";
import { saveToDatabase, newDate } from "./utils";
import { WorkoutFilterParams, Workout, Workouts, StatusError } from "../types";

const workouts = db.workouts as Workouts;

function filterWorkoutById(workoutId: string) {
  return workouts.filter((workout) => workout.id === workoutId);
}
/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Evan T
 *         mode:
 *           type: string
 *           example: AMRAP 10
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *             example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainingTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
export const getAllWorkouts = (filterParams: WorkoutFilterParams) => {
  try {
    if (filterParams.mode) {
      return workouts.filter((workout) => {
        if (filterParams.mode) {
          return workout.mode?.toLowerCase().includes(filterParams.mode);
        }
      });
    } else if (filterParams.equipment) {
      const filterWorkoutsBySpecificEquipment: Workouts = [];
      workouts.forEach((workout) => {
        workout.equipment?.forEach((item) => {
          if (item.toLowerCase().includes(filterParams.equipment as string)) {
            filterWorkoutsBySpecificEquipment.push(workout);
          }
        });
      });
      return filterWorkoutsBySpecificEquipment;
    } else if (filterParams.length) {
      return workouts.filter(
        (_, index) => filterParams.length && index < filterParams.length
      );
    } else if (filterParams.sort) {
      return workouts.toSorted((workoutA, workoutB) => {
        if (workoutA.createdAt && workoutB.createdAt) {
          const dateA = new Date(workoutA.createdAt);
          const dateB = new Date(workoutB.createdAt);
          if (filterParams.sort === "-createdat") {
            return dateB.getTime() - dateA.getTime();
          }
          return dateA.getTime() - dateB.getTime();
        }
        return -1;
      });
    }
    return workouts;
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};

export const createNewWorkout = (newWorkout: Workout) => {
  const isAlreadyAdded =
    workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) {
    const statusError = new StatusError();
    statusError.status = 400;
    statusError.message = `Workout with the name ${newWorkout.name} already exists.`;
    throw statusError;
  }
  try {
    workouts.push(newWorkout);
    saveToDatabase(workouts);
    return newWorkout;
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};

export const getExistingWorkout = (workoutId: string) => {
  let result: Workouts = [];
  try {
    result = filterWorkoutById(workoutId);
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
  if (result.length === 0) {
    const statusError = new StatusError();
    statusError.status = 404;
    statusError.message = `Workout with id ${workoutId} does not exist.`;
    throw statusError;
  }
  const [workout] = result;
  return workout;
};

export const updateExistingWorkout = (workoutId: string, body: Workout) => {
  let result: Workouts = [];
  try {
    result = filterWorkoutById(workoutId);
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
  if (result.length === 0) {
    const statusError = new StatusError();
    statusError.status = 404;
    statusError.message = `Workout with id ${workoutId} does not exist.`;
    throw statusError;
  }
  const [workout] = result;

  for (const [key, value] of Object.entries(body)) {
    if (Object.hasOwn(workout, key)) {
      workout[key] = value;
      workout["updatedAt"] = newDate();
    }
  }
  const index = workouts.indexOf(workout);
  workouts.splice(index, 1, workout);
  saveToDatabase(workouts);
  return workout;
};

export const deleteExistingWorkout = (workoutId: string) => {
  let result: Workouts = [];
  try {
    result = workouts.filter((workout) => workout.id !== workoutId);
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
  if (result.length === workouts.length) {
    const statusError = new StatusError();
    statusError.status = 404;
    statusError.message = `Workout with id ${workoutId} does not exist.`;
    throw statusError;
  }
  saveToDatabase(result);
};
