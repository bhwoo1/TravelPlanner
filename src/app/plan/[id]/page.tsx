import PlanPage from '@/app/components/plan/PlanPage';
import React from 'react'

async function page({params}: {params: Promise<{id: string}>}) {
  const { id } = await params;
  return (
    <PlanPage oneTimeId={id} />
  )
}

export default page