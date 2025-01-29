import type { Meta, StoryObj } from "@storybook/react";
import { TableRoot, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from "@repo/ui";

const meta: Meta<typeof TableRoot> = {
  title: "Atoms/Table",
  component: TableRoot,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <TableRoot {...args}>
      <TableCaption>Example Table</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Header 1</TableHead>
          <TableHead>Header 2</TableHead>
          <TableHead>Header 3</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Row 1, Cell 1</TableCell>
          <TableCell>Row 1, Cell 2</TableCell>
          <TableCell>Row 1, Cell 3</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Row 2, Cell 1</TableCell>
          <TableCell>Row 2, Cell 2</TableCell>
          <TableCell>Row 2, Cell 3</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Footer</TableCell>
        </TableRow>
      </TableFooter>
    </TableRoot>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <TableRoot {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Header 1</TableHead>
          <TableHead>Header 2</TableHead>
          <TableHead>Header 3</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Row 1, Cell 1</TableCell>
          <TableCell>Row 1, Cell 2</TableCell>
          <TableCell>Row 1, Cell 3</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Footer with some summary</TableCell>
        </TableRow>
      </TableFooter>
    </TableRoot>
  ),
};
