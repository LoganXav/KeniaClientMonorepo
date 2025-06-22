import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { ClassPromotionCreateForm } from "./_features/class-promotion-create-form";

export default function ClassPromotionCreatePage() {
  const pageBreadcrumbs = [{ title: "Class", path: RouteEnums.CLASS }, { title: "Class Promotion", path: RouteEnums.CLASS_PROMOTION }, { title: "Manage Promotions" }];
  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <ClassPromotionCreateForm />
      </div>
    </>
  );
}
