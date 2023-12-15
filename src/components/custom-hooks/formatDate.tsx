function formatDateToYYYYMMDD(date: any) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

export default formatDateToYYYYMMDD;
  
  // Example usage:
//   const today = new Date();
//   const formattedDate = formatDateToYYYYMMDD(today);
//   console.log(formattedDate);