function formatDateToYYYYMMDD(inputDateString: string | Date) {
  // / Parse the input date string
  const dateObject = new Date(inputDateString);
  
  // Get year, month, and day components
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(dateObject.getDate()).padStart(2, '0');
  
  // Format the result
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

export default formatDateToYYYYMMDD;
  
  // Example usage:
//   const today = new Date();
//   const formattedDate = formatDateToYYYYMMDD(today);