"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface UserIconProps {
  className?: string;
  userIconText: string;
  size?: "sm" | "md" | "lg";
  backgroundColor?: string;
  textColor?: string;
}

const UserIcon: React.FC<UserIconProps> = ({
  className,
  userIconText,
  size = "md",
  backgroundColor = "bg-gray-100", // Default background color
  textColor = "text-gray-700", // Default text color
}) => {
  const textSize = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-lg",
  };
  const iconSize = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };
  return (
    <div
      className={cn(
        className,
        "flex items-center justify-center rounded-full border border-gray-200 relative  overflow-hidden", // Base styles
        "opacity-90", // Base opacity
        iconSize[size],
        backgroundColor
      )}
    >
      {/* Background Blur */}
      <div className="absolute inset-0 blur-sm opacity-50 bg-gradient-to-br from-blue-300 to-purple-300 "></div>

      <div
        className={`relative z-10  font-medium uppercase ${textSize[size]} ${textColor}`}
      >
        {userIconText.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};

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
import {
  CheckCircle2,
  CloudUpload,
  EditIcon,
  FlagIcon,
  LucideIcon,
  MessageCircleIcon,
  MoreVerticalIcon,
  PenIcon,
  PlusIcon,
  ReplyIcon,
} from "lucide-react";
import { IoMdArrowBack } from "react-icons/io";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { IconType } from "react-icons";

// ============================== Header
interface DashboardHeader {
  showMessageIcon?: boolean;
}
const DashBoardHeader = ({ showMessageIcon }: DashboardHeader) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-row justify-between p-2 border items-center  rounded-md bg-gray-50 dark:bg-gray-800"
      id="dashboard-design-header"
    >
      <div id="purpleBar" className="h-12 w-1 rounded-xl bg-purple-600" />
      <div className="w-auto flex flex-grow flex-col ml-2">
        <p className="font-medium text-gray-800 dark:text-gray-100">
          Dashboard Design
        </p>
        <p className="text-gray-500 dark:text-gray-400">@ui/ux</p>
      </div>
      <div className="space-x-1" id="more-button">
        {showMessageIcon && (
          <Button size="icon" variant="outline">
            <MessageCircleIcon />
          </Button>
        )}
        <Button size="icon" variant="outline">
          <MoreVerticalIcon />
        </Button>
      </div>
    </motion.div>
  );
};

// ============================== UI Logo Component
const UiLogo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-row gap-x-2 mb-8"
      id="UiLogo"
    >
      <div>
        <p className="text-6xl leading-3 size-20 rounded-md text-white  bg-purple-700 p-6 shadow-lg">
          e
        </p>
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Elements
        </h1>
        <p className="text-gray-500 dark:text-gray-400">widget Collection</p>
      </div>
    </motion.div>
  );
};

// ============================== Card Alert
const CardAlert = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      id="card-alert"
    >
      <Alert>
        <AlertDialogHeader>
          <AlertTitle>This is a nice blog title.</AlertTitle>
          <AlertDescription>you are about to undo this action</AlertDescription>
          <AlertDialogFooter className="flex flex-row justify-between items-center px-4">
            <Button variant="link">Cancel</Button>
            <Button className="text-yellow-400" variant="link">
              May be Later
            </Button>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </Alert>
    </motion.div>
  );
};

// ============================== Card With Image
const CardWithImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      id="card-with-image"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-800 dark:text-gray-100">
            This is a card title
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            This is a card description
          </CardDescription>
          <CardContent className="p-0 m-0">
            <div className="h-40 w-full overflow-hidden ">
              <Image
                src={plant_image}
                className="object-cover aspect-video"
                alt="plant"
                height={1500}
                width={1500}
              />
            </div>
            <div>
              <p className="line-clamp-2 py-1 text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
                dolores ipsam quaerat quasi quia{" "}
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
    </motion.div>
  );
};

const MenuOption = ({
  menuIcon,
  menuText,
}: {
  menuIcon: LucideIcon | IconType;
  menuText: string;
}) => {
  const Icon = menuIcon;
  return (
    <div className="flex flex-row gap-x-2 items-center justify-start">
      <div className="rounded-md">
        <div className="flex justify-start items-center text-white">
          <Icon />
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400">{menuText}</p>
    </div>
  );
};

