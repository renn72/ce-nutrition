'use client'
import { FormRecipe } from "@/components/recipe/form-recipe";

export default function Page() {
  return (
    <div className='flex flex-col max-w-screen-2xl w-full mx-auto lg:mt-10'>
      <FormRecipe recipe={null} />
    </div>
  )
}
