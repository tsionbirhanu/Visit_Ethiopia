import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(){
    try{
        const languages = await prisma.language.findMany({
            select:{id:true, code:true,name:true},
            orderBy:{name:"asc"},
        });
        return NextResponse.json(languages,{status:200});
    }catch(error){
        console.error(error);
        return NextResponse.json({error:"Failed to fetch languages"},{status:500});
    }
}