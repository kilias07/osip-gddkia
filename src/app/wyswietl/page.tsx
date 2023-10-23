"use client";
const ShowResults = () => {
  const allData = Object.keys(window.sessionStorage).map((key) =>
    JSON.parse(sessionStorage.getItem(key)!)
  );
  console.log("allData", allData);
  // console.log("pierwszy wynik", sessionStorage.get(allRes[0]));
  return <div>to jest road number</div>;
};

export default ShowResults;
