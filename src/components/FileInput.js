// import { useState } from "react";
import { useEffect, useRef } from "react";

function FileInput({ name, value, onChange }) {
  // value State : file 객체를 담을 State
  // const [value, setValue] = useState();

  const inputRef = useRef();
  const handleChange = (e) => {
    // console.log(e.target.files);
    const nextValue = e.target.files[0];
    // setValue(nextValue);
    onChange(name, nextValue);
    console.log("inputNode입니다. :", inputRef);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return; // inputNode의 값이 없으면, 함수를 종료
    inputNode.value = ""; // 초기화
    console.log(inputRef);
    onChange(name, null);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