const ActiveIcon = ({ activeCount }: { activeCount: number }) => {
  return (
    <div className="size-8 rounded-full bg-purple-600 relative flex justify-center items-center ">
      <div className="flex justify-center text-white text-sm items-center">
        {activeCount}
        <div className="absolute rounded-full -top-[2px] right-[1px] size-2 bg-green-600" />
      </div>
    </div>
  );
};

// ============================== Cloud Image Upload & Menu Option
const CloudUploadAndMenuOption = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-row gap-x-2 items-center justify-end"
      id="cloud-image-upload-icon&&menu-option"
    >
      <div
        className="bg-purple-600 p-4 rounded-md"
        id="cloud-image-upload-icon"
      >
        <div className="flex justify-center items-center text-white">
          <CloudUpload className="" />
        </div>
        <p className="text-center text-teal-500">Upload</p>
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="px-4 py-2 border flex flex-col gap-y-0.5"
        id="menu-option"
      >
        <MenuOption menuIcon={ReplyIcon} menuText="Reply" />
        <MenuOption menuIcon={EditIcon} menuText="Edit" />
        <MenuOption menuIcon={FlagIcon} menuText="flag" />
      </motion.div>
    </motion.div>
  );
};

// ============================== Dashboard Activity Details
const DashboardActivityDetails = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col gap-y-2 p-4 border rounded-md  bg-gray-50 dark:bg-gray-800"
      id="dashboard-design-complete-details"
    >
      <DashBoardHeader showMessageIcon={true} key={"dashboard-header"} />
      <div id="dashboard-design-activity">
        <div className="flex flex-row justify-between" id="activity-header">
          <h1 className="font-medium text-gray-800 dark:text-gray-100">
            Activities
          </h1>
          <ActiveIcon activeCount={10} />
        </div>
        <div id="activity-body"></div>
      </div>
      <div id="people-working-on-it-icon">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-gray-800 dark:text-gray-100">
            People working
          </h1>
          <ActiveIcon activeCount={7} />
        </div>
        <div
          className="flex flex-row w-full  mt-2 "
          id="working-peoples-user-icons"
        >
          <UserIcon
            userIconText="John Doe"
            size="sm"
            backgroundColor="bg-blue-100"
            textColor="text-blue-700"
          />
          <UserIcon
            userIconText="Jane Smith"
            size="sm"
            backgroundColor="bg-green-100"
            textColor="text-green-700"
          />
          <UserIcon
            userIconText="Mike Jhonson"
            size="sm"
            backgroundColor="bg-yellow-100"
            textColor="text-yellow-700"
          />
          <UserIcon
            userIconText="Steve Jobs"
            size="sm"
            backgroundColor="bg-red-100"
            textColor="text-red-700"
          />
          <Button
            className="rounded-full size-6 items-center justify-center flex bg-green-500"
            type="button"
            size="icon"
            variant="outline"
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
// ============================== Dismiss Alert
const DismissAlert = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      id="dismiss-alert"
    >
      <Card>
        <CardHeader className="pt-3 px-3 pb-0.5 flex justify-center items-center">
          <CardTitle className="text-gray-800 dark:text-gray-100">
            Dismiss The Alert
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            You can dismiss this alert
          </CardDescription>
        </CardHeader>
        <CardContent className="m-0 p-0">
          <CardFooter className="flex flex-row m-0 justify-end items-center gap-x-2">
            <Button variant="default" size="sm">
              No
            </Button>
            <Button variant="destructive" size="sm">
              Yes
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================== Start Conversation
const StartConversation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      id="start-conversation"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-800 dark:text-gray-100">
            Start A Conversation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h1 className="font-medium text-gray-700 dark:text-gray-300">to</h1>
            <Input placeholder="enter @userEmail" type="text" disabled />
            <Textarea placeholder="start a message or conversation" disabled />
          </div>
          <div
            className="flex justify-end items-center gap-x-2"
            id="attach-file-icon && send-message-icon"
          >
            <Button variant="outline" size="icon">
              {/* icon here */}
            </Button>
            <Button variant="outline" size="icon">
              {/* icon here */}
              {/* Post  message button  */}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================== Board Pass Form
