import React from 'react'

export default function page(params: {
    params: {
        formId: string
    }
} ) {
    const projectId = params.params.formId
  return (
    <div>
      {projectId}
    </div>
  )
}
