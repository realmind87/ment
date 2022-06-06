const validation = (is, setValue, setError, setMsg, msg) => {
  if (is) {
    setError(true);
    setValue('');
    setMsg(msg);
    console.log(msg);
    return true;
  }
  return false;
};

export default validation;
