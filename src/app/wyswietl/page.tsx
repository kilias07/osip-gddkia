"use client";

import { useEffect, useState } from "react";

const ShowResults = () => {
  const [allData, setAllData] = useState<any>([]);
  useEffect(() => {
    setAllData(
      Object.keys(window.sessionStorage).map((key) =>
        JSON.parse(sessionStorage.getItem(key)!)
      )
    );
  }, []);

  console.log("allData", allData);
  return <div>to jest road number</div>;
};

export default ShowResults;
