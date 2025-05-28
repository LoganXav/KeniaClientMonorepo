import { Card } from "@repo/ui";

export function WorkspaceOverview() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card className="md:col-span-2 p-4">1</Card>
      <Card className="p-4">2</Card>
    </div>
  );
}
