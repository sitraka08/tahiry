export { dueLabel, highlightGoal, monthlyNeeded, percentOf } from './hooks/goal-math';
export { addDeposit, createGoal, deleteGoal } from './hooks/use-goal-actions';
export { useGoals } from './hooks/use-goals';
export {
  depositSchema,
  goalSchema,
  type DepositFormValues,
  type GoalFormValues,
} from './schemas/goal-schema';
export type { AccountOption, GoalItem } from './types';
export { DepositSheet } from './components/deposit-sheet';
export { GoalCard } from './components/goal-card';
export { GoalHighlight } from './components/goal-highlight';
export { GoalSheet } from './components/goal-sheet';
