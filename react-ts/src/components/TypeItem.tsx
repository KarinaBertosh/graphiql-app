import { useState } from "react";
import { GraphQLSchema } from "graphql";

export const TypeItem = ({ schema }: { schema: any }) => {
  const allTypes = schema.getTypeMap();
  const [currTypes, setCurrTypes] = useState(["Query"]);
  const [typeMap, setTypeMap] = useState(allTypes);

  console.log(allTypes);

  const setCurrTypeArr = (type: string) => {
    const item = allTypes[type];
    console.log("item");
    console.log(item);
    if (item && item._fields) {
      setCurrTypes(Object.keys(item._fields));
      console.log("item._fields");
      console.log(item._fields);
      setTypeMap(item._fields);
    } else setCurrTypes([type]);
  };

  const createType = (el: string) => {
    const type = typeMap[el].type
      ? typeMap[el].type.name
        ? typeMap[el].type.name
        : typeMap[el].type.ofType.name
        ? typeMap[el].type.ofType.name
        : typeMap[el].type.ofType.ofType.name
      : typeMap[el].name;
    console.log(type);
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const createTypeString = (el: string) =>
    typeMap[el].type
      ? typeMap[el].type.name
        ? typeMap[el].type.name
        : typeMap[el].type.ofType.name
        ? `[${typeMap[el].type.ofType.name}]`
        : typeMap[el].type.ofType.ofType.name
      : typeMap[el].name;

  return (
    <>
      {currTypes.map((el) => {
        console.log(el);
        return (
          <div key={el} className="type-item">
            {el + ": "}
            <span
              className="type-name"
              onClick={() => setCurrTypeArr(createType(el))}
            >
              {createTypeString(el)}
            </span>
            <p>
              <i>{typeMap[el].description}</i>
            </p>
          </div>
        );
      })}
    </>
  );
};
