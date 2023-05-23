import { useState } from "react";
// import { GraphQLSchema } from "graphql";

export const TypeItem = ({ schema }: { schema: any }) => {
  const allTypes = schema.getTypeMap();
  const [currTypes, setCurrTypes] = useState(["Query"]);
  const [typeMap, setTypeMap] = useState(allTypes);
  const [prevType, setPrevType] = useState([""]);
  const [title, setTitle] = useState("Docs");

  console.log(allTypes);

  const upperCase = (type: string) =>
    type.charAt(0).toUpperCase() + type.slice(1);

  const setCurrTypeArr = (el: string) => {
    if (el === "Docs") {
      setCurrTypes(["Query"]);
      setTypeMap(allTypes);
      setTitle("Docs");
      return;
    }
    const type = createType(el);
    const item = allTypes[type];
    if (item && item._fields) {
      setCurrTypes(Object.keys(item._fields));
      setTypeMap(item._fields);
      setTitle(type);
    } else {
      setCurrTypes([type]);
      setTypeMap(typeMap[el]);
    }
  };

  const createType = (el: string) => {
    const type = typeMap[el]
      ? typeMap[el].type
        ? typeMap[el].type.name
          ? typeMap[el].type.name
          : typeMap[el].type.ofType.name
          ? typeMap[el].type.ofType.name
          : typeMap[el].type.ofType.ofType.name
        : typeMap[el].name
      : allTypes[el].name;
    return upperCase(type);
  };

  const createTypeString = (el: string) => {
    return typeMap[el]
      ? typeMap[el].type
        ? typeMap[el].type.name
          ? typeMap[el].type.name
          : typeMap[el].type.ofType.name
          ? `[${typeMap[el].type.ofType.name}]`
          : typeMap[el].type.ofType.ofType.name
        : typeMap[el].name
      : typeMap[el.toLowerCase()].name;
  };

  return (
    <>
      {prevType.length > 1 && (
        <p
          className="type-name"
          onClick={() => {
            setCurrTypeArr(prevType[prevType.length - 1]);
            setPrevType([...prevType.slice(0, -1)]);
          }}
        >
          {"<" + prevType[prevType.length - 1]}
        </p>
      )}
      <h3>{title}</h3>
      {currTypes.map((el) => {
        return (
          <div key={el} className="type-item">
            {el}
            {typeMap[el] && (
              <>
                {": "}
                <span
                  className="type-name"
                  onClick={() => {
                    setCurrTypeArr(el);
                    setPrevType([...prevType, title]);
                  }}
                >
                  {createTypeString(el)}
                </span>
              </>
            )}
            <p>
              <i>
                {typeMap[el] ? typeMap[el].description : typeMap.description}
              </i>
            </p>
          </div>
        );
      })}
    </>
  );
};
