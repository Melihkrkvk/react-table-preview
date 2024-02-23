"use client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import { useEffect, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_SortingState,
  MRT_RowSelectionState,
  MRT_GroupingState,
  MRT_ExpandAllButton,
} from "mantine-react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { ActionIcon, Box, Button, Group, Select, Tooltip } from "@mantine/core";
import { IconEye, IconPlus, IconWriting } from "@tabler/icons-react";

type Props = {
  data: any;
  columns: MRT_ColumnDef<any>[];
  selectBoxActions?: any;
  createButtonRouter?: string;
  createButtonName?: string;
  updateButtonTitle?: string;
};

const ReactTable = ({
  data,
  columns,
  selectBoxActions,
  createButtonRouter,
  createButtonName,
  updateButtonTitle,
}: Props) => {
  const searchParams = useSearchParams();
  const globalFilter = searchParams.get("search");
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [grouping, setGrouping] = useState<MRT_GroupingState>([]);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [loading, setLoading] = useState<true | false>(false);
  const [selectedAction, setSelectedAction] = useState<String | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    columns?.map((item: any, key: any) => {
      const field = grouping.find((header: any) => header === item.accessorKey);
      if (field) {
        params.set(`group${key}`, `${field}`);
      } else {
        params.delete(`group${key}`);
      }
    });

    router.push("?" + params);
  }, [grouping]);

  const table = useMantineReactTable({
    columns,
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    data: data ?? 0,
    initialState: { showColumnFilters: false },
    manualFiltering: true,
    manualGrouping: true,
    manualSorting: true,
    groupedColumnMode: "remove",
    positionExpandColumn: "first",
    enableRowActions: true,
    positionActionsColumn: "last",
    onRowSelectionChange: setRowSelection,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Actions",
      },
      "mrt-row-expand": {
        Header: () => (
          <Group display={"flex"}>
            <MRT_ExpandAllButton table={table} />
            <Box>Groups</Box>
          </Group>
        ),
        GroupedCell: ({ row }) => {
          return row.getValue(grouping[grouping.length - 1]);
        },
      },
    },
    getRowId: (row: any) => {
      return row.uuid;
    },
    renderRowActions: () => {
      return (
        <Group>
          <IconEye color="gray" style={{ cursor: "pointer" }} />
          <IconWriting color="gray" style={{ cursor: "pointer" }} />
        </Group>
      );
    },

    onGroupingChange: setGrouping,
    onColumnFiltersChange: (filterValue: any) => {
      (() => {
        const params = new URLSearchParams(searchParams.toString());
        setColumnFilters(filterValue);
        columns.map((item: any) => {
          const field = filterValue(columnFilters).find(
            (col: any) => col.id === item.accessorKey
          );
          if (field) {
            params.set(`${field.id}`, field.value);
          } else {
            params.delete(`${item.accessorKey}`);
          }
        });
        router.push("?" + params);
      })();
    },
    onGlobalFilterChange: (globalFilterText: any) => {
      const params = new URLSearchParams(searchParams.toString());
      if (globalFilterText) {
        params.set("search", globalFilterText);
      } else {
        params.delete("search");
      }
      router.push("?" + params);
    },
    onSortingChange: setSorting,
    renderTopToolbarCustomActions: ({ table }) => {
      const selectedRows = Object.keys(rowSelection);

      return (
        <>
          <Group>
            <Tooltip label={createButtonName} position="bottom">
              <ActionIcon
                onClick={() => router.push(`${createButtonRouter}`)}
                color={"dark"}
                size={"lg"}
              >
                <IconPlus size={40} />
              </ActionIcon>
            </Tooltip>
            {selectBoxActions && (
              <>
                <Select
                  data={selectBoxActions}
                  clearable
                  placeholder={"pick an action"}
                  w={150}
                  onChange={(changeAction: any) => {
                    setSelectedAction(changeAction);
                  }}
                />
                <Button
                  variant="outline"
                  color={selectedAction === "Delete" ? "red" : ""}
                  disabled={!selectedAction}
                  onClick={async () => {
                    setLoading(true);
                    //await executeAction(selectedAction, selectedRows);
                    setLoading(false);
                    setRowSelection({});
                  }}
                  loading={loading}
                >
                  {updateButtonTitle}
                </Button>
              </>
            )}
          </Group>
        </>
      );
    },
    state: {
      columnFilters,
      globalFilter,
      grouping,
      rowSelection,
      sorting,
    },
  });

  return <MantineReactTable table={table} />;
};

export default ReactTable;
