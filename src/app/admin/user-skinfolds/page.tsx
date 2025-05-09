'use client'

import { api } from '@/trpc/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { DataTable } from '@/components/skinfolds-table/data-table'

import { SkinfoldChart } from './chart'
import SkinfoldForm from './form'
import {Input} from '@/components/ui/input'
import { NumberInput } from '@/components/ui/number-input'

export const dynamic = 'force-dynamic'

const SkinFolds = ({ userId }: { userId: string }) => {
  const { data: userSkinfolds, isLoading } =
    api.metrics.getUserSkinfolds.useQuery(userId)

  console.log('userSkinfolds', userSkinfolds)

  if (isLoading) return null
  if (!userSkinfolds) return null

  return <DataTable data={userSkinfolds} />
}

const Chart = ({ userId }: { userId: string }) => {
  const [range, setRange] = useState(7)
  const [selectValue, setSelectValue] = useState('bodyWeight')
  const { data: userSkinfolds, isLoading } =
    api.metrics.getUserSkinfolds.useQuery(userId)

  if (isLoading) return null
  if (!userSkinfolds) return null

  const data = userSkinfolds
    .map((skinfold) => {
    let value = null
    if (selectValue === 'bodyWeight') value = skinfold.bodyWeight?.[0]?.bodyWeight
    if (selectValue === 'leanMass') value = skinfold.leanMass?.[0]?.leanMass
    if (selectValue === 'bodyFat') value = skinfold.bodyFat?.[0]?.bodyFat
    if (selectValue === 'chin') value = skinfold.chin
    if (selectValue === 'cheek') value = skinfold.cheek
    if (selectValue === 'lowerAbdominal') value = skinfold.lowerAbdominal
    if (selectValue === 'pectoral') value = skinfold.pectoral
    if (selectValue === 'biceps') value = skinfold.biceps
    if (selectValue === 'triceps') value = skinfold.triceps
    if (selectValue === 'subscapular') value = skinfold.subscapular
    if (selectValue === 'midAxillary') value = skinfold.midAxillary
    if (selectValue === 'suprailiac') value = skinfold.suprailiac
    if (selectValue === 'umbilical') value = skinfold.umbilical
    if (selectValue === 'lowerBack') value = skinfold.lowerBack
    if (selectValue === 'quadriceps') value = skinfold.quadriceps
    if (selectValue === 'hamstrings') value = skinfold.hamstrings
    if (selectValue === 'medialCalf') value = skinfold.medialCalf
    if (selectValue === 'knee') value = skinfold.knee
    if (selectValue === 'shoulder') value = skinfold.shoulder
    return {
      value: value,
      date: skinfold.date,
    }
    })
    .map((skinfold) => ({
      value: Number(skinfold.value),
      date: skinfold.date,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, range)

  console.log('data', data)

  return (
    <div className='flex flex-col gap-4'>
      <SkinfoldChart
        data={data}
        label='label'
      />
      <div className='flex gap-2 justify-center w-full'>

        <NumberInput
          value={range}
          setValue={setRange}
          fixed={1}
          scale={1}
          postfix=''
          isSmall={true}
        />
        <Select
          value={selectValue}
          onValueChange={(value) => {
            setSelectValue(value)
          }}
        >
          <SelectTrigger className='w-48 h-10 rounded-lg'>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='bodyWeight'>Weight</SelectItem>
            <SelectItem value='leanMass'>Lean Mass</SelectItem>
            <SelectItem value='bodyFat'>Body Fat</SelectItem>
            <SelectItem value='chin'>Chin</SelectItem>
            <SelectItem value='cheek'>Cheek</SelectItem>
            <SelectItem value='lowerAbdominal'>Lower Abdominal</SelectItem>
            <SelectItem value='pectoral'>Pectoral</SelectItem>
            <SelectItem value='biceps'>Biceps</SelectItem>
            <SelectItem value='triceps'>Triceps</SelectItem>
            <SelectItem value='subscapular'>Subscapular</SelectItem>
            <SelectItem value='midAxillary'>Mid Axillary</SelectItem>
            <SelectItem value='suprailiac'>Suprailiac</SelectItem>
            <SelectItem value='umbilical'>Umbilical</SelectItem>
            <SelectItem value='lowerBack'>Lower Back</SelectItem>
            <SelectItem value='quadriceps'>Quadriceps</SelectItem>
            <SelectItem value='hamstrings'>Hamstrings</SelectItem>
            <SelectItem value='medialCalf'>Medial Calf</SelectItem>
            <SelectItem value='knee'>Knee</SelectItem>
            <SelectItem value='shoulder'>Shoulder</SelectItem>
          </SelectContent>
        </Select>
    </div>
    </div>
  )
}

export default function Home() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  const { data: currentUserLogs, isLoading } = api.dailyLog.getAllUser.useQuery(
    userId ?? '',
  )

  if (isLoading) return null

  if (
    userId === '' ||
    userId === undefined ||
    userId === null ||
    userId === 'null'
  )
    return <div>Select a user</div>

  const bodyWeight = currentUserLogs?.sort((a, b) =>
    b.date.localeCompare(a.date),
  )[0]?.morningWeight

  return (
    <div className='max-w-[1400px] mx-auto my-10'>
      <SkinfoldForm
        userId={userId}
        bodyWeight={bodyWeight || ''}
      />
      <Chart userId={userId} />
      <SkinFolds userId={userId} />
    </div>
  )
}
