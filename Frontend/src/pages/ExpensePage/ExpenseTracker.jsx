import { useExpenseTracker } from './useExpenseTracker';
import { ExpenseTrackerUI } from './ExpenseTrackerUI';

const ExpenseTracker = () => {
  const expenseTracker = useExpenseTracker();
  
  return <ExpenseTrackerUI {...expenseTracker} />;
};

export default ExpenseTracker;