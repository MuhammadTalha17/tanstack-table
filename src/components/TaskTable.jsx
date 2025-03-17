import { Box } from "@chakra-ui/react";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DATA from "../data";
import EditableCell from "./EditableCell";

const columns = [
  {
    accessorKey: "task",
    header: "Task",
    size: 225,
    cell: EditableCell,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <p>{props.getValue()?.name}</p>,
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

const TaskTable = () => {
  const [data, setData] = useState(DATA);

  const table = useReactTable({
    data,
    columns, //an array of column definitions
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  console.log(table.getHeaderGroups());

  return (
    <Box>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box key={headerGroup.id} className="tr">
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${
                    header.column.getIsResizing() ? "isResizing" : ""
                  } `}
                />
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box key={row.id} className="tr">
            {row.getVisibleCells().map((cell) => (
              <Box className="td" w={cell.column.getSize()} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default TaskTable;
