import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    console.log("Creating User Request:", req);
    try{
        const body = await req.json();
        const userData = body.formData;

        if(!userData?.email || !userData?.password){
            return NextResponse.json({message: "Please fill out all fields!"}, {status: 400})
        }

        const duplicateEmail = await User.findOne({email: userData.email}).lean().exec();
        if(duplicateEmail){
            return NextResponse.json({message: "Email already exists!"}, {status: 400})
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        await User.create(userData);
        return NextResponse.json({message: "User created!"}, {status: 201})
    }catch(err){
        console.log("Creating User Error:",err);
        return NextResponse.json({message: "Internal Server Error!", err}, {status: 500});
    }
}