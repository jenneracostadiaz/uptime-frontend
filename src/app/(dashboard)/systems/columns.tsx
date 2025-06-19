"use client";

import type {ColumnDef} from "@tanstack/table-core";
import type {System} from "@/type/System";

export const columns: ColumnDef<System>[]  = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
];