import { useEffect } from "react";

export function useOnClickOutside(ref, handler, ignoreRefs = []) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements or 
        // element is in the ignored refs list
        if (
          !ref.current ||
          ref.current.contains(event.target) ||
          ignoreRefs.some((ir) => ir.current.contains(event.target))
        ) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.

    // ignoreRefs used for avoiding some elements
    [ref, handler, ignoreRefs]
  );
}
