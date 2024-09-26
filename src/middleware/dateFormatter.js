export function currentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to get the actual month (0-based)
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}
