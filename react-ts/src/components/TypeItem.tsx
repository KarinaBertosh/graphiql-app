import { useState } from "react";
import { useTranslation } from "react-i18next";

export const TypeItem = ({
  schema,
  isOpenDocumentation,
}: {
  schema: any;
  isOpenDocumentation: boolean;
}) => {
  const { t } = useTranslation();
  const allTypes = schema.getTypeMap();
  const [currTypes, setCurrTypes] = useState([t("query")]);
  const [typeMap, setTypeMap] = useState(allTypes);
  const [prevType, setPrevType] = useState([""]);
  const [title, setTitle] = useState(t("docs"));

  const upperCase = (type: string) =>
    type.charAt(0).toUpperCase() + type.slice(1);

  const setCurrTypeArr = (el: string) => {
    if (el === t("docs")) {
      setCurrTypes([t("query")]);
      setTypeMap(allTypes);
      setTitle(t("docs"));
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

  const createArgs = (el: string) => {
    const args = typeMap[el].args;
    return (
      "(" +
      args.map((arg: any) => {
        return (
          arg.name +
          ": " +
          (arg.type.name
            ? arg.type.name
            : arg.type.ofType.name
            ? arg.type.ofType.name
            : arg.type.ofType.ofType.ofType.name)
        );
      }) +
      ")"
    );
  };

  return (
    <div
      className={"flex-grow" + (isOpenDocumentation ? "" : " schema-closed")}
    >
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
                {typeMap[el].args &&
                  typeMap[el].args.length > 0 &&
                  createArgs(el)}
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
    </div>
  );
};
