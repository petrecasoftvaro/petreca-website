'use client';

import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "../ui/button";
import Link from "next/link";

export default function LoginBtn() {
    const { user, isLoading, error } = useUser();

 
    if (isLoading) {
        return <Button variant="outline" disabled>Carregando...</Button>;
    }

    if (error) {
        return <Button variant="outline" asChild>
        <Link href="/auth/login">Login</Link>
      </Button>;
    }

    return (
        user && (
            <Button variant="outline" asChild>
              <Link href="/auth/logout">Logout</Link>
            </Button>
          )
    );
}