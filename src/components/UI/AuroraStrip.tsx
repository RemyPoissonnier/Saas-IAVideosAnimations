const colors = [
  "bg-amber-100 dark:bg-red-700 ",
  "bg-yellow-400 dark:bg-orange-600 ",
  "bg-amber-500 dark:bg-orange-500 ",
  "bg-orange-500 dark:bg-yellow-400 ",
  "bg-red-600 dark:bg-amber-300 ",
];

export const AuroraStrip = () => {
  return colors.map((c) => <div className={`w-full h-10 ${c}`}></div>);
};
