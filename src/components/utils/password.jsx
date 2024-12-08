const isValidPassword = (password) => {
    // At least 8 characters, one letter, and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
    return passwordRegex.test(password);
  };
export default isValidPassword;  