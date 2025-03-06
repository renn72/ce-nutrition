'use client'
import { FormPlan } from '@/components/plan-form/form-plan'

export default function Page() {
  return (
    <div className='flex flex-col max-w-7xl w-full mx-auto'>
      <FormPlan plan={null} />
    </div>
  )
}
