import { useEffect, useRef } from "react";

export default function useOutSideClick(handler, LesseningCapturing = true) {
  const ref = useRef();
  console.log("starting...");
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, LesseningCapturing);

      return () =>
        document.removeEventListener("click", handleClick, LesseningCapturing);
    },
    [handler, LesseningCapturing]
  );

  return { ref };
}
