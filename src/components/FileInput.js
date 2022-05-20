// import { useState } from "react";

function FileInput({ name, value, onChange }) {
  // value State : file 객체를 담을 State
  // const [value, setValue] = useState();

  const handleChange = (e) => {
    // console.log(e.target.files);
    const nextValue = e.target.files[0];
    // setValue(nextValue);
    onChange(name, nextValue);
  };

  return <input type="file" onChange={handleChange} />;
}

export default FileInput;
