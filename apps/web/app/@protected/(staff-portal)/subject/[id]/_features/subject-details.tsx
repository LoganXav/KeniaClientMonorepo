"use client";

import { useAuthUser } from "@/hooks/use-auth-user";
import { useGetSingleSubjectQuery } from "@/apis/core-subject-api/subject";

export function SubjectDetails({ subjectId }: { subjectId: number }) {
  const { authUserIds } = useAuthUser();

  const subjectQueryResult = useGetSingleSubjectQuery({
    params: { tenantId: authUserIds?.tenantId, subjectId },
  });

  return (
    <>
      <div>{subjectId}</div>
    </>
  );
}
