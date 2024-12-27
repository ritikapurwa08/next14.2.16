import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div className="prose prose-2xl mx-auto text-center  ">
        <h1 className=" text-4xl font-semibold">
          Oragnize, Share & Collaborate with ease.
        </h1>
        <p>
          Save and organize your code snippets in the cloud. Single Page Website
          , Eccormerse Apps, and much more.
        </p>
      </div>
      <div className="mx-auto w-fit flex flex-row gap-x-2">
        <Button type="button" variant="outline">
          <Link href="/admin">Be Admin</Link>
        </Button>
        <Button type="button" variant="outline">
          <Link href="/about">Know More</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
