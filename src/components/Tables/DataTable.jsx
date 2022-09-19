/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import "./table.css";
import GlobalFilter from "./GlobalFilter";
import CheckBox from "./CheckBox";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiSettings,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const DataTable = ({
  pillars,
  rows,
  canManage = false,
  manageRow = undefined,
  selectable = false,
}) => {
  const { currentColor } = useStateContext();
  const columns = useMemo(() => pillars, []);
  const data = useMemo(() => rows, [rows]);

  const selectedHooks = (hooks) => {
    hooks.visibleColumns.push((cols) => {
      return [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <CheckBox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <CheckBox {...row.getToggleRowSelectedProps()} />,
        },
        ...cols,
      ];
    });
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    selectedFlatRows,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    selectable && selectedHooks
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="data__table-design">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table
        id="custom-table"
        {...getTableProps()}
        className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ backgroundColor: currentColor }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronUp />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
              {canManage && (
                <th style={{ backgroundColor: currentColor }}>Modify</th>
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page?.length > 0 ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                  {canManage && (
                    <td>
                      <button
                        type="button"
                        onClick={() => manageRow(row.original)}
                        className={`text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                        style={{ backgroundColor: currentColor }}
                      >
                        <FiSettings />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={headerGroups?.length}
                style={{ color: "red" }}
                className="uppercase"
              >
                No Data Found!!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div
        id="table-footer"
        className="flex flex-row text-sm text-gray-500 dark:text-gray-400"
      >
        <div className="basis-3/4">
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length} |
            </strong>
          </span>
          <span>
            Go to page:{" "}
            <input
              type="number"
              min={1}
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: 50 }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </span>
        </div>
        <div className="basis-1/8">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="block w-full p-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {[10, 25, 50].map((size, i) => (
              <option value={size} key={i}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
        <div className="basis-1/8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <FiChevronsLeft />
            </button>
            <button
              type="button"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <FiChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <FiChevronRight />
            </button>
            <button
              type="button"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <FiChevronsRight />
            </button>
          </div>
        </div>
      </div>
      {/* <pre className="mt-10">
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </div>
  );
};

export default DataTable;
