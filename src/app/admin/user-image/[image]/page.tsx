'use client'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {  useState } from 'react'
import { api } from '@/trpc/react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { ImageAdd, ImageView } from '@/components/images/image-comparision'
import { Menu } from 'lucide-react'

export default function Page({
	params: _,
}: {
	params: Promise<{ image: string }>
}) {
	const searchParams = useSearchParams()
	const imageId = searchParams.get('imageId')
	const user = searchParams.get('user')
	const date = searchParams.get('date') ?? ''
	const router = useRouter()

	const [images, setImages] = useState([
		{ url: `https://utfs.io/f/${imageId}`, date: date },
	])
  const { data: isRoot } = api.user.isRoot.useQuery()
	const { data: userNotes } = api.trainerNotes.getAllUser.useQuery({
		userId: user ?? '',
	})

  console.log(isRoot)

	if (!imageId) return <div>Loading...</div>

	return (
		<div className='w-full grid justify-center px-2 relative'>
				<div className='absolute top-1 right-2 z-20'>
					<Popover>
						<PopoverTrigger asChild>
							<Button
                variant='secondary'
								className=' hover:outline hover:bg-primary/00 w-10 h-10 rounded-full p-0'
							>
								<Menu size={24} />
							</Button>
						</PopoverTrigger>
						<PopoverContent className=''>
            {
              userNotes?.map((note) => (
                <div
                  key={note.id}
                  className='flex gap-2 items-center justify-between w-full'
                >
                  <div className='text-base font-medium'>{note.description}</div>
                  <div className='flex gap-2 items-center justify-between w-full'>
                    <div className='text-[0.6rem] rounded-full bg-muted px-2 py-1 w-fit'>
                      {note.updatedAt?.toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                    <div className='text-[0.6rem] rounded-full bg-secondary text-secondary-foreground px-2 py-1 w-fit'>
                      {note.trainer.name}
                    </div>
                  </div>
                </div>
              ))
            }

          </PopoverContent>
					</Popover>
				</div>
			<div className='relative flex gap-2  overflow-x-auto'>
				<Button
					onClick={() => router.push(`/admin/user-image?user=${user}`)}
					className='absolute top-2 left-2 z-20'
				>
					Back
				</Button>
				{images.map((image) => (
					<ImageView
						key={image.url}
						src={image.url}
						alt='image'
						date={image.date}
            isRoot={isRoot?.isRoot ?? false}
            userId={user ?? ''}
            isAdmin={true}
					/>
				))}
				<ImageAdd setImages={setImages} images={images} />
			</div>
		</div>
	)
}
