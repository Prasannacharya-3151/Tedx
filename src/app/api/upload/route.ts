import { put } from "@vercel/blob";
import {  NextResponse } from "next/server";

export const runtime = 'edge'

export async function POST(req: Request) {
    if(!process.env.BLOB_READ_WRITE_TOKEN){
        return new Response(
            "missing BLOB_READ_WRITE_TOKEN , Don't forget to add",
            {
                status:401
            }
        )
    }

    const file = req.body || ''
    const filename = req.headers.get('x-vercel-filename') ||  'file.txt'
    const contentType = req.headers.get('content-type') || 'text/pain'
    const fileType = `.${contentType.split('/')[1]}`


    const finalName = filename.includes(fileType)
     ? filename
     : `${filename}${fileType}`
    const blob = await put(finalName,file,{
        contentType,
        access:'public'
    })

    return NextResponse.json(blob)
}
