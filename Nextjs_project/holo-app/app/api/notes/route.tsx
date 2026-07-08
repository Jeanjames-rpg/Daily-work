import { NextResponse } from "next/server";
import { title } from "process";


let notes = [
    {
        id: 1,
        title: "Learn Next.js",
        content: "Finish api routes"

    },
]

export async function GET(){
    return NextResponse.json(notes);
}

export async function POST(request: Request){
   const body = await request.json();

   const newNote= {
    id: Date.now(),
    title: body.title,
    content: body.content,
   };

   notes.push(newNote);

   return NextResponse.json(newNote)

}