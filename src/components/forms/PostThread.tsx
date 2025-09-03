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
import { createThread } from '@/lib/actions/thread.actions';
import { useOrganization } from '@clerk/nextjs';

interface Props {
    userId: string;
    btnTitle: string
}

function PostThread({ userId, btnTitle }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { organization } = useOrganization();
    console.log("Organization: ", organization!.id)

    const form = useForm<z.infer<typeof ThreadValidation>>(
        {
            resolver: zodResolver(ThreadValidation),
            defaultValues: {
                thread: "",
                accountId: userId,
            },
        }
    );

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof ThreadValidation>) {
        console.log("Form Values: ", values);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        form.reset();

        const threadInfo = {
            text: values.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname
        }

        await createThread(threadInfo);
        router.push('/')
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

                    <Button type="submit" className="cursor-pointer h-12" disabled={isSubmitting}>
                        {isSubmitting ? "Posting..." : btnTitle}
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default PostThread;