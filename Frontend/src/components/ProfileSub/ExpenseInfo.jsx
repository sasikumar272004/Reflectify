import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiPlus,
  FiBarChart2,
  FiCreditCard,
  FiTrendingUp,
  FiTrendingDown,
  FiSettings,
} from "react-icons/fi";
import { BsPieChart, BsLightningCharge } from "react-icons/bs";
import { BiChevronRight } from "react-icons/bi";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const ExpenseInfo = ({ expenseData, formatCurrency, formatDate }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const barChartData = expenseData.reduce((acc, curr) => {
    const found = acc.find((item) => item.date === curr.date);
    if (found) {
      found[curr.category] = (found[curr.category] || 0) + curr.amount;
      found.total = (found.total || 0) + curr.amount;
    } else {
      const newEntry = { date: curr.date };
      newEntry[curr.category] = curr.amount;
      newEntry.total = curr.amount;
      acc.push(newEntry);
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      {/* Expenses Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-stone-200"
      >
        <div>
          <h1 className="text-xl md:text-2xl font-medium mb-1">Expense Management</h1>
          <p className="text-stone-600 text-sm md:text-base">
            Track and analyze your spending patterns
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 md:mt-0 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-md hover:shadow-lg transition text-sm md:text-base flex items-center"
        >
          <FiPlus className="mr-2" />
          Add Expense
        </motion.button>
      </motion.div>

      {/* Expense Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          {
            title: "Total Spent",
            value: formatCurrency(expenseData.reduce((sum, e) => sum + e.amount, 0)),
            change: "+12%",
            trend: "up",
            icon: <FiDollarSign className="text-2xl" />,
            color: "bg-gradient-to-br from-amber-50 to-amber-100",
          },
          {
            title: "Daily Average",
            value: formatCurrency(expenseData.reduce((sum, e) => sum + e.amount, 0) / 7),
            change: "-5%",
            trend: "down",
            icon: <FiBarChart2 className="text-2xl" />,
            color: "bg-gradient-to-br from-blue-50 to-blue-100",
          },
          {
            title: "Top Category",
            value:
              expenseData.length > 0
                ? expenseData
                    .reduce((acc, curr) => {
                      const found = acc.find((item) => item.category === curr.category);
                      if (found) found.amount += curr.amount;
                      else acc.push({ category: curr.category, amount: curr.amount });
                      return acc;
                    }, [])
                    .sort((a, b) => b.amount - a.amount)[0].category
                : "N/A",
            change: "",
            icon: <BsPieChart className="text-2xl" />,
            color: "bg-gradient-to-br from-purple-50 to-purple-100",
          },
          {
            title: "Savings Rate",
            value: "15%",
            change: "+2%",
            trend: "up",
            icon: <BsLightningCharge className="text-2xl" />,
            color: "bg-gradient-to-br from-green-50 to-green-100",
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className={`${card.color} rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-white border-opacity-50`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs md:text-sm text-stone-600 mb-1">{card.title}</p>
                <h3 className="text-lg md:text-xl font-medium mb-2">{card.value}</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
                {card.icon}
              </div>
            </div>
            {card.change && (
              <div className="flex items-center">
                {card.trend === "up" ? (
                  <FiTrendingUp className="text-green-500 mr-1" />
                ) : (
                  <FiTrendingDown className="text-rose-500 mr-1" />
                )}
                <span className={`text-xs ${card.trend === "up" ? "text-green-600" : "text-rose-600"}`}>
                  {card.change} from last week
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Expense Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-stone-200"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
          <div>
            <h3 className="text-base md:text-lg font-medium">Spending Overview</h3>
            <p className="text-xs md:text-sm text-stone-500">Weekly expense breakdown by category</p>
          </div>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <button className="px-3 py-1 text-xs bg-stone-100 rounded-lg">Week</button>
            <button className="px-3 py-1 text-xs bg-stone-50 rounded-lg">Month</button>
            <button className="px-3 py-1 text-xs bg-stone-50 rounded-lg">Year</button>
          </div>
        </div>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {Array.from(new Set(expenseData.map((e) => e.category))).map((category, index) => (
                <Bar
                  key={category}
                  dataKey={category}
                  stackId="a"
                  fill={COLORS[index % COLORS.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Expenses Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
      >
        <div className="p-4 md:p-6 border-b border-stone-200">
          <h3 className="text-base md:text-lg font-medium">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 text-left text-xs md:text-sm">
              <tr>
                <th className="p-3 md:p-4 font-medium">Category</th>
                <th className="p-3 md:p-4 font-medium">Amount</th>
                <th className="p-3 md:p-4 font-medium">Date</th>
                <th className="p-3 md:p-4 font-medium">Note</th>
                <th className="p-3 md:p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {expenseData.map((expense) => (
                <motion.tr
                  key={expense.id}
                  whileHover={{ backgroundColor: "rgba(250, 250, 250, 1)" }}
                  className="text-xs md:text-sm"
                >
                  <td className="p-3 md:p-4">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center mr-2">
                        <FiCreditCard className="text-stone-600" />
                      </div>
                      <span>{expense.category}</span>
                    </div>
                  </td>
                  <td className="p-3 md:p-4 font-medium text-rose-600">
                    -{formatCurrency(expense.amount)}
                  </td>
                  <td className="p-3 md:p-4 text-stone-500">{formatDate(expense.date)}</td>
                  <td className="p-3 md:p-4 text-stone-600 truncate max-w-xs">{expense.note}</td>
                  <td className="p-3 md:p-4">
                    <button className="text-stone-400 hover:text-stone-600">
                      <FiSettings className="text-sm" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 md:p-6 border-t border-stone-200 flex justify-center">
          <button className="px-4 py-2 text-sm text-amber-600 hover:text-amber-700 flex items-center">
            View All Expenses <BiChevronRight className="ml-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpenseInfo;