const BoardPassForm = () => {
  const [isWeb, setIsWeb] = useState(true);
  const [invitedUsers, setInvitedUsers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);
  const [newUserName, setNewUserName] = useState("");

  const handleAddUser = () => {
    if (newUserName.trim()) {
      const newUser = { id: Date.now(), name: newUserName };
      setInvitedUsers([...invitedUsers, newUser]);
      setNewUserName("");
    }
  };
  const handleRemoveUser = (id: number) => {
    setInvitedUsers(invitedUsers.filter((user) => user.id !== id));
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      id="board-pass-form"
    >
      <Card>
        <CardContent className="space-y-4 p-4">
          {/* Board ID Input */}
          <div>
            <Input placeholder="Enter Board Id" type="text" />
          </div>
          {/* Board Title Input */}
          <div>
            <Input placeholder="Enter Board Title" type="text" />
          </div>

          {/* @web && @ui-ux Switcher */}
          <div
            className="flex flex-row justify-between items-center"
            id="@web&&@ui-ux switcher"
          >
            <Label
              htmlFor="board-type"
              className="text-gray-700 dark:text-gray-300"
            >
              Board type
            </Label>
            <div className="flex flex-row justify-end items-center gap-x-2">
              <p
                className={cn(
                  "font-medium  ",
                  isWeb ? "text-green-600" : "text-gray-500 dark:text-gray-400"
                )}
              >
                Web
              </p>
              <Switch
                id="board-type"
                checked={isWeb}
                onCheckedChange={setIsWeb}
              />
              <p
                className={cn(
                  "font-medium ",
                  !isWeb ? "text-green-600" : "text-gray-500 dark:text-gray-400"
                )}
              >
                UI/UX
              </p>
            </div>
          </div>

          {/* Add More People Input and Label */}
          <div
            className="flex flex-row gap-x-2"
            id="add-more-people-input and label"
          >
            <Input
              type="text"
              placeholder="Add more people"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="flex-grow"
            />
            <Button
              onClick={handleAddUser}
              variant="outline"
              className="flex-shrink-0 text-green-600 border-green-500"
            >
              Invite
            </Button>
          </div>

          {/* User Icons Added */}
          <div className="flex flex-row flex-wrap gap-2" id="user-icon-added-">
            {invitedUsers.map((user) => (
              <div key={user.id} className="relative flex items-center">
                <UserIcon
                  userIconText={user.name}
                  size="sm"
                  backgroundColor="bg-green-100"
                  textColor="text-green-700"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveUser(user.id)}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full size-5 flex items-center justify-center"
                >
                  <PlusIcon className="size-3 text-white rotate-45 " />
                </motion.button>
              </div>
            ))}
          </div>

          {/* Create Board Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full border-green-500 text-green-600"
          >
            Create board
          </Button>
          <p className="text-sm font-medium text-green-500 dark:text-green-400 flex items-center gap-1">
            <CheckCircle2 className="size-4 " />
            Good work Ritik you are nice to go
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================== Main UiDisplay Component
const UiDisplay = () => {
  return (
    <motion.div
      className=" bg-gradient-to-br max-h-[800px] h-full max-w-7xl mx-auto from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div
            className="flex flex-col justify-between h-full"
            id="vertical-col-1"
          >
            <div className="flex flex-grow h-full">
              <UiLogo />
            </div>
            <div
              className="space-y-4 flex flex-col justify-end"
              id="card-alert&&card-with-image"
            >
              <CardAlert />
              <CardWithImage />
            </div>
          </div>
          <div
            className="flex flex-col gap-y-3 justify-end"
            id="vertical-col-2"
          >
            <CloudUploadAndMenuOption />
            <DashBoardHeader key={"dashboard-header"} />
            <DashboardActivityDetails />
            <DismissAlert />
          </div>
          <div className="flex flex-col gap-y-4" id="vertical-col-3">
            <StartConversation />
            <BoardPassForm />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UiDisplay;
