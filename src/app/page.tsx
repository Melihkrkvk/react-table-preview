import React from "react";
import ReactTable from "../components/MantineReactTable";
import { groupData } from "../utils/groupMock";
import { data } from "../utils/dataMock";

export default function page({ searchParams }: any) {
  let catchGroup: string[] = Object.keys(searchParams).filter((item: any) =>
    item.startsWith("group")
  );
  return (
    <ReactTable
      data={catchGroup.length > 0 ? groupData : data}
      selectBoxActions={[
        { label: "Publish", value: "publish" },
        { label: "Delete", value: "delete" },
      ]}
      createButtonName={"Create User"}
      createButtonRouter="/"
      columns={[
        {
          accessorKey: "firstName",
          header: "First Name",
          enableColumnOrdering: true,
          enableColumnFilter: false,
        },
        {
          accessorKey: "lastName",
          header: "Last Name",
          enableColumnOrdering: true,
        },
        {
          accessorKey: "address",
          header: "Adress",
          enableColumnOrdering: true,
        },
        {
          accessorKey: "city",
          header: "City",
          enableColumnOrdering: true,
        },
        {
          accessorKey: "state",
          header: "State",
          enableColumnOrdering: true,
        },
      ]}
    />
  );
}
