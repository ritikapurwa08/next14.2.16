import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { plant_image } from "../../../public/images";

const UiDisplay = () => {
  return (
    <div className="grid grid-cols-3 max-h-[800px] h-screen ">
      <div className="flex flex-col justify-between  " id="vertical-col-1">
        <div id="UiLogo" className="flex flex-row gap-x-2">
          <div>
            <p className="text-6xl leading-3 size-20 uiLogoShadow rounded-md text-white  bg-purple-700 p-6">
              e
            </p>
          </div>
          <div>
            <h1 className="text-xl font-bold">Elements</h1>
            <p> widget Collection</p>
          </div>
        </div>

        <div className="space-y-4" id="card-alert&&card-with-image">
          <div id="card-alert">
            <Alert>
              <AlertDialogHeader>
                <AlertTitle>This is a nice blog title.</AlertTitle>
                <AlertDescription>
                  you are about to undo this action
                </AlertDescription>
                <AlertDialogFooter className="flex flex-row justify-between items-center px-4">
                  <Button variant="link">Cancel</Button>
                  <Button className="text-yellow-400" variant="link">
                    May be Later
                  </Button>
                </AlertDialogFooter>
              </AlertDialogHeader>
            </Alert>
          </div>
          <div id="card-with-image">
            <Card>
              <CardHeader>
                <CardTitle>This is a card title</CardTitle>
                <CardDescription>This is a card description</CardDescription>
                <CardContent className="p-0 m-0">
                  <div className="h-60 w-full overflow-hidden ">
                    <Image
                      src={plant_image}
                      className="object-cover aspect-video"
                      alt="plant"
                      height={1500}
                      width={1500}
                    />
                  </div>
                  <div>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Cumque dolores ipsam quaerat quasi quia recusandae
                      architecto neque maxime voluptatum odit!
                    </p>
                  </div>
                  <CardFooter>
                    <Button variant="default" size="lg" className="w-full">
                      Read More
                    </Button>
                  </CardFooter>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
      <div id="vertical-col-2">
        <div id="cloud-image-upload-icon&&menu-option">
          <div id="cloud-image-upload-icon"></div>
          <div id="menu-option"></div>
        </div>
        <div id="dashboard-design-header"></div>
        <div id="dashboard-design-body"></div>
        <div id="dismiss-alert"></div>
      </div>
      <div id="vertical-col-3">
        <div id="start-conversation"></div>
        <div id="board-pass-form"></div>
      </div>
    </div>
  );
};

export default UiDisplay;
