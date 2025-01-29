import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui";
import React from "react";

const meta: Meta<typeof Tabs> = {
  title: "Atoms/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "Override or extend the styles applied to the component",
      control: "text",
      table: {
        category: "Override/extend",
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
    </Tabs>
  ),
};

// export const WithCustomStyles: Story = {
//   render: (args) => (
//     <div className="space-y-8 max-w-xl">
//       <Tabs {...args} className="space-y-4" defaultValue="student">
//         <TabsList>
//           <TabsTrigger value="student">I'm A Student</TabsTrigger>
//           <TabsTrigger value="staff">I'm A Staff</TabsTrigger>
//         </TabsList>
//         <TabsContent value="student">
//           <Card className="py-5 px-4">
//             <CardContent className="flex gap-4">
//               <div className="space-y-2 md:w-[75%]">
//                 <p className="text-lg font-bold">Log in as a student to</p>
//                 <div className="space-y-2">
//                   {["Access all your course materials.", "Submit assignments.", "Get course announcements."].map((item, index) => (
//                     <div key={index} className="flex items-center space-x-2">
//                       <Check color="white" size={15} className="bg-green-700 rounded-full p-[2px]" />
//                       <p className="text-muted-foreground text-sm">{item}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="staff">
//           <Card className="py-5 px-4">
//             <CardContent className="flex gap-4">
//               <div className="space-y-2 md:w-[75%]">
//                 <p className="text-lg font-bold">Log in as a staff to</p>
//                 <div className="space-y-2">
//                   {["Manage and upload course materials.", "View and manage student information.", "Track course progress and grading."].map((item, index) => (
//                     <div key={index} className="w-full flex items-center space-x-2">
//                       <Check color="white" size={15} className="bg-green-700 rounded-full p-[2px]" />
//                       <p className="text-muted-foreground text-sm">{item}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   ),
// };
