"use client";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  AppWindow,
  Bold,
  BugPlay,
  Columns2,
  Copy,
  Download,
  Italic,
  Play,
  RotateCw,
  Rows2,
  Terminal,
  Underline,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Editor from "@monaco-editor/react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { code, terminal_code } from "../public/example-code";
import { Input } from "@/components/ui/input";
import * as React from "react";

export default function Home() {
  const [terminal, setTerminal] = React.useState(false);
  const [fullview, setFullview] = React.useState(false);

  return (
    <div className="relative flex flex-col bg-background ">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4">
            <a href="" className="font-bold flex items-center">
              <BugPlay className="w-5 h-5 mr-2" />
              Elixir Repl
            </a>
          </div>
          <div className="ml-auto flex items-center">
            <ToggleGroup variant="outline" type="single">
              {/* <ToggleGroupItem value="columns-2" aria-label="Toggle Columns 2">
                <Columns2 className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="rows-2" aria-label="Toggle Rows">
                <Rows2 className="h-4 w-4" />
              </ToggleGroupItem> */}
              <ToggleGroupItem
                value="fullpage"
                aria-label="Toggle fullpage"
                onClick={() => setFullview(!fullview)}
              >
                <AppWindow className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="!h-8 mx-4 block" />

            <ModeToggle />
          </div>
        </div>
      </header>
      <main
        className={`custom-screen-height grid  ${
          fullview ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {!fullview && (
          <div className="h-full relative rounded">
            <div className="p-2 flex gap-2 ">
              <Button>
                {" "}
                <Play className="w-5 h-5 mr-2" /> Run{" "}
              </Button>
              <div className="ml-auto flex gap-2">
                <Button variant={"secondary"}>
                  {" "}
                  <Copy className="w-4 h-4 mr-2" /> Copy{" "}
                </Button>
                <Button variant={"secondary"}>
                  {" "}
                  <Download className="w-4 h-4 mr-2" /> Download{" "}
                </Button>
              </div>
            </div>

            <div className="custom-editor-height px-2 pb-2">
              <Editor
                theme="vs-dark"
                className="!rounded-md"
                defaultLanguage="javascript"
                defaultValue={code}
              />
            </div>
          </div>
        )}

        <div className="h-full relative">
          <div className="p-2 flex flex-col bg-slate-200 dark:bg-slate-900 rounded h-full">
            <div className="flex gap-2 mb-2">
              <Button variant={"secondary"} size={"icon"} className="px-2">
                <RotateCw className="w-5 h-5" />
              </Button>
              <Input defaultValue="https://ultimatemercer.com/" />
              <Button
                variant="secondary"
                size={"icon"}
                className="px-2"
                onClick={() => setTerminal(!terminal)}
              >
                <Terminal className="w-5 h-5" />
              </Button>
            </div>
            <iframe
              src="https://ultimatemercer.com/"
              width={"100%"}
              height={"100%"}
              className="rounded-md"
            ></iframe>
            {terminal && (
              <div className="my-2">
                <h4 className="">
                  <span className="px-2.5 py-1 rounded-t-md bg-black text-white text-lg font-bold inline-flex items-center">
                    <Terminal className="!w-4 !h-4 mr-2" />
                    Logs
                  </span>
                </h4>
                <ScrollArea className="h-[300px] w-full rounded-md p-4 bg-black text-cyan-500 font-mono rounded-tl-none">
                  <pre>
                    <code>{terminal_code}</code>
                  </pre>
                </ScrollArea>
              </div>
            )}
          </div>

          {/* <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={85}>
              <iframe
                src="https://ultimatemercer.com/"
                width={"100%"}
                height={"100%"}
              ></iframe>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={15}
              className="bg-slate-800 px-2 py-4 text-cyan-500 font-mono"
            >
              <pre>
                <code>{terminal_code}</code>
              </pre>
            </ResizablePanel>
          </ResizablePanelGroup> */}

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="secondary"
                className="absolute bottom-4 right-6 dark:border dark:border-white"
              >
                <Terminal className="w-4 h-4 mr-2" /> Logs
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="flex items-center mb-2">
                  <Terminal className="w-5 h-5 mr-2" /> Logs
                </DrawerTitle>
                <ScrollArea className="h-[400px] w-full rounded-md border p-4 bg-black text-cyan-500 font-mono">
                  <pre>
                    <code>{terminal_code}</code>
                  </pre>
                </ScrollArea>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Close Logs</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </main>
    </div>
  );
}
