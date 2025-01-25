'use client';
import * as React from 'react';

interface StepperOptions {
  initialStep: number;
}

interface StepperState {
  step: number;
  jumped: number[];
  skipped: number[];
  completed: number[];
  errored: number[];
  history: number[];
}

export interface Stepper {
  next: (step: number) => void;
  previous: (step: number) => void;
  reset: (step?: number) => void;
  go: (step: number) => void;
  step: number;
  jumped: number[];
  skipped: number[];
  completed: number[];
  errored: number[];
  history: number[];
}

interface ActionTypes {
  type: string;
  payload: { step?: number; initialStep?: number };
}

function useStepper(options?: StepperOptions) {
  const initialStep = options?.initialStep || 0;
  const [state, dispatch] = React.useReducer(reducer, {
    step: initialStep,
    jumped: [],
    skipped: [],
    completed: [],
    errored: [],
    history: [initialStep],
  });

  function go(step: number) {
    if (step > state.step) {
      next(step);
    } else {
      previous(step);
    }
  }

  function next(step: number | undefined) {
    dispatch({ type: 'NEXT', payload: { step } });
  }

  function previous(step: number | undefined) {
    dispatch({ type: 'PREVIOUS', payload: { step } });
  }

  function reset(step = initialStep) {
    dispatch({ type: 'RESET', payload: { step, initialStep } });
  }

  return { ...state, next, previous, reset, go };
}

export default useStepper;

function reducer(
  state: StepperState,
  { type, payload }: ActionTypes
): StepperState {
  switch (type) {
    case 'NEXT': {
      if (payload?.step === state.step) {
        return state;
      }
      const step =
        payload.step &&
        !isNaN(payload?.step) &&
        Number(payload?.step) >= state.step
          ? Number(payload.step)
          : state.step + 1;

      const jumped = [...state.jumped];
      if (step > state.step + 1) {
        for (let index = state.step + 1; index < step; index++) {
          if (!jumped.includes(index)) {
            jumped.push(index);
          }
        }
      }

      return { ...state, step, jumped, history: [...state.history, step] };
    }
    case 'PREVIOUS': {
      if (payload?.step === state.step) {
        return state;
      }

      let jumped = [...state.jumped];

      const getNextStep = (step: number): number => {
        const stepIndex = jumped.indexOf(step);
        if (stepIndex > -1) {
          jumped.splice(stepIndex, 1);
          return getNextStep(step - 1);
        }
        return step;
      };

      const step =
        payload.step &&
        !isNaN(payload?.step) &&
        Number(payload?.step) <= state.step &&
        Number(payload?.step) >= 0
          ? Number(payload.step)
          : state.step
            ? getNextStep(state.step - 1)
            : 0;

      jumped = jumped.filter((jump) => jump < step);

      return { ...state, step, jumped, history: [...state.history, step] };
    }
    case 'RESET': {
      const step = Number(payload.step)
        ? Number(payload.step)
        : payload.initialStep || 0;
      return { ...state, step, jumped: [], history: [step] };
    }
    default:
      return state;
  }
}
