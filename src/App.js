import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

function App() {
  const [like, setLike] = useState(0);
  const [fanclub, setBool] = useState(0);
  const change = () => {
    socket.emit("clicked", like);
  };

  useEffect(() => {
    socket.on("update", (l) => {
      setLike(l);
      if (l >= 100) {
        setBool(1);
      }
    });

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      socket.off("update");
    };
  }, []);

  return fanclub == 0 ? (
    <>
      <h1>안녕</h1>
      <h1>{like}번 좋아요</h1>
      <button onClick={change}>당장눌러</button>
    </>
  ) : (
    <>
      <h1>행복하세요</h1>
    </>
  );
}

export default App;
