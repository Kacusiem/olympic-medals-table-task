import { useCallback, useState } from "react";
import { FaSort } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

import useCountriesStore from "../../store/store";
import Button from "../buttons/Button";
import SortButton from "../buttons/SortButton";
import { SortKeys } from "../../types/types";
import { SortOrder } from "../../types/types";

const sortHeaders = [
  { key: SortKeys.GOLD, label: "Gold medals" },
  { key: SortKeys.SILVER, label: "Silver medals" },
  { key: SortKeys.BRONZE, label: "Bronze medals" },
  { key: SortKeys.ALL_MEDALS, label: "All medals" },
];

const CountryTable = () => {
  type Data = typeof countries;
  const { countries, deleteCountry } = useCountriesStore();
  const elementsStyle = "px-6 py-4 font-semibold";
  const [sortKey, setSortKey] = useState<SortKeys>(SortKeys.ALL_MEDALS);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASCENDING);

  const deleteCountriesClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    deleteCountry(id);
  };

  const sortData = useCallback(
    ({
      tableData,
      sortKey,
      reverse,
    }: {
      tableData: Data;
      sortKey: SortKeys;
      reverse: boolean;
    }) => {
      if (!sortKey) return tableData;

      const sortedCountries = countries.sort((a: any, b: any) => {
        return a[sortKey] - b[sortKey];
      });

      if (reverse) {
        return sortedCountries.reverse();
      }

      return sortedCountries;
    },
    [countries]
  );

  const sortedData = useCallback(
    () =>
      sortData({
        tableData: countries,
        sortKey,
        reverse: sortOrder === SortOrder.DESCENDING,
      }),
    [countries, sortData, sortKey, sortOrder]
  );

  const changeSort = (key: SortKeys) => {
    setSortOrder(
      sortOrder === SortOrder.ASCENDING
        ? SortOrder.DESCENDING
        : SortOrder.ASCENDING
    );
    setSortKey(key);
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 w-1/2">
        <table className="w-full text-sm text-left text-gray-500 bg-gray-50">
          <thead className="text-xs text-gray-700">
            <tr>
              <td className="px-6 py-3 font-semibold">Country</td>
              {sortHeaders.map((row) => {
                return (
                  <td key={row.key} className="px-6 py-3 font-semibold">
                    <SortButton onClick={() => changeSort(row.key)}>
                      <div className="flex justify-center items-center">
                        {row.label} <FaSort />
                      </div>
                    </SortButton>
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData().map((country) => (
              <>
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    key={country.id}
                    className={`${elementsStyle} text-gray-900 whitespace-nowrap`}
                  >
                    {country.country}
                  </th>
                  <td className={`${elementsStyle}`}>{country.gold}</td>
                  <td className={`${elementsStyle}`}>{country.silver}</td>
                  <td className={`${elementsStyle}`}>{country.bronze}</td>
                  <td className={`${elementsStyle}`}>{country.allMedals}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-start items-center">
                      <Button
                        color="danger"
                        className="ml-2"
                        tooltip={"Delete country"}
                        onClick={(e) => deleteCountriesClick(e, country.id)}
                      >
                        <AiOutlineDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CountryTable;
