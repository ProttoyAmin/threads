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
import { ThreadValidation } from '@/lib/validations/thread';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
    userId: string;
    btnTitle: string
}

function PostThread({ userId, btnTitle }: Props) {
    const form = useForm<z.infer<typeof ThreadValidation>>(
        {
            resolver: zodResolver(ThreadValidation),
            defaultValues: {
                thread: "",
                accountId: userId,
            },
        }
    );

    async function onSubmit(values: z.infer<typeof ThreadValidation>) {
        console.log("Form Values: ", values)
        form.reset();
    }
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-20 flex flex-col justify-start gap-10"
                >
                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=''>
                                    Thread
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={15}
                                        className='account-form_input'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className='cursor-pointer h-12'>{btnTitle}</Button>
                </form>
            </Form>
        </>
    )
}

export default PostThread;