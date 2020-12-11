import React, { useEffect } from "react";
import DivTimeline from "../../components/Timeline";

export default function Timeline() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <DivTimeline />
    </div>
  );
}
