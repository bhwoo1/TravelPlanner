import React from 'react'

async function page({params}: {params: Promise<{id: string}>}) {
  const { id } = await params;
  return (
    <div>{id} page</div>
  )
}

export default page