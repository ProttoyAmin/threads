'use client';
import React, { ChangeEvent, useState } from 'react';
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  },
  btnTitle: string;
}

function AccountProfile({ user, btnTitle }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('media');
  const router = useRouter();
  const pathname = usePathname();

  console.log("StartUpload: ",startUpload)


  const form = useForm<z.infer<typeof UserValidation>>(
    {
      resolver: zodResolver(UserValidation),
      defaultValues: {
        profile_photo: user?.image ? user.image : "",
        name: user?.name ? user.name : "",
        username: user?.username ? user.username : "",
        bio: user?.bio ? user.bio : "",
      },
    }
  );

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    console.log("FORM VALUES: ", values);
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);
    console.log("HasImageChanged: ", hasImageChanged)

    if (hasImageChanged) {
      const imageResponse = await startUpload(files);
      console.log("Inside hasImageChanged condition...")
      console.log("Image Response:", imageResponse)

      if (imageResponse && imageResponse[0]?.ufsUrl){
        values.profile_photo = imageResponse[0].ufsUrl;
      }

    }

    // Todo: Update User Profile
    const updatedUser = {
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
    }
    await updateUser(updatedUser);

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  }

  const handleImage = (event: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    console.log("evenT: ", event)
    const fileReader = new FileReader();

    if (event.target.files && event.target.files?.length > 0) {
      const file = event.target.files[0];
      setFiles(Array.from(event.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || '';
        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className='flex items-center gap-10'>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-cover w-20 h-20'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile_icon'
                    width={24}
                    height={24}
                    className='rounded-full object-cover'
                  />
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder="Choose Image"
                  className=''
                  onChange={(event) => handleImage(event, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=''>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='account-form_input'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel className=''>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='account-form_input'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=''>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className='account-form_input'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile
