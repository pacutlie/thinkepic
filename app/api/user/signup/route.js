import { db } from "@/db/config";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/Auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    let rules = {
      name: z.string().min(1, "Nama belum diisi").max(100),
      email: z.string().min(1, "Email belum diisi").email("Email tidak valid"),
      password: z.string().min(1, "Password belum diisi").min(8, "Password minimal 8 karakter"),
    };

    if (session?.user.role === "SUPERADMIN") {
      rules = {
        ...rules,
        role: z.string().min(1, "Role belum dipilih"),
        status: z.string().min(1, "Status belum dipilih"),
      };
    }

    const userSchema = z.object(rules);

    const { name, email, password, role, status } = userSchema.parse(await req.json());

    // check if email already exist
    const existingEmail = await db.User.findUnique({ where: { email } });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email sudah digunakan",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.User.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        status,
      },
    });

    const { password: newPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        success: true,
        users: rest,
        message: "Akun berhasil dibuat",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.issues[0].message,
        error,
      },
      { status: 500 }
    );
  }
}
