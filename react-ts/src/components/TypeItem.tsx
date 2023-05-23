import { useState } from "react";

export const TypeItem = ({
  //   currType,
  typeMap,
}: //   description,
{
  currType: string;
  typeMap: any;
  description: string;
}) => {
  const [currType, setCurrType] = useState("Query");
  const [types, setTypes] = useState([]);

  JSON.stringify(typeMap[currType]._fields);
  console.log(typeMap[currType]);
  return (
    <div>
      {currType.toLowerCase()}: {currType}
      <p>{typeMap[currType].description}</p>
    </div>
  );
};
