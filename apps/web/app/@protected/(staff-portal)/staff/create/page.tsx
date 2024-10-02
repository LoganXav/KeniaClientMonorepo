"use client";
import { useSignUpMutation } from "@/apis/authentication/authentication";
import { RouteEnums } from "@/constants/router/route-constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardDescription,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@repo/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

function page({}: Props) {
  const { createStaff, isPending, error } = useSignUpMutation();

  const router = useRouter();

  const handleCreateStaff = (values) => {
    createStaff(
      { ...values },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          router.push("/");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const defaultValues = {};

  const form = useForm<unknown>({
    resolver: zodResolver(undefined),
    defaultValues,
    mode: "onSubmit",
  });

  return (
    <div>
      <Card className="grid lg:grid-cols-3 gap-8 p-4 my-8 md:p-8">
        <div className="space-y-4">
          <CardTitle className="font-heading">Personal Information</CardTitle>
          <CardDescription>
            Personal identification numbers: social security number (SSN),
            passport number, driver's license number, taxpayer identification
            number, patient identification number.
          </CardDescription>
        </div>
        <div className="col-span-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateStaff)}
              className="space-y-4"
            >
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </Card>

      <div className="flex items-center justify-center gap-4">
        <Link href={RouteEnums.STAFF_LIST}>
          <Button variant={"outline"}>Cancel</Button>
        </Link>

        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default page;
